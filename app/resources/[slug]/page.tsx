import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { getPost, isPostSlug, postSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PRIMARY_CTA } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

// Every article is known at build time, so an unknown slug is a 404 rather than
// an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isPostSlug(slug)) return {};
  const { meta } = await getPost(slug);

  return {
    ...buildMetadata({
      title: meta.title,
      description: meta.description,
      path: `/resources/${slug}`,
      image: meta.image,
    }),
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      images: [{ url: meta.image }],
    },
  };
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  if (!isPostSlug(slug)) notFound();

  const { meta, Content } = await getPost(slug);

  return (
    <article className="pt-32">
      <Container className="max-w-3xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeftIcon weight="bold" className="size-3.5" aria-hidden />
          Kembali ke Blog
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
          {meta.category}
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-balance md:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-5 leading-relaxed text-text-muted">{meta.description}</p>
        <p className="mt-6 font-mono text-xs text-text-faint">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> /{" "}
          {meta.readingMinutes} menit baca
        </p>
      </Container>

      <Container className="mt-12 max-w-5xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-surface border border-border">
          {/* TODO(VOUR): real article cover, 1200x675. */}
          <Image
            src={meta.image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="object-cover"
          />
        </div>
      </Container>

      <Container className="mt-14 max-w-3xl pb-8">
        <Content />
      </Container>

      {meta.related && meta.related.length > 0 ? (
        <Container className="max-w-3xl">
          <div className="border-t border-border pt-8">
            <h2 className="text-sm font-medium">Terkait</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {meta.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-control border border-border px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      ) : null}

      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-surface border border-border bg-bg-subtle p-8 md:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">
              Punya pertanyaan tentang topik ini?
            </h2>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-text-muted">
              Kalau situasi Anda tidak persis seperti contoh di atas, ceritakan saja.
              Konsultasi awal tidak dipungut biaya.
            </p>
            <Button asChild className="mt-7">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
