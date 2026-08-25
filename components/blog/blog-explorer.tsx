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
    <div className="space-y-10">
      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
        {categoriesWithCounts.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-text text-bg border border-text font-bold shadow-xs"
                  : "bg-surface text-text-muted border border-border hover:border-border-strong hover:text-text"
              )}
            >
              <span>{cat.name}</span>
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-mono font-semibold",
                  isActive ? "bg-bg text-text" : "bg-bg-subtle text-text-faint"
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of articles */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
          >
            <Link href={`/resources/${post.slug}`} className="flex flex-1 flex-col">
              {/* Edge-to-edge Image Header */}
              <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border bg-bg-subtle">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>

              {/* Card Content details */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">
                      {post.meta.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-text-faint">
                      <ClockIcon className="size-3.5" />
                      {post.meta.readingMinutes} menit baca
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-lg font-bold leading-snug tracking-tight text-text transition-colors duration-200 group-hover:text-accent-text">
                    {post.meta.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-3">
                    {post.meta.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] text-text-faint">
                  <span>{formatDate(post.meta.date)}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-accent-text transition-transform duration-200 group-hover:translate-x-0.5">
                    Baca Artikel →
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
