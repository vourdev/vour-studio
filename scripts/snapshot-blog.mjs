/**
 * Bakes every published article into the repository as a static snapshot.
 *
 * `lib/cms.ts` already falls back to `lib/data/posts.ts` whenever the CMS is
 * unreachable -- the plumbing has been there since the MDX migration. What was
 * missing is content: that file held one article from July, so a VPS outage
 * left /blog showing a single stale post while ten were published.
 *
 * This closes that gap. The snapshot is committed, so the static build carries
 * the articles with it and needs nothing from api-studio, the VPS or Neon at
 * runtime.
 *
 * LAST KNOWN GOOD
 * ---------------
 * The generated file is only replaced by a snapshot that passes every check
 * below. A CMS that answers with half a list, an empty body or a broken date
 * leaves the previous snapshot exactly where it was, and the script exits
 * non-zero so the build fails loudly rather than shipping a thinner fallback
 * than the one it replaced. A fallback that silently degrades is worse than no
 * fallback, because nobody finds out until the day it is needed.
 *
 *   npm run snapshot:blog
 */
import { readFile, writeFile } from "node:fs/promises";

const CMS_API_URL = (
  process.env.CMS_API_URL ??
  process.env.LEAD_API_URL ??
  "http://localhost:3000"
).replace(/\/+$/, "");

const OUT = new URL("../lib/data/posts.generated.ts", import.meta.url);

/** Same default the live mapper uses when a post has no cover. */
const PLACEHOLDER_COVER =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=675&q=80";

const CATEGORIES = new Set(["Tutorial", "Case Study", "Dev Notes"]);

/** Below this the CMS answered with something, but not with the blog. */
const MIN_ARTICLES = 1;
/** A body thinner than this renders as a near-blank page. */
const MIN_TEXT_NODES = 20;
/** Losing more than this share of a response means the CMS is not healthy. */
const MAX_DROPPED_SHARE = 0.25;

function absolutize(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `${CMS_API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** Mirrors `toPostMeta` in lib/cms.ts: covers display large, so the og size
 *  wins over the full upload when the admin generated one. */
function toPost(doc) {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
  const imageUrl = media?.sizes?.og?.url ?? media?.url;

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    date: doc.date,
    category: doc.category,
    readingMinutes: Number(doc.readingMinutes) || 5,
    image: imageUrl ? absolutize(imageUrl) : PLACEHOLDER_COVER,
    content: doc.content,
  };
}

function countTextNodes(node) {
  if (!node || typeof node !== "object") return 0;
  let total = node.type === "text" && node.text?.trim() ? 1 : 0;
  for (const child of node.children ?? []) total += countTextNodes(child);
  return total;
}

/**
 * Splits the response into what is fit to ship and what is not.
 *
 * Per-article, not all-or-nothing. The first run against production rejected
 * ten good articles because one of them -- an early generator run that produced
 * 830 characters -- has a body too thin to be worth serving. Denying the other
 * nine a fallback over that would have been the wrong trade.
 *
 * Run-level failures are handled by the caller: too few articles left, or too
 * many dropped, means the CMS is not healthy and the previous snapshot stands.
 */
function partition(posts) {
  const kept = [];
  const dropped = [];
  const seen = new Set();

  for (const post of posts) {
    const where = post.slug || post.title || "(unidentified)";
    const reasons = [];

    for (const field of ["slug", "title", "description", "date", "category"]) {
      if (!post[field] || typeof post[field] !== "string") reasons.push(`missing ${field}`);
    }

    if (post.slug && seen.has(post.slug)) reasons.push("duplicate slug");

    if (post.category && !CATEGORIES.has(post.category)) {
      reasons.push(`unknown category "${post.category}"`);
    }

    if (post.date && Number.isNaN(new Date(post.date).getTime())) {
      reasons.push(`unparseable date "${post.date}"`);
    }

    // A body that did not survive the trip renders as a blank page, which looks
    // far more broken than an outage does.
    const nodes = countTextNodes(post.content?.root);
    if (nodes < MIN_TEXT_NODES) reasons.push(`body has ${nodes} text nodes, expected ${MIN_TEXT_NODES}+`);

    if (!post.image) reasons.push("no cover");

    if (reasons.length > 0) {
      dropped.push({ where, reasons });
    } else {
      seen.add(post.slug);
      kept.push(post);
    }
  }

  return { kept, dropped };
}

async function currentSnapshotSize() {
  try {
    const existing = await readFile(OUT, "utf8");
    // Matches the generator's own output: JSON.stringify quotes its keys.
    return (existing.match(/^\s{4}"slug":/gm) ?? []).length;
  } catch {
    return 0;
  }
}

const response = await fetch(`${CMS_API_URL}/api/posts?depth=1&limit=100`, {
  signal: AbortSignal.timeout(30_000),
});
if (!response.ok) {
  console.error(`[snapshot] ${CMS_API_URL} answered ${response.status}; snapshot unchanged.`);
  process.exit(1);
}

const { docs = [] } = await response.json();
const posts = docs
  .map(toPost)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const { kept, dropped } = partition(posts);

for (const { where, reasons } of dropped) {
  console.warn(`[snapshot] skipped ${where}: ${reasons.join("; ")}`);
}

if (kept.length < MIN_ARTICLES) {
  console.error(`[snapshot] nothing usable in ${posts.length} article(s); snapshot unchanged.`);
  process.exit(1);
}

if (posts.length > 0 && dropped.length / posts.length > MAX_DROPPED_SHARE) {
  console.error(
    `[snapshot] ${dropped.length} of ${posts.length} article(s) failed validation; ` +
      "that is a sick CMS, not a bad article. Snapshot unchanged.",
  );
  process.exit(1);
}

// Never trade a richer snapshot for a thinner one. A CMS that has quietly lost
// half its rows still answers 200, and this is the only place that notices.
const previous = await currentSnapshotSize();
if (previous > kept.length) {
  console.error(
    `[snapshot] refusing to shrink from ${previous} to ${kept.length} article(s); snapshot unchanged.`,
  );
  console.error("  Pass SNAPSHOT_ALLOW_SHRINK=1 if articles were deleted on purpose.");
  if (!process.env.SNAPSHOT_ALLOW_SHRINK) process.exit(1);
}

const file =
  `// Generated by \`npm run snapshot:blog\`. Do not edit by hand.\n` +
  `// Written ${new Date().toISOString()} from ${CMS_API_URL}.\n` +
  `//\n` +
  `// This is the offline copy of the blog: what /blog serves when the CMS,\n` +
  `// the VPS or the database is unreachable. See scripts/snapshot-blog.mjs.\n` +
  `import type { Post } from "./posts";\n\n` +
  `// The Lexical bodies come verbatim from the CMS, so the cast is honest:\n` +
  `// lexical's SerializedEditorState does not describe the node types this\n` +
  `// editor stores, which is why the hand-written seed casts too.\n` +
  `export const snapshotPosts = ${JSON.stringify(kept, null, 2)} as unknown as Post[];\n`;

await writeFile(OUT, file);
console.log(
  `[snapshot] ${kept.length} article(s) written, ${Math.round(file.length / 1024)} kB` +
    (previous ? ` (was ${previous})` : ""),
);
