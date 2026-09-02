/**
 * Read path into the admin CMS (the sibling project `vour-studio-admin`,
 * Payload CMS + Postgres). Server components call these fetchers; the CMS REST
 * API is public for published content, so no credentials are needed to read.
 *
 * Degradation strategy, matching the lead action:
 * - The fetch is wrapped in `unstable_cache` (ISR, 60s). The cached function
 *   THROWS on failure, so a background revalidation that hits a down CMS keeps
 *   serving the last-known-good data instead of caching a degraded result.
 * - `getProducts()` catches and returns the static placeholder data from
 *   `lib/data/products.ts` only when nothing good is cached yet. A failed
 *   fetch is never cached, so recovery is immediate once the CMS returns.
 *
 * NOTE: server-only module. Import it from server components / server actions,
 * never from client components — it reads `process.env` and uses `fetch`.
 */
import { unstable_cache } from "next/cache";

import {
  products as fallbackProducts,
  type Product,
} from "@/lib/data/products";
import {
  projects as fallbackProjects,
  type Project,
} from "@/lib/data/projects";
import {
  fallbackPosts,
  type Post,
  type PostMeta,
  type RichTextContent,
} from "@/lib/data/posts";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site";

/** Admin origin. `CMS_API_URL` overrides; otherwise reuse the lead API origin
 * (same server), with a localhost default for development. */
export const CMS_API_URL =
  process.env.CMS_API_URL ?? process.env.LEAD_API_URL ?? "http://localhost:3000";

/**
 * Safety net, not the primary freshness mechanism.
 *
 * The admin calls `POST /api/revalidate` on every create, update and delete
 * (see its `createCrudHandlers`), and that webhook expires these cache tags, so
 * an edit is live within a second or two. This TTL only covers a webhook that
 * never arrives -- the VPS link drops in bursts -- and stops content from
 * sticking forever if one is lost.
 */
const REVALIDATE_SECONDS = 300;

/** A stalled CMS must not hang a page render, but 10s was too tight: the
 * backend runs on a VPS whose outbound link stalls in bursts, and a cold Neon
 * connection alone can take 10-20s. The 1 Sep 2026 production build timed out
 * on all four fetches and prerendered every page from the static fallbacks. */
const FETCH_TIMEOUT_MS = 25_000;

/** One retry, because the failures are transient stalls rather than the CMS
 * being down. Short pause so a cold container has a moment to warm up. */
const RETRY_DELAY_MS = 1_500;

/**
 * Fetch JSON from the CMS and THROW on failure -- never resolve to degraded
 * data. Retries once on a timeout or a 5xx; a 4xx is a real answer and is not
 * worth repeating.
 */
