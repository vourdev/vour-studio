"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

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

const ALL = "Semua";

export function BlogExplorer({ posts }: { posts: PostItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    const seen: string[] = [];
    posts.forEach((post) => {
      if (!seen.includes(post.meta.category)) seen.push(post.meta.category);
    });
    return [ALL, ...seen];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL) return posts;
    return posts.filter((post) => post.meta.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      {/* Tabs swipe horizontally on mobile instead of wrapping to a second row.
          Above md the row always fits, so the scroll container is dropped
          entirely rather than left in place with nothing to scroll. */}
      <div className="no-scrollbar -mx-4 overflow-x-auto border-b border-border px-4 md:mx-0 md:overflow-x-visible md:px-0">
        <div role="tablist" className="flex w-max min-w-full items-center gap-7 md:w-auto">
          {categories.map((name) => {
            const isActive = activeCategory === name;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(name)}
                className={cn(
                  "-mb-px cursor-pointer border-b-2 pb-4 text-sm whitespace-nowrap transition-colors duration-200",
                  isActive
                    ? "border-accent font-semibold text-text"
                    : "border-transparent text-text-muted hover:text-text",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-16 rounded-surface border border-dashed border-border-strong px-6 py-16 text-center">
          <p className="text-base font-semibold text-text">
            Belum ada artikel di kategori ini
          </p>
          <p className="mx-auto mt-2 max-w-[46ch] text-sm leading-relaxed text-text-muted">
            Artikel baru terbit secara berkala. Sementara itu, lihat semua
            tulisan yang sudah tersedia.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory(ALL)}
            className="mt-6 cursor-pointer font-mono text-xs font-semibold text-accent-text underline underline-offset-4 hover:no-underline"
          >
            Tampilkan semua artikel
          </button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-surface border border-border bg-bg-subtle">
                  <Image
                    src={post.meta.image}
                    alt={post.meta.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                  {/* Metadata reads over the photo, so the strip carries its own
                      scrim: it stays legible where backdrop-filter is unsupported
                      or disabled by prefers-reduced-transparency. */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-white/15 bg-black/55 px-4 py-3 font-mono text-[11px] text-white backdrop-blur-md">
                    <span className="tabular-nums">
                      <time dateTime={post.meta.date}>
                        {formatDate(post.meta.date)}
                      </time>
                      <span className="px-1.5 text-white/40">·</span>
                      {post.meta.readingMinutes} menit baca
                    </span>
                    <span className="shrink-0 font-semibold">
                      {post.meta.category}
                    </span>
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-balance text-text decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {post.meta.title}
                </h2>

                <p className="mt-3 line-clamp-2 max-w-[52ch] text-sm leading-relaxed text-text-muted">
                  {post.meta.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-text">
                  Baca artikel
                  <ArrowUpRightIcon
                    weight="bold"
                    aria-hidden
                    className="size-3.5 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogExplorer;
