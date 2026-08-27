import { ArrowRightIcon, ArrowUpRightIcon, ClockIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { RelatedPost } from "@/lib/data/posts";
import { formatDate } from "@/lib/utils";

type RelatedArticlesProps = {
  posts: RelatedPost[];
  title?: string;
  subtitle?: string;
};

export function RelatedArticles({
  posts,
  title = "Artikel Terkait",
  subtitle = "Rekomendasi Bacaan",
}: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <Container className="mt-16 max-w-3xl md:mt-20">
      <div className="border-t border-border pt-10">
        <div className="flex items-center justify-between">
          <div>
            {subtitle ? (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                {subtitle}
              </span>
            ) : null}
            <h2 className="mt-1 font-mono text-xl font-bold tracking-tight text-text sm:text-2xl">
              {title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden font-mono text-xs text-text-muted transition-colors duration-150 hover:text-accent-text sm:inline-flex sm:items-center sm:gap-1.5"
          >
            Semua artikel
            <ArrowRightIcon weight="bold" className="size-3" aria-hidden />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {posts.map((item) => (
            <article
              key={item.slug || item.id}
              className="group relative flex flex-col overflow-hidden rounded-surface border border-border bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <Link href={`/blog/${item.slug}`} className="flex flex-1 flex-col">
                {item.image ? (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-bg-subtle">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      {item.category ? (
                        <span className="inline-flex rounded-control bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">
                          {item.category}
                        </span>
                      ) : null}
                      {item.readingMinutes ? (
                        <span className="flex items-center gap-1 font-mono text-[11px] text-text-faint">
                          <ClockIcon className="size-3" />
                          {item.readingMinutes} min read
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-text transition-colors duration-200 group-hover:text-accent-text">
                      {item.title}
                    </h3>

                    {item.description ? (
                      <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-2">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5 font-mono text-[11px] text-text-faint">
                    {item.date ? (
                      <span>{formatDate(item.date)}</span>
                    ) : (
                      <span />
                    )}
                    <span className="inline-flex items-center gap-1 font-semibold text-accent-text transition-transform duration-200">
                      Baca Artikel
                      <ArrowUpRightIcon
                        weight="bold"
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
