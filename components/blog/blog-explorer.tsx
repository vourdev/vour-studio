"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

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

/** Three full rows on desktop. The grid is 3-up at lg and 2-up at md, so this
 *  leaves one orphan on tablet, which reads as a normal ragged grid. */
const PAGE_SIZE = 9;

/**
 * Page numbers to draw: always the first and last, always the current and its
 * neighbours, an ellipsis for whatever that skips. Rendering all of them was
 * fine at ten articles and is not the shape this list is growing into.
 */
function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const shown = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  let previous = 0;
  for (const page of shown) {
    if (previous && page - previous > 1) out.push("gap");
    out.push(page);
    previous = page;
  }
  return out;
}

export function BlogExplorer({ posts }: { posts: PostItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  /** Skips the scroll on first paint, which would otherwise jump a visitor
   *  landing on /blog past the page heading. */
  const hasPaged = useRef(false);

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

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  // Clamp rather than trust: switching to a smaller category while on page 3
  // would otherwise show an empty grid instead of that category's articles.
  const currentPage = Math.min(page, pageCount);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = (next: number) => {
    hasPaged.current = true;
    setPage(Math.min(Math.max(next, 1), pageCount));
  };

  useEffect(() => {
    if (!hasPaged.current) return;
    // The top of the list, not the top of the document: the reader asked for
    // the next page, not for the page heading again.
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

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
                onClick={() => {
                  setActiveCategory(name);
                  setPage(1);
                }}
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
            onClick={() => {
              setActiveCategory(ALL);
              setPage(1);
            }}
            className="mt-6 cursor-pointer font-mono text-xs font-semibold text-accent-text underline underline-offset-4 hover:no-underline"
          >
            Tampilkan semua artikel
          </button>
        </div>
      ) : (
        <div ref={listRef} className="mt-12 grid scroll-mt-28 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
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

      {pageCount > 1 && (
        <nav
          aria-label="Halaman artikel"
          className="mt-16 flex items-center justify-center gap-1.5"
        >
          <PageButton
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            label="Halaman sebelumnya"
          >
            <ArrowLeftIcon weight="bold" aria-hidden className="size-3.5" />
          </PageButton>

          {pageWindow(currentPage, pageCount).map((entry, index) =>
            entry === "gap" ? (
              <span
                // Position is the only thing distinguishing two gaps.
                key={`gap-${index}`}
                aria-hidden
                className="px-1 font-mono text-xs text-text-faint"
              >
                &hellip;
              </span>
            ) : (
              <PageButton
                key={entry}
                onClick={() => goToPage(entry)}
                active={entry === currentPage}
                label={`Halaman ${entry}`}
              >
                {entry}
              </PageButton>
            ),
          )}

          <PageButton
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount}
            label="Halaman berikutnya"
          >
            <ArrowRightIcon weight="bold" aria-hidden className="size-3.5" />
          </PageButton>
        </nav>
      )}

      {pageCount > 1 && (
        <p className="mt-4 text-center font-mono text-xs text-text-faint">
          Halaman {currentPage} dari {pageCount} &middot; {filteredPosts.length} artikel
        </p>
      )}
    </div>
  );
}

function PageButton({
  children,
  onClick,
  label,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      // `aria-current` rather than `aria-selected`: these are links through a
      // set of pages, not tabs in a tablist.
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-control border font-mono text-xs tabular-nums transition-colors duration-200",
        active
          ? "border-accent/40 bg-accent-soft font-semibold text-accent-text"
          : "border-border text-text-muted hover:border-border-strong hover:bg-bg-subtle hover:text-text",
        disabled && "cursor-not-allowed opacity-40 hover:border-border hover:bg-transparent",
      )}
    >
      {children}
    </button>
  );
}

export default BlogExplorer;
