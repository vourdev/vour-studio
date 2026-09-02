import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ProjectStack } from "@/components/projects/project-stack";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { getProjects } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Project yang Sudah Dikerjakan vour.dev",
  description:
    "Catatan project vour.dev, ditulis dari keluhan yang kami dengar di pertemuan pertama sampai apa yang berubah setelah sistemnya jalan.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Section spacing="header">
        <Container>
          <Reveal>
            <h1 className="max-w-[30ch] text-balance font-display text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Apa yang berubah setelah sistemnya jalan
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-text-muted md:text-base">
              Tiap catatan ditulis dari keluhan yang kami dengar di pertemuan
              pertama, bukan dari tangkapan layarnya.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted">
              Jenis pekerjaannya dirinci di{" "}
              <Link
                href="/solutions"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                halaman layanan vour.dev
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="continued">
        <ProjectStack projects={projects} />
      </Section>

      <ClosingCta />
    </>
  );
}