async function cmsFetch<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
    try {
      const response = await fetch(`${CMS_API_URL}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (response.ok) return (await response.json()) as T;

      const error = new Error(`[cms] ${path} gagal (${response.status}).`);
      if (response.status < 500) throw error;
      lastError = error;
    } catch (error) {
      // A 4xx is final; rethrow it instead of burning the retry on it.
      if (error instanceof Error && /gagal \(4\d\d\)/.test(error.message)) throw error;
      lastError = error;
    }
  }

  throw lastError;
}

/** Shape of a product doc returned by `GET /api/products?depth=1`. Field names
 * mirror the marketing site's `Product` type by design (see the admin's
 * `collections/Products.ts`). */
type PayloadProduct = {
  slug: string;
  name: string;
  category: Product["category"];
  tagline: string;
  features: { feature: string }[];
  price: number | null;
  status: Product["status"];
  /** Upload relation; `depth=1` expands it into the media doc (or number/string id). */
  image?: { url?: string; sizes?: { card?: { url?: string } } } | number | null;
};

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
  totalPages: number;
};

/** Picsum seeds matching the original static placeholder data, so products
 * without an uploaded image keep the exact look they had before the CMS. */
const FALLBACK_IMAGE_SEEDS: Record<string, string> = {
  "portfolio-template": "vour-portfolio-template",
  "landing-page-template": "vour-landing-template",
  "dashboard-template": "vour-dashboard-template",
  "starter-kit": "vour-starter-kit",
};

/** Local Payload media URLs are relative (`/api/media/file/...`). Make them
 * absolute against the CMS origin so `next/image` can load them from this site.
 * R2-served URLs are already absolute and pass through untouched. */
function absolutizeMediaUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return `${CMS_API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function toProduct(doc: PayloadProduct): Product {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
  // Full resolution, not the `card` variant. The admin renders `card` at
  // 768x432; the bento on /products gives a cell roughly 592 CSS px wide, which
  // needs ~1184 px on a 2x screen, so the small variant was being upscaled and
  // arriving soft. Same reasoning as toProject.
  const imageUrl = media?.url ?? media?.sizes?.card?.url;
  return {
    slug: doc.slug,
    name: doc.name,
    category: doc.category,
    tagline: doc.tagline,
    features: doc.features.map((feature) => feature.feature),
    price: doc.price ?? null,
    status: doc.status,
    // TODO(vour.dev): placeholder seed until a real image is uploaded per product.
    image: imageUrl
      ? absolutizeMediaUrl(imageUrl)
      : `https://picsum.photos/seed/${FALLBACK_IMAGE_SEEDS[doc.slug] ?? `vour-${doc.slug}`}/800/600`,
  };
}

/** Fetch and THROW on failure — never resolve to degraded data. The caller
 * decides what to do with the error. */
async function fetchProductsFromCms(): Promise<PayloadProduct[]> {
  const data = await cmsFetch<PayloadListResponse<PayloadProduct>>(
    "/api/products?depth=1&limit=100",
  );
  return data.docs;
}

const getCachedProducts = unstable_cache(fetchProductsFromCms, ["cms-products"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["cms-products"],
});

/** Digital products from the CMS. Falls back to `lib/data/products.ts` only
 * when nothing good is cached; a failed fetch is never cached, so recovery is
 * immediate once the CMS answers again. */
export async function getProducts(): Promise<Product[]> {
  try {
    const docs = await getCachedProducts();
    return docs.map(toProduct);
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackProducts;
  }
}

/* ---------------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------------ */

/** Shape of a project doc from `GET /api/projects?depth=1`. Field names mirror
 * the marketing site's `Project` type (see the admin's `collections/Projects.ts`). */
type PayloadProject = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  /** Lexical JSON, same shape as a post body. */
  description?: RichTextContent | null;
  technology: { tech: string }[];
  /** Upload relation; `depth=1` expands it into the media doc. */
  image?: { url?: string; sizes?: { card?: { url?: string } } } | number | null;
};

/** Picsum seeds + dimensions matching the original static placeholder data, so
 * projects without an uploaded image keep their exact prior look. */
const PROJECT_IMAGE_SEEDS: Record<string, { seed: string; size: string }> = {
  "arunika-living": { seed: "vour-project-arunika", size: "1200/800" },
  "kirana-logistik": { seed: "vour-project-kirana", size: "1200/800" },
  "sembara-coffee": { seed: "vour-project-sembara", size: "1600/900" },
};

function toProject(doc: PayloadProject): Project {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
  // Projects render large, so prefer the full-resolution media URL over the
  // `card` size (the opposite of toProduct, where cards are small).
  const imageUrl = media?.url ?? media?.sizes?.card?.url;
  const fallback = PROJECT_IMAGE_SEEDS[doc.slug];
  return {
    slug: doc.slug,
    name: doc.name,
    industry: doc.industry,
    year: doc.year,
    description: doc.description ?? null,
    technology: doc.technology.map((tech) => tech.tech),
    // TODO(vour.dev): placeholder seed until a real screenshot is uploaded.
    image: imageUrl
      ? absolutizeMediaUrl(imageUrl)
      : `https://picsum.photos/seed/${fallback?.seed ?? `vour-project-${doc.slug}`}/${fallback?.size ?? "1200/800"}`,
  };
}

/** Fetch and THROW on failure — never resolve to degraded data. */
async function fetchProjectsFromCms(): Promise<PayloadProject[]> {
  const data = await cmsFetch<PayloadListResponse<PayloadProject>>(
    "/api/projects?depth=1&limit=100",
  );
  return data.docs;
}

const getCachedProjects = unstable_cache(fetchProjectsFromCms, ["cms-projects"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["cms-projects"],
});

/** Portfolio case studies from the CMS. Falls back to `lib/data/projects.ts`
 * only when nothing good is cached; an empty CMS renders an empty list. */
export async function getProjects(): Promise<Project[]> {
  try {
    const docs = await getCachedProjects();
    return docs.map(toProject);
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackProjects;
  }
}

/* ---------------------------------------------------------------------------
 * Posts (blog)
 * ------------------------------------------------------------------------ */

/** Shape of a post doc from `GET /api/posts?depth=1`. Field names mirror the
 * marketing site's `PostMeta` type; only published posts are readable
 * anonymously, so drafts never leak into the site. */
type PayloadPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Post["category"];
  readingMinutes: number;
  /** Upload relation; `depth=1` expands it into the media doc. */
  image?: { url?: string; sizes?: { og?: { url?: string } } } | number | null;
  /** Lexical JSON body. */
  content: RichTextContent;
  _status?: string;
};



function toPostMeta(doc: PayloadPost): PostMeta {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
  // Covers display large, so prefer the `og` size (1200x630) over the full
  // upload when the admin has generated it.
  const imageUrl = media?.sizes?.og?.url ?? media?.url;

  return {
    title: doc.title,
    description: doc.description,
    date: doc.date,
    category: doc.category,
    readingMinutes: doc.readingMinutes,
    image: imageUrl
      ? absolutizeMediaUrl(imageUrl)
      : `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=675&q=80`,
  };
}

function toPost(doc: PayloadPost): Post {
  return { slug: doc.slug, ...toPostMeta(doc), content: doc.content };
}

/** Fetch and THROW on failure — never resolve to degraded data. */
async function fetchPostsFromCms(): Promise<PayloadPost[]> {
  const data = await cmsFetch<PayloadListResponse<PayloadPost>>(
    "/api/posts?depth=1&limit=100",
  );
  return data.docs;
}

const getCachedPosts = unstable_cache(fetchPostsFromCms, ["cms-posts"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["cms-posts"],
});

/** Post metadata for listings, newest first — same `{ slug, meta }` shape the
 * old MDX index returned, so consumers barely change. Falls back to the static
 * posts only when nothing good is cached. */
export async function getPosts(): Promise<{ slug: string; meta: PostMeta }[]> {
  try {
    const docs = await getCachedPosts();
    return docs
      .map((doc) => ({ slug: doc.slug, meta: toPostMeta(doc) }))
      .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackPosts.map((post) => ({
      slug: post.slug,
      meta: {
        title: post.title,
        description: post.description,
        date: post.date,
        category: post.category,
        readingMinutes: post.readingMinutes,
        image: post.image,
      },
    }));
  }
}

/** Full post (including the Lexical body) for the article page, or null. */
/**
 * One article by slug.
 *
 * `GET /api/posts/:slug` returns ~16 KB. Reading the whole list and filtering
 * in JS -- which is what this did -- pulled ~162 KB of Lexical bodies to render
 * one page, and both `generateMetadata` and the page component call this.
 */
const getCachedPost = unstable_cache(
  async (slug: string) => {
    try {
      return await cmsFetch<PayloadPost>(`/api/posts/${encodeURIComponent(slug)}`);
    } catch (error) {
      // A slug that does not exist is a real answer, not an outage. Returning
      // null here keeps it out of the "CMS unreachable" path, so a stale link
      // renders the 404 page instead of logging a false alarm.
      if (error instanceof Error && /gagal \(404\)/.test(error.message)) return null;
      throw error;
    }
  },
  ["cms-post"],
  // Shares the `cms-posts` tag so the existing webhook expires single articles
  // too; without it an edit would clear the listing and leave the article stale.
  { revalidate: REVALIDATE_SECONDS, tags: ["cms-posts"] },
);

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const doc = await getCachedPost(slug);
    return doc ? toPost(doc) : null;
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}

