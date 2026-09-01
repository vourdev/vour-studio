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
      <Container>
        <Reveal>
          {/* Title and standfirst share one baseline on desktop and stack on
              mobile, so the standfirst never floats loose in a corner. */}
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-text sm:text-5xl md:col-span-7 md:text-6xl">
              Insights
            </h1>
            <p className="max-w-[46ch] text-base leading-relaxed text-text-muted md:col-span-5 md:justify-self-end md:text-right">
              Panduan memilih jenis website, memperkirakan biaya, sampai urusan
              deployment dan server.
            </p>
          </div>

          <p className="mt-8 max-w-[60ch] text-sm leading-relaxed text-text-muted">
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
        </Reveal>
      </Container>

      <Container className="mt-14 md:mt-20">
        <BlogExplorer posts={posts} />
      </Container>
    </div>
  );
}
