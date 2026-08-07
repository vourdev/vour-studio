import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { getAllPosts } from "@/lib/content";
import { RESOURCES_CTA } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

/**
 * The grid has exactly as many columns as there are posts, so a single article
 * renders as one wide editorial card rather than one narrow card beside two
 * empty cells.
 */
const GRID_BY_COUNT: Record<number, string> = {
  1: "md:grid-cols-1 md:max-w-3xl",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export async function ResourcesPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  const gridClass = GRID_BY_COUNT[posts.length] ?? "md:grid-cols-3";
  const single = posts.length === 1;

  return (
    <Section id="resources" className="border-t border-border">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Catatan dari ruang kerja kami
          </h2>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
          >
            {RESOURCES_CTA}
            <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
          </Link>
        </div>

        <ul className={cn("mt-12 grid gap-8", gridClass)}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} as="li" index={i}>
              <article className="group h-full">
                <Link
                  href={`/resources/${post.slug}`}
                  className={cn("block", single && "grid gap-8 sm:grid-cols-2 sm:items-center")}
                >
                  <div className="relative aspect-16/10 overflow-hidden rounded-surface border border-border">
                    {/* TODO(Vour): real article cover, 1200x675. */}
                    <Image
                      src={post.meta.image}
                      alt=""
                      fill
                      sizes={single ? "(max-width: 640px) 100vw, 24rem" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className={single ? "" : "mt-5"}>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                      {post.meta.category}
                    </p>
                    <h3
                      className={cn(
                        "mt-3 font-medium leading-snug text-balance transition-colors group-hover:text-accent-text",
                        single ? "text-xl md:text-2xl" : "text-lg",
                      )}
                    >
                      {post.meta.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {post.meta.description}
                    </p>
                    <p className="mt-4 font-mono text-xs text-text-faint">
                      {formatDate(post.meta.date)} / {post.meta.readingMinutes} menit baca
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
