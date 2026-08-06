import type { ComponentType } from "react";

export type PostCategory = "Tutorial" | "Case Study" | "Dev Notes";

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, UTC. */
  date: string;
  category: PostCategory;
  readingMinutes: number;
  image: string;
  /** Internal links back to the relevant service or product page. */
  related?: { label: string; href: string }[];
};

/**
 * `@next/mdx` has no frontmatter support, so each article exports a `metadata`
 * object instead and this list is the single place a new slug gets registered.
 * `generateStaticParams` needs the slug list anyway, so nothing is duplicated
 * that would not have been.
 *
 * Newest first.
 */
export const postSlugs = ["memilih-antara-website-dan-dashboard"] as const;

export type PostSlug = (typeof postSlugs)[number];

export function isPostSlug(slug: string): slug is PostSlug {
  return (postSlugs as readonly string[]).includes(slug);
}

type PostModule = {
  default: ComponentType;
  metadata: PostMeta;
};

export async function getPost(slug: PostSlug) {
  const mod = (await import(`@/content/resources/${slug}.mdx`)) as PostModule;
  return { slug, meta: mod.metadata, Content: mod.default };
}

export async function getPostMeta(slug: PostSlug): Promise<PostMeta> {
  const mod = (await import(`@/content/resources/${slug}.mdx`)) as PostModule;
  return mod.metadata;
}

export async function getAllPosts() {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => ({ slug, meta: await getPostMeta(slug) })),
  );
  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );
}

export const postCategories: readonly ("Semua" | PostCategory)[] = [
  "Semua",
  "Tutorial",
  "Case Study",
  "Dev Notes",
];
