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

/** A stalled CMS must not hang a page render. Fall back after 3s. */
const FETCH_TIMEOUT_MS = 3_000;

/** Time-based revalidation (ISR). New products appear within this window. */
const REVALIDATE_SECONDS = 60;

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
  const imageUrl = media?.sizes?.card?.url ?? media?.url;
  return {
    slug: doc.slug,
    name: doc.name,
    category: doc.category,
    tagline: doc.tagline,
    features: doc.features.map((feature) => feature.feature),
    price: doc.price ?? null,
    status: doc.status,
    // TODO(Vour): placeholder seed until a real image is uploaded per product.
    image: imageUrl
      ? absolutizeMediaUrl(imageUrl)
      : `https://picsum.photos/seed/${FALLBACK_IMAGE_SEEDS[doc.slug] ?? `vour-${doc.slug}`}/800/600`,
  };
}

/** Fetch and THROW on failure — never resolve to degraded data. The caller
 * decides what to do with the error. */
async function fetchProductsFromCms(): Promise<PayloadProduct[]> {
  const response = await fetch(`${CMS_API_URL}/api/products?depth=1&limit=100`, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`[cms] /api/products gagal (${response.status}).`);
  }
  const data = (await response.json()) as PayloadListResponse<PayloadProduct>;
  return data.docs;
}

const getCachedProducts = unstable_cache(fetchProductsFromCms, ["cms-products"], {
  revalidate: REVALIDATE_SECONDS,
});

/** Digital products from the CMS. Falls back to `lib/data/products.ts` only
 * when no good data is cached (first render with the CMS down); an empty CMS
 * renders the designed empty states. */
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
  result: string;
  challenge: string;
  solution: string;
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
    result: doc.result,
    challenge: doc.challenge,
    solution: doc.solution,
    technology: doc.technology.map((tech) => tech.tech),
    // TODO(Vour): placeholder seed until a real screenshot is uploaded.
    image: imageUrl
      ? absolutizeMediaUrl(imageUrl)
      : `https://picsum.photos/seed/${fallback?.seed ?? `vour-project-${doc.slug}`}/${fallback?.size ?? "1200/800"}`,
  };
}

/** Fetch and THROW on failure — never resolve to degraded data. */
async function fetchProjectsFromCms(): Promise<PayloadProject[]> {
  const response = await fetch(`${CMS_API_URL}/api/projects?depth=1&limit=100`, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`[cms] /api/projects gagal (${response.status}).`);
  }
  const data = (await response.json()) as PayloadListResponse<PayloadProject>;
  return data.docs;
}

const getCachedProjects = unstable_cache(fetchProjectsFromCms, ["cms-projects"], {
  revalidate: REVALIDATE_SECONDS,
});

/** Portfolio case studies from the CMS. Falls back to `lib/data/projects.ts`
 * only when no good data is cached; an empty CMS renders an empty list. */
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
  /** Per-row `id` is present in the API response but meaningless on the site. */
  related?: ({ id?: string } & { label: string; href: string })[];
  _status?: string;
};

/** Picsum seeds matching the original static placeholder covers. */
const POST_IMAGE_SEEDS: Record<string, string> = {
  "memilih-antara-website-dan-dashboard": "vour-article-website-dashboard",
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
      : `https://picsum.photos/seed/${POST_IMAGE_SEEDS[doc.slug] ?? `vour-article-${doc.slug}`}/1200/675`,
    related: doc.related?.map((item) => ({ label: item.label, href: item.href })),
  };
}

function toPost(doc: PayloadPost): Post {
  return { slug: doc.slug, ...toPostMeta(doc), content: doc.content };
}

/** Fetch and THROW on failure — never resolve to degraded data. */
async function fetchPostsFromCms(): Promise<PayloadPost[]> {
  const response = await fetch(`${CMS_API_URL}/api/posts?depth=1&limit=100`, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`[cms] /api/posts gagal (${response.status}).`);
  }
  const data = (await response.json()) as PayloadListResponse<PayloadPost>;
  return data.docs;
}

const getCachedPosts = unstable_cache(fetchPostsFromCms, ["cms-posts"], {
  revalidate: REVALIDATE_SECONDS,
});

/** Post metadata for listings, newest first — same `{ slug, meta }` shape the
 * old MDX index returned, so consumers barely change. Falls back to the static
 * posts only when no good data is cached. */
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
        related: post.related,
      },
    }));
  }
}

/** Full post (including the Lexical body) for the article page, or null. */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const docs = await getCachedPosts();
    const doc = docs.find((post) => post.slug === slug);
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
  const response = await fetch(`${CMS_API_URL}/api/globals/site-settings`, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`[cms] /api/globals/site-settings gagal (${response.status}).`);
  }
  return (await response.json()) as PayloadSiteSettings;
}

const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromCms,
  ["cms-site-settings"],
  { revalidate: REVALIDATE_SECONDS },
);

/** Contact + nav settings from the admin global; falls back to `lib/site.ts`
 * defaults when the CMS is unreachable or the fields are empty. */
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
