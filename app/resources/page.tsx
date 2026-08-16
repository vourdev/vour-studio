import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { BackgroundBeams } from "@/components/ui/background-beams";
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
    <>
      {/* Hero Section with Backdrop Beams */}
      <Section className="relative pt-32 pb-16 overflow-hidden bg-bg/85 border-b border-border">
        <BackgroundBeams className="opacity-15" />
        <Container>
          <Reveal>
            <h1 className="font-mono text-[1.8rem] font-semibold tracking-[-0.035em] md:text-[2.5rem] lg:text-[3rem] leading-none text-balance">
              Catatan dari ruang kerja
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
              Keputusan teknis yang kami ambil di project sungguhan, termasuk beberapa yang belakangan ternyata salah.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Main content grid managed client-side for performance and responsiveness */}
      <Section className="bg-bg/40">
        <Container>
          <BlogExplorer posts={posts} />
        </Container>
      </Section>
    </>
  );
}
