import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TracingBeam } from "@/components/ui/tracing-beam";
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
    <article className="pt-28 pb-20 md:pt-36 md:pb-28">
      {/* 1. Header Hero Area */}
      <Container className="max-w-3xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-text transition-colors duration-200"
        >
          <ArrowLeftIcon weight="bold" className="size-3.5" aria-hidden />
          Kembali ke Blog
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="rounded-md bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-semibold text-accent-text">
            {post.category}
          </span>
          <span className="font-mono text-xs text-text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} menit baca
          </span>
        </div>

        <h1 className="mt-4 font-mono text-2.5xl font-bold leading-tight tracking-tight text-text sm:text-3xl md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
          {post.description}
        </p>
      </Container>

      {/* 2. Panoramic Cover Image */}
      <Container className="mt-10 md:mt-14 max-w-4.5xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-xl border border-border bg-surface shadow-md">
          <Image
            src={post.image}
            alt={`Gambar Cover ${post.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="object-cover"
          />
        </div>
      </Container>

      {/* 3. Tracing Beam Article Body wrapper */}
      <div className="mt-12 md:mt-16">
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
            <h2 className="text-xs font-semibold uppercase tracking-wider font-mono text-text-faint">
              Artikel Terkait
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {post.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-lg border border-border bg-surface px-4 py-2 font-mono text-xs text-text-muted hover:border-accent hover:text-accent-text hover:bg-bg-subtle transition-all duration-200"
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
      <Container className="max-w-3xl mt-16">
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-8 md:p-10 shadow-sm">
          <div className="relative z-10">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-text">
              Konsultasi Engineering
            </span>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-text md:text-2xl">
              Butuh penyesuaian khusus untuk project Anda?
            </h2>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-text-muted">
              Jika situasi operasional atau arsitektur sistem bisnis Anda membutuhkan solusi kustom, diskusikan langsung bersama tim engineer kami.
            </p>
            <Button asChild size="sm" className="mt-6 rounded-lg px-5">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
