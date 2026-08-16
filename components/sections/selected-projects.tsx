import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import type { Project } from "@/lib/data/projects";
import { PROJECTS_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Two alternating image/text rows, then a full-bleed row that breaks the
 * pattern. Three consecutive zigzags would read as template filler.
 *
 * The result leads each card. A prospect is scanning for what the client got
 * back, not for a screenshot.
 *
 * Projects come from the CMS, so the count is not guaranteed: the zigzag rows
 * render whatever is available and the full-bleed row only when a third
 * project exists.
 */
export function SelectedProjects({ projects }: { projects: Project[] }) {
  const [first, second, third] = projects;
  const zigzag = [first, second].filter(Boolean) as Project[];

  return (
    <Section id="projects" className="border-t border-border">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Apa yang berubah setelah project selesai
          </h2>
        </Reveal>
      </Container>

      {zigzag.length > 0 ? (
        <Container className="mt-14 space-y-20">
        {zigzag.map((project, i) => (
          <Reveal key={project.slug} y={32}>
            <article
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                i % 2 === 1 && "lg:[&>figure]:order-2",
              )}
            >
              <figure className="relative aspect-3/2 overflow-hidden rounded-surface border border-border">
                {/* TODO(Vour): real project screenshot, 1200x800. */}
                <Image
                  src={project.image}
                  alt={`Tampilan project ${project.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </figure>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                  {project.industry} / {project.year}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-balance md:text-[1.75rem]">
                  {project.result}
                </h3>

                <dl className="mt-7 space-y-5 text-sm">
                  <div>
                    <dt className="font-medium text-text">Tantangan</dt>
                    <dd className="mt-1.5 max-w-[52ch] leading-relaxed text-text-muted">
                      {project.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text">Yang kami kerjakan</dt>
                    <dd className="mt-1.5 max-w-[52ch] leading-relaxed text-text-muted">
                      {project.solution}
                    </dd>
                  </div>
                </dl>

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
            </article>
          </Reveal>
        ))}
        </Container>
      ) : null}

      {/* Pattern break: full-bleed image, caption below rather than overlaid. */}
      {third ? (
        <Reveal y={32} className="mt-20">
          <figure className="relative aspect-16/9 w-full overflow-hidden border-y border-border md:aspect-[21/9]">
            {/* TODO(Vour): real project screenshot, 1600x900. */}
            <Image
              src={third.image}
              alt={`Tampilan project ${third.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>
          <Container className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                {third.industry} / {third.year}
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-balance">
                {third.result}
              </h3>
            </div>
            <div className="space-y-5 text-sm">
              <p className="max-w-[52ch] leading-relaxed text-text-muted">
                {third.challenge}
              </p>
              <p className="max-w-[52ch] leading-relaxed text-text-muted">
                {third.solution}
              </p>
            </div>
          </Container>
        </Reveal>
      ) : null}

      {projects.length > 0 ? (
        <Container className="mt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
          >
            {PROJECTS_CTA}
            <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
          </Link>
        </Container>
      ) : null}
    </Section>
  );
}
