import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getPost, getPosts } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { PRIMARY_CTA } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    ...buildMetadata({
      title: post.title,
      description: post.description,
      path: `/resources/${slug}`,
      image: post.image,
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-16 bg-bg/40">
      {/* 1. Header Hero Area */}
      <Container className="max-w-3xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-accent-text transition-colors duration-200"
        >
          <ArrowLeftIcon weight="bold" className="size-3.5" aria-hidden />
          Kembali ke Blog
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
          {post.category}
        </p>
        <h1 className="mt-4 font-mono text-2xl font-bold leading-tight tracking[-0.035em] text-white md:text-[2.25rem]">
          {post.title}
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-text-muted md:text-base">{post.description}</p>
        <p className="mt-6 font-mono text-xs text-text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time> /{" "}
          {post.readingMinutes} menit baca
        </p>
      </Container>

      {/* 2. Panoramic Cover Image */}
      <Container className="mt-12 max-w-5xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-surface border border-border bg-bg-subtle shadow-2xl">
          <Image
            src={post.image}
            alt={`Gambar Cover ${post.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
        </div>
      </Container>

      {/* 3. Tracing Beam Article Body wrapper */}
      <div className="mt-16">
        <TracingBeam>
          <Container className="max-w-3xl">
            <div className="article-prose">
              <ArticleContent content={post.content} />
            </div>
          </Container>
        </TracingBeam>
      </div>

      {/* 4. Related Posts Section */}
      {post.related && post.related.length > 0 ? (
        <Container className="max-w-3xl mt-16">
          <div className="border-t border-border pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-text">
              Artikel Terkait
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-control border border-border bg-surface-solid/40 px-3.5 py-2 text-xs text-text-muted hover:border-accent hover:text-accent-text hover:bg-surface-solid transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      ) : null}

      {/* 5. In-context Interactive CTA */}
      <Section className="pb-0">
        <Container className="max-w-3xl">
          <div className="relative overflow-hidden rounded-surface border border-border bg-surface-solid/40 p-8 md:p-10 hover:border-accent/40 shadow-xl transition-all duration-300">
            <BackgroundBeams className="opacity-10" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Butuh penyesuaian khusus untuk project Anda?
              </h2>
              <p className="mt-3 max-w-[50ch] text-xs leading-relaxed text-text-muted md:text-sm">
                Jika situasi operasional atau infrastruktur bisnis Anda berbeda dari contoh kasus di atas, beritahu kami. Konsultasi awal bebas biaya.
              </p>
              <Button asChild size="sm" className="mt-6 active:scale-95 transition-transform duration-100">
                <Link href="/contact">{PRIMARY_CTA}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
