import { ArrowRightIcon, ClockIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { getAllPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Tutorial, studi kasus, dan catatan pengembangan dari Vour. Ditulis untuk developer dan pemilik bisnis yang ingin memahami keputusan teknis tanpa jargon.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Section className="pt-32 pb-8">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Blog & Jurnal Engineering
            </p>
            <h1 className="mt-3 max-w-[24ch] font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Tulisan, tutorial, dan catatan pengembangan
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
              Ditulis langsung oleh tim engineer kami untuk dibaca dan langsung diterapkan. Tanpa teori berbelit-belit.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Featured Article Spotlight Card */}
          {featured ? (
            <Reveal y={32}>
              <article className="group overflow-hidden rounded-surface border border-border bg-bg-subtle transition-all duration-300 hover:border-border-strong">
                <Link href={`/resources/${featured.slug}`} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="overflow-hidden border-b border-border bg-bg lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                      <span className="size-2 rounded-full bg-red-500/60" />
                      <span className="size-2 rounded-full bg-yellow-500/60" />
                      <span className="size-2 rounded-full bg-green-500/60" />
                      <span className="ml-2 font-mono text-[0.65rem] text-text-faint">
                        vour.studio/blog/{featured.slug}
                      </span>
                    </div>
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={featured.meta.image}
                        alt={featured.meta.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="p-6 md:p-10">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-text">
                        {featured.meta.category}
                      </span>
                      <span className="font-mono text-xs text-text-faint flex items-center gap-1">
                        <ClockIcon className="size-3.5" />
                        {featured.meta.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-balance md:text-3xl group-hover:text-accent-text transition-colors">
                      {featured.meta.title}
                    </h2>

                    <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-text-muted">
                      {featured.meta.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                      <span className="font-mono text-xs text-text-faint">
                        {formatDate(featured.meta.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-text group-hover:translate-x-1 transition-transform">
                        <span>Baca Artikel</span>
                        <ArrowRightIcon className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          ) : null}

          {/* Rest of Articles Grid */}
          {rest.length > 0 ? (
            <div className="mt-12 space-y-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                Artikel Terbaru
              </h2>
              <ul className="grid gap-6 md:grid-cols-3">
                {rest.map((post, i) => (
                  <Reveal key={post.slug} as="li" index={i}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle transition-all duration-300 hover:border-border-strong">
                      <Link href={`/resources/${post.slug}`} className="flex flex-1 flex-col">
                        <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-bg">
                          <Image
                            src={post.meta.image}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent-text">
                              {post.meta.category}
                            </span>
                            <span className="font-mono text-[0.65rem] text-text-faint">
                              {post.meta.readingMinutes}m read
                            </span>
                          </div>
                          <h3 className="mt-3 text-base font-semibold leading-snug text-balance transition-colors group-hover:text-accent-text">
                            {post.meta.title}
                          </h3>
                          <p className="mt-4 font-mono text-[0.7rem] text-text-faint mt-auto pt-4 border-t border-border">
                            {formatDate(post.meta.date)}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </ul>
            </div>
          ) : rest.length === 0 && !featured ? (
            <p className="mt-12 rounded-surface border border-dashed border-border p-10 text-center text-sm text-text-muted">
              Tulisan berikutnya sedang disiapkan.
            </p>
          ) : null}
        </Container>
      </Section>
    </>
  );
}