/* ---------------------------------------------------------------------------
 * Site settings (contact + nav)
 * ------------------------------------------------------------------------ */

/** Shape of the site-settings global from `GET /api/globals/site-settings`. */
type PayloadSiteSettings = {
  contact?: { whatsappNumber?: string; phoneNumber?: string; contactEmail?: string };
  socials?: { label?: string; href?: string; icon?: SiteSettings["socials"][number]["icon"] }[];
  mainNav?: { label?: string; href?: string }[];
};

/** Fetch and THROW on failure — never resolve to degraded data. */
async function fetchSiteSettingsFromCms(): Promise<PayloadSiteSettings> {
  return cmsFetch<PayloadSiteSettings>("/api/globals/site-settings");
}

const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromCms,
  ["cms-site-settings"],
  { revalidate: REVALIDATE_SECONDS, tags: ["cms-site-settings"] },
);

/** Contact + nav settings from the admin global; falls back to `lib/site.ts`
 * defaults when the CMS is unreachable or the fields are empty.
 *
 * The root layout awaits this on every route, so an uncached call here is one
 * Jakarta round trip added to every single page render. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const doc = await getCachedSiteSettings();
    const fallback = defaultSiteSettings;
    return {
      contactEmail: doc.contact?.contactEmail || fallback.contactEmail,
      whatsappNumber: doc.contact?.whatsappNumber || fallback.whatsappNumber,
      phoneNumber: doc.contact?.phoneNumber || fallback.phoneNumber,
      socials: doc.socials?.length
        ? doc.socials
            .filter((social) => social.href)
            .map((social) => ({
              label: social.label ?? social.href!,
              href: social.href!,
              icon: social.icon ?? "github",
            }))
        : fallback.socials,
      navLinks: doc.mainNav?.length
        ? doc.mainNav
            .filter((item) => item.href)
            .map((item) => ({ label: item.label ?? item.href!, href: item.href! }))
        : fallback.navLinks,
    };
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai pengaturan situs statis.", error);
    return defaultSiteSettings;
  }
}
