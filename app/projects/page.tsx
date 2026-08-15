import { SparkleIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Project yang sudah diselesaikan Vour, lengkap dengan tantangan, pengerjaan, dan hasil yang dicapai untuk setiap klien.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Section className="pt-32 pb-8">
        <Container>
          <Reveal>
            <h1 className="max-w-[24ch] font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem] text-balance">
              Project pilihan yang telah kami selesaikan
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
              Setiap studi kasus dijelaskan lewat masalah nyata yang dihadapi bisnis klien dan dampak terukur setelah sistem dirilis.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-16">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={project.slug} index={i} y={30}>
                <article
                  id={project.slug}
                  className="group overflow-hidden rounded-surface border border-border bg-bg-subtle transition-all duration-300 hover:border-border-strong"
                >
                  <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
                    {/* Visual Browser Mockup (Alternating order on desktop) */}
                    <div className={!isEven ? "lg:order-2" : ""}>
                      <div className="overflow-hidden rounded-control border border-border bg-bg shadow-xl">
                        {/* Browser Window Frame Bar */}
                        <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-3 py-2">
                          <span className="size-2 rounded-full bg-red-500/60" />
                          <span className="size-2 rounded-full bg-yellow-500/60" />
                          <span className="size-2 rounded-full bg-green-500/60" />
                          <span className="ml-2 flex-1 rounded bg-bg px-2 py-0.5 font-mono text-[0.65rem] text-text-faint truncate">
                            vour.studio/case-study/{project.slug}
                          </span>
                        </div>
                        <div className="relative aspect-16/10 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`Tampilan project ${project.name}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className={!isEven ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-xs text-text-muted">
                          {project.industry}
                        </span>
                        <span className="font-mono text-xs text-text-faint">{project.year}</span>
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                        {project.name}
                      </h2>

                      {/* Key Result Impact Box */}
                      <div className="mt-5 rounded-control border border-accent/30 bg-accent/10 p-4">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-text">
                          <SparkleIcon className="size-4 shrink-0" />
                          <span>HASIL & DAMPAK UTAMA</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-text font-medium">
                          {project.result}
                        </p>
                      </div>

                      {/* Challenge & Solution Grid */}
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs">
                        <div className="rounded-control border border-border bg-bg p-3.5">
                          <p className="font-mono uppercase tracking-wider text-text-faint text-[0.65rem]">
                            Tantangan Klien
                          </p>
                          <p className="mt-1.5 leading-relaxed text-text-muted">
                            {project.challenge}
                          </p>
                        </div>

                        <div className="rounded-control border border-border bg-bg p-3.5">
                          <p className="font-mono uppercase tracking-wider text-accent-text text-[0.65rem]">
                            Solusi Vour
                          </p>
                          <p className="mt-1.5 leading-relaxed text-text-muted">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Technology Stack Badges */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-text-faint">
                          Stack:
                        </span>
                        {project.technology.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[0.65rem] text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}


