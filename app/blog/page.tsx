import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getPosts } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog vour.dev: Panduan Website, Web App, dan Deployment",
  description:
    "Jawaban atas pertanyaan yang sering muncul sebelum membuat website: memilih jenis website, memperkirakan biaya, sampai urusan deployment dan server.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* 1. Header Hero Area */}
      <Container className="text-left">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
              Blog & Insights
            </span>
            <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
              Insights
            </h1>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-muted">
              Jawaban atas pertanyaan yang biasanya muncul sebelum sebuah website
              dibuat: memilih jenis website, memperkirakan biaya, sampai urusan
              deployment dan server. Ditulis supaya bisa dibaca pemilik bisnis
              maupun developer.
            </p>
            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted">
              Sudah tahu yang dibutuhkan?{" "}
              <Link
                href="/solutions"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                Lihat layanan vour.dev
              </Link>{" "}
              atau{" "}
              <Link
                href="/estimate"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                hitung estimasi biaya project
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>

      {/* 2. Main content grid */}
      <Container className="mt-12 md:mt-16">
        <BlogExplorer posts={posts} />
      </Container>
    </div>
  );
}
