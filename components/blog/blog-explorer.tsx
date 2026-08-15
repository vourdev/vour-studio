"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@phosphor-icons/react";

import { cn, formatDate } from "@/lib/utils";
import { type PostCategory } from "@/lib/data/posts";

type PostItem = {
  slug: string;
  meta: {
    title: string;
    description: string;
    date: string;
    category: PostCategory;
    readingMinutes: number;
    image: string;
  };
};

export function BlogExplorer({ posts }: { posts: PostItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  // Compute category counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: posts.length };
    posts.forEach((post) => {
      const cat = post.meta.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === "Semua") return posts;
    return posts.filter((post) => post.meta.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Category filters matching the reference image layout */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
        {categoriesWithCounts.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium font-sans border transition-all duration-200 cursor-pointer active:scale-95",
                isActive
                  ? "bg-text text-bg border-text font-bold"
                  : "bg-surface-solid/35 text-text-muted border-border hover:border-border-strong hover:text-text"
              )}
            >
              <span>{cat.name}</span>
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-mono font-semibold",
                  isActive ? "bg-bg text-text" : "bg-bg-subtle text-text-muted"
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of articles matching Magic UI Reference layout (edge-to-edge images) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
          >
            <Link href={`/resources/${post.slug}`} className="flex flex-1 flex-col">
              {/* Edge-to-edge Image Header */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-bg">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Content details */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent-text font-bold">
                    {post.meta.category}
                  </span>
                  <span className="font-mono text-[9px] text-text-faint flex items-center gap-1">
                    <ClockIcon className="size-3.5" />
                    {post.meta.readingMinutes} min read
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-white group-hover:text-accent-text transition-colors duration-200">
                  {post.meta.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-3">
                  {post.meta.description}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/40 font-mono text-[10px] text-text-faint">
                  <span>{formatDate(post.meta.date)}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-accent-text group-hover:translate-x-0.5 transition-transform duration-200">
                    Baca →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
export default BlogExplorer;
