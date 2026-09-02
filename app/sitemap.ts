import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/cms";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/solutions",
    "/products",
    "/estimate",
    "/projects",
    "/blog",
    "/about",
    "/contact",
  ];
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: new URL(route || "/", siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    // The pages that answer a buying question rank above the supporting ones.
    priority:
      route === ""
        ? 1
        : ["/solutions", "/products", "/estimate", "/about"].includes(route)
          ? 0.8
          : 0.7,
  }));

  const posts = await getPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(post.meta.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
