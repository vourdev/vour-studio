import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getPosts } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Catatan soal keputusan teknis yang kami ambil di project sungguhan, ditulis supaya bisa dibaca developer maupun pemilik bisnis.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const posts = await getPosts();

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      {/* 1. Header Hero Area */}
      <Container className="text-left">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
              Engineering Notes &amp; Insights
            </span>
            <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
              Catatan dari Ruang Kerja
            </h1>
            <p className="mt-4 text-base text-text-muted leading-relaxed max-w-[56ch]">
              Keputusan arsitektur, pola rekayasa, dan studi kasus teknis yang kami temukan saat membangun produk digital sungguhan.
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
