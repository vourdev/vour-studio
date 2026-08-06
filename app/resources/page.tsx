import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { getAllPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Tutorial, studi kasus, dan catatan pengembangan dari VOUR. Ditulis untuk developer dan pemilik bisnis yang ingin memahami keputusan teknis tanpa jargon.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <Section className="pt-32">
      <Container>
        <h1 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Tulisan, tutorial, dan catatan pengembangan
        </h1>
        <p className="mt-5 max-w-[58ch] leading-relaxed text-text-muted">
          Ditulis untuk dibaca sekali dan langsung bisa dipakai. Tanpa jargon yang
          tidak perlu.
        </p>

        {featured ? (
          <Reveal y={32} className="mt-14">
            <Link
              href={`/resources/${featured.slug}`}
              className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-surface border border-border">
                {/* TODO(VOUR): real article cover, 1200x675. */}
                <Image
                  src={featured.meta.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                  {featured.meta.category}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-balance md:text-3xl">
                  {featured.meta.title}
                </h2>
                <p className="mt-4 max-w-[54ch] leading-relaxed text-text-muted">
                  {featured.meta.description}
                </p>
                <p className="mt-5 font-mono text-xs text-text-faint">
                  {formatDate(featured.meta.date)} / {featured.meta.readingMinutes} menit
                  baca
                </p>
              </div>
            </Link>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <ul className="mt-20 grid gap-8 md:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} as="li" index={i}>
                <Link href={`/resources/${post.slug}`} className="group block">
                  <div className="relative aspect-16/10 overflow-hidden rounded-surface border border-border">
                    <Image
                      src={post.meta.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                    {post.meta.category}
                  </p>
                  <h2 className="mt-3 text-lg font-medium leading-snug text-balance transition-colors group-hover:text-accent-text">
                    {post.meta.title}
                  </h2>
                  <p className="mt-4 font-mono text-xs text-text-faint">
                    {formatDate(post.meta.date)} / {post.meta.readingMinutes} menit baca
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-20 rounded-surface border border-dashed border-border p-10 text-center text-sm text-text-muted">
            Tulisan berikutnya sedang disiapkan.
          </p>
        )}
      </Container>
    </Section>
  );
}
