import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPost, getPosts } from "@/lib/cms";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { PRIMARY_CTA } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    ...buildMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
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

export default async function ResourcePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = [
    articleJsonLd({
      title: post.title,
      description: post.description,
      slug,
      date: post.date,
      image: post.image,
    }),
    breadcrumbJsonLd([
      { name: "Beranda", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ]),
  ];

  return (
    <article className="pt-28 pb-20 md:pt-32 md:pb-28">
      <script
        type="application/ld+json"
        // Author-controlled CMS content, serialised through JSON.stringify.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-xs text-text-muted transition-colors duration-150 hover:text-accent-text"
        >
          <ArrowLeftIcon weight="bold" className="size-3.5" aria-hidden />
          Kembali ke Blog
        </Link>

        <p className="mt-9 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
          {post.category}
        </p>

        <h1 className="mt-4 font-display text-2xl font-bold leading-[1.2] tracking-tight text-balance text-text sm:text-3xl md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-pretty text-text-muted md:text-lg">
          {post.description}
        </p>
      </Container>

      {/* The cover breaks wider than the reading column: it is the article's
          one full-scale visual, and the body returns to a 3xl measure below. */}
      <Container className="mt-12 max-w-5xl md:mt-14">
        <Image
          src={post.image}
          alt={`Gambar Cover ${post.title}`}
          width={1600}
          height={900}
          priority
          sizes="(max-width: 1088px) 100vw, 1088px"
          className="aspect-16/9 w-full rounded-surface object-cover outline outline-white/10 -outline-offset-1"
        />
      </Container>

      <Container className="mt-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-8 font-mono text-xs text-text-faint">
          <span className="inline-flex items-center gap-2">
            Ditulis oleh
            <Logo className="text-sm text-text" />
          </span>
          <span className="inline-flex items-center gap-2 tabular-nums">
            <CalendarBlankIcon className="size-4" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-2 tabular-nums">
            <ClockIcon className="size-4" aria-hidden />
            {post.readingMinutes} menit baca
          </span>
        </div>
      </Container>

      <Container className="mt-12 max-w-3xl md:mt-14">
        <div className="article-prose">
          <ArticleContent content={post.content} />
        </div>
      </Container>

      <Container className="mt-16 max-w-3xl">
        <div className="rounded-surface border border-border bg-bg-subtle/60 p-8 md:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-balance text-text md:text-2xl">
            Butuh penyesuaian khusus untuk project Anda?
          </h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-pretty text-text-muted">
            Jika situasi operasional atau arsitektur sistem bisnis Anda
            membutuhkan solusi kustom, diskusikan langsung bersama tim engineer
            kami. Anda juga bisa{" "}
            <Link
              href="/solutions"
              className="text-accent-text underline underline-offset-4 hover:no-underline"
            >
              melihat rincian layanan vour.dev
            </Link>{" "}
            atau{" "}
            <Link
              href="/estimate"
              className="text-accent-text underline underline-offset-4 hover:no-underline"
            >
              menghitung estimasi biaya project
            </Link>{" "}
            lebih dulu.
          </p>
          <Button asChild size="sm" className="mt-7">
            <Link href="/contact">
              {PRIMARY_CTA}
              <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </article>
  );
}
