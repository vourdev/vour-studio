"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The portfolio as a set of records, each fully open.
 *
 * This replaces a disclosure list. The disclosure was hiding the only thing a
 * prospect came for -- what changed for the client -- behind a click, and
 * because the API was dropping `result`, `challenge` and `solution`, opening a
 * row revealed three headings over nothing. Fixing the API made the case for
 * showing the content outright: with a handful of projects there is no reason
 * to spend interaction on it.
 *
 * On desktop the meta rail is sticky. A case runs about a screen and a half,
 * and the year, the industry and the stack are what orient you while you read
 * the narrative beside them, so they stay put rather than scrolling away.
 */
export function CaseRecord({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <Container>
        <div className="mx-auto max-w-lg rounded-surface border border-dashed border-border-strong px-6 py-16 text-center">
          <p className="text-base font-medium text-text">
            Belum ada catatan project yang dipublikasikan.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Kami sedang menyiapkan tulisannya. Sementara itu, jenis pekerjaan
            yang kami tangani ada di halaman layanan.
          </p>
          <Link
            href="/solutions"
            className="mt-6 inline-flex items-center gap-1.5 rounded-control border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
          >
            Lihat Layanan
            <ArrowUpRightIcon weight="bold" className="size-3.5" aria-hidden />
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="divide-y divide-border border-y border-border">
        {projects.map((project, index) => (
          <CaseRow key={project.slug} project={project} index={index} />
        ))}
      </div>

      <p className="mt-12 max-w-[58ch] text-sm leading-relaxed text-text-muted">
        Kebutuhan Anda mirip salah satu di atas?{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-accent-text underline underline-offset-4 hover:no-underline"
        >
          Ceritakan lewat halaman kontak
          <ArrowUpRightIcon weight="bold" className="size-3.5" aria-hidden />
        </Link>
      </p>
    </Container>
  );
}

function CaseRow({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <article
      id={project.slug}
      className="scroll-mt-28 py-14 md:py-20 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-14"
    >
      {/* Meta rail. `self-start` is what lets `sticky` work inside a grid cell:
          a stretched cell is already the full row height and never scrolls. */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-3 font-mono text-xs tabular-nums text-text-faint lg:block">
          <span className="text-accent-text">{project.year}</span>
          <span className="lg:mt-1 lg:block">{project.industry}</span>
        </div>

        {project.technology.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5 lg:mt-6">
            {project.technology.map((tech) => (
              <li
                key={tech}
                className="rounded-control border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[11px] text-text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 lg:mt-0">
        <h2 className="text-pretty font-display text-2xl font-semibold tracking-[-0.02em] md:text-[1.75rem]">
          {project.name}
        </h2>

        {/* The payoff, set as the lead. It is what a prospect scans for, so it
            outranks the screenshot and the narrative below it. */}
        <p className="mt-4 max-w-[46ch] text-pretty text-lg leading-[1.45] text-text md:text-xl">
          {project.result}
        </p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group mt-9 overflow-hidden rounded-surface border border-border bg-bg-subtle"
        >
          <Image
            src={project.image}
            alt={`Tampilan ${project.name}`}
            width={1600}
            height={1000}
            // First record is above the fold on most viewports and is the LCP
            // candidate; the rest stay lazy.
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 60rem"
            className="aspect-16/10 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </motion.div>

        <dl className="mt-9 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div>
            <dt className="text-sm font-medium text-text-faint">Sebelumnya</dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-text-muted">
              {project.challenge}
            </dd>
          </div>
          <div className="relative sm:pl-10">
            {/* One hairline, marking the before/after break. It replaces the
                arrow-and-dot decoration this section used to carry. */}
            <span
              aria-hidden
              className="absolute left-0 top-1 hidden h-[calc(100%-0.5rem)] w-px bg-border sm:block"
            />
            <dt className="text-sm font-medium text-accent-text">
              Yang kami kerjakan
            </dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-text-muted">
              {project.solution}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
