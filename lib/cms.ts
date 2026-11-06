/**
 * Server-only read path into the admin CMS (`vour-studio-admin`). Never import from client components.
 * Cached fetchers throw on failure so a down CMS keeps serving the last good data; the public
 * getters fall back to `lib/data/*` only when nothing is cached.
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
  builtinPosts,
  fallbackPosts,
  type Post,
  type PostMeta,
  type RichTextContent,
} from "@/lib/data/posts";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site";

export const CMS_API_URL =
  process.env.CMS_API_URL ?? process.env.LEAD_API_URL ?? "http://localhost:3000";

// Safety net only: the admin's revalidate webhook expires the cache tags on every edit.
// This TTL covers a webhook that never arrives.
const REVALIDATE_SECONDS = 300;

// A cold database connection can take 10-20s; 10s made builds prerender every page from fallbacks.
const FETCH_TIMEOUT_MS = 25_000;

const RETRY_DELAY_MS = 1_500;

/** Throws on failure, never resolves to degraded data. Retries once on a timeout or 5xx; a 4xx is final. */
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

/** Mirrors the admin's `collections/Products.ts`. */
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

// Same seeds as the static placeholder data, so products without an upload look unchanged.
const FALLBACK_IMAGE_SEEDS: Record<string, string> = {
  "portfolio-template": "vour-portfolio-template",
  "landing-page-template": "vour-landing-template",
  "dashboard-template": "vour-dashboard-template",
  "starter-kit": "vour-starter-kit",
};

// Local Payload media URLs are relative; R2 URLs are already absolute and pass through.
function absolutizeMediaUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return `${CMS_API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function toProduct(doc: PayloadProduct): Product {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
  // Full resolution: the 768px `card` variant upscales soft in the /products bento on 2x screens.
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

export async function getProducts(): Promise<Product[]> {
  try {
    const docs = await getCachedProducts();
    return docs.map(toProduct);
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackProducts;
  }
}

// Projects

/** Mirrors the admin's `collections/Projects.ts`. */
type PayloadProject = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  description?: RichTextContent | null;
  technology: { tech: string }[];
  image?: { url?: string; sizes?: { card?: { url?: string } } } | number | null;
};

const PROJECT_IMAGE_SEEDS: Record<string, { seed: string; size: string }> = {
  "arunika-living": { seed: "vour-project-arunika", size: "1200/800" },
  "kirana-logistik": { seed: "vour-project-kirana", size: "1200/800" },
  "sembara-coffee": { seed: "vour-project-sembara", size: "1600/900" },
};

function toProject(doc: PayloadProject): Project {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
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

/** An empty CMS renders an empty list; the static fallback is for outages only. */
export async function getProjects(): Promise<Project[]> {
  try {
    const docs = await getCachedProjects();
    return docs.map(toProject);
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackProjects;
  }
}

// Posts

/** Only published posts are readable anonymously, so drafts never reach the site. */
type PayloadPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Post["category"];
  readingMinutes: number;
  image?: { url?: string; sizes?: { og?: { url?: string } } } | number | null;
  content: RichTextContent;
  _status?: string;
};



function toPostMeta(doc: PayloadPost): PostMeta {
  const media = doc.image && typeof doc.image === "object" ? doc.image : undefined;
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

/** Listing metadata, newest first. */
export async function getPosts(): Promise<{ slug: string; meta: PostMeta }[]> {
  try {
    const docs = await getCachedPosts();
    const fromCms = docs.map((doc) => ({ slug: doc.slug, meta: toPostMeta(doc) }));
    // Built-ins show in normal operation too; a CMS post with the same slug wins.
    const cmsSlugs = new Set(fromCms.map((post) => post.slug));
    const builtin = builtinPosts
      .filter((post) => !cmsSlugs.has(post.slug))
      .map((post) => ({ slug: post.slug, meta: toPostMeta(post as unknown as PayloadPost) }));

    return [...fromCms, ...builtin].sort(
      (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
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

// Fetch one article (~16 KB), not the full listing (~162 KB of Lexical bodies).
const getCachedPost = unstable_cache(
  async (slug: string) => {
    try {
      return await cmsFetch<PayloadPost>(`/api/posts/${encodeURIComponent(slug)}`);
    } catch (error) {
      // A missing slug is a real answer, not an outage: render the 404 page.
      if (error instanceof Error && /gagal \(404\)/.test(error.message)) return null;
      throw error;
    }
  },
  ["cms-post"],
  // Must share the `cms-posts` tag, or the webhook clears the listing and leaves the article stale.
  { revalidate: REVALIDATE_SECONDS, tags: ["cms-posts"] },
);

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const doc = await getCachedPost(slug);
    if (doc) return toPost(doc);
    // The CMS has no such article, but a built-in still counts as one.
    return builtinPosts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.warn("[cms] CMS tidak dapat dihubungi. Memakai data statis.", error);
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}

// Site settings

type PayloadSiteSettings = {
  contact?: { whatsappNumber?: string; phoneNumber?: string; contactEmail?: string };
  socials?: { label?: string; href?: string; icon?: SiteSettings["socials"][number]["icon"] }[];
  mainNav?: { label?: string; href?: string }[];
};

async function fetchSiteSettingsFromCms(): Promise<PayloadSiteSettings> {
  return cmsFetch<PayloadSiteSettings>("/api/globals/site-settings");
}

const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromCms,
  ["cms-site-settings"],
  { revalidate: REVALIDATE_SECONDS, tags: ["cms-site-settings"] },
);

/** Awaited by the root layout on every route: keep it cached. Empty fields fall back to `lib/site.ts`. */
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
