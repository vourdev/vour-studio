import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

  return (
    <article className="pt-28 pb-20 md:pt-32 md:pb-28">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-xs text-text-muted transition-colors duration-150 hover:text-accent-text"
        >
          <ArrowLeftIcon weight="bold" className="size-3.5" aria-hidden />
          Kembali ke Blog
        </Link>

        <h1 className="mt-8 font-mono text-3xl font-bold leading-[1.15] tracking-tight text-balance text-text sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-pretty text-text-muted md:text-lg">
          {post.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-5">
          <span className="inline-flex rounded-control bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-accent-text">
            {post.category}
          </span>
          <span className="font-mono text-xs tabular-nums text-text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="px-1.5 text-border-strong">·</span>
            {post.readingMinutes} menit baca
          </span>
        </div>
      </Container>

      <Container className="mt-10 max-w-4xl md:mt-12">
        <Image
          src={post.image}
          alt={`Gambar Cover ${post.title}`}
          width={1200}
          height={675}
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="aspect-16/9 w-full rounded-surface object-cover outline outline-white/10 -outline-offset-1"
        />
      </Container>

      <Container className="mt-12 max-w-3xl md:mt-16">
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
            kami.
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
