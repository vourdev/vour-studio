import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { projects } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Project yang sudah diselesaikan VOUR, lengkap dengan tantangan, pengerjaan, dan hasil yang dicapai untuk setiap klien.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <Container>
          <h1 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Project yang sudah kami selesaikan
          </h1>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-text-muted">
            Setiap project di bawah dijelaskan lewat masalah yang dihadapi klien dan
            apa yang berubah setelahnya, bukan lewat daftar fitur.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-16">
          {projects.map((project, i) => (
            <Reveal key={project.slug} index={i} y={28}>
              <article
                id={project.slug}
                className="overflow-hidden rounded-surface border border-border bg-bg-subtle"
              >
                <div className="relative aspect-16/9 border-b border-border">
                  {/* TODO(VOUR): real project screenshot. */}
                  <Image
                    src={project.image}
                    alt={`Tampilan project ${project.name}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 76rem"
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                      {project.industry} / {project.year}
                    </p>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight">
                      {project.name}
                    </h2>
                    <p className="mt-4 max-w-[44ch] leading-relaxed text-text-muted">
                      {project.result}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.technology.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-control border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="space-y-6 text-sm">
                    <div>
                      <dt className="font-medium text-text">Tantangan</dt>
                      <dd className="mt-2 max-w-[56ch] leading-relaxed text-text-muted">
                        {project.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text">Yang kami kerjakan</dt>
                      <dd className="mt-2 max-w-[56ch] leading-relaxed text-text-muted">
                        {project.solution}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
