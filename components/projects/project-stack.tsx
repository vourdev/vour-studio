"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/data/projects";

/** Where the first card parks, clear of the fixed nav. */
const STACK_TOP_REM = 7;
/** Each card parks slightly lower, so the ones beneath stay visible as a lip. */
const STACK_STEP_REM = 1.1;

/**
 * Projects as a scroll stack: each case parks under the nav and the next one
 * slides over it, leaving a lip of the cards beneath.
 *
 * The pattern is React Bits' ScrollStack. Its component is not used directly
 * because it constructs its own Lenis instance on `window`, and this site
 * already runs one in `components/layout/lenis-provider.tsx`; two instances
 * driving the same scroll fight each other. The stacking here is plain CSS
 * `position: sticky`, and the depth cue is a Motion transform, so it rides the
 * existing smooth scroll instead of competing with it.
 *
 * Stacking is desktop-only. A card is about two thirds of a laptop viewport;
 * on a phone the same card is taller than the screen, so pinning it would trap
 * the reader rather than move them along. Below `lg` the cards are a plain
 * divided list.
 */
export function ProjectStack({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Progress across the whole stack. Measuring the container rather than each
  // card is deliberate: a sticky card's bounding box freezes while it is
  // pinned, so per-card measurement stalls exactly when the effect is needed.
  // Cards share one template and run to similar heights, so an even slice per
  // card tracks closely enough.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (projects.length === 0) return <EmptyState />;

  return (
    <Container>
      {/* Trailing room so the last card can reach its park position before the
          section ends. 16vh left a visible hole under the stack. */}
      <ol ref={containerRef} className="relative lg:pb-[7vh]">
        {projects.map((project, index) => (
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            reduce={Boolean(reduce)}
          />
        ))}
      </ol>

      <p className="mt-10 max-w-[58ch] text-sm leading-relaxed text-text-muted">
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

function StackCard({
  project,
  index,
  total,
  progress,
  reduce,
}: {
  project: Project;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  // A card only recedes once the NEXT one has parked on top of it. Mapping the
  // transform to the card's own segment instead made the card you were reading
  // shrink and fade under you, which read as a rendering fault rather than
  // depth.
  const coveredAt = (index + 1) / total;
  const scale = useTransform(progress, [coveredAt, coveredAt + 0.5 / total], [1, 0.965]);

  // No opacity fade: a covered card sits behind an opaque one, so the only part
  // still visible is the lip at its top edge. Fading that is imperceptible,
  // while fading a card too early makes the stack look see-through.
  const isLast = index === total - 1;
  const depth = reduce || isLast ? undefined : { scale };

  return (
    <li
      className="mb-6 last:mb-0 lg:sticky"
      style={{ top: `${STACK_TOP_REM + index * STACK_STEP_REM}rem` }}
    >
      <motion.article
        id={project.slug}
        style={depth}
        className="origin-top overflow-hidden rounded-surface border border-border bg-bg scroll-mt-28 lg:will-change-transform"
      >
        <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 lg:p-9">
          <Image
            src={project.image}
            alt={`Tampilan ${project.name}`}
            width={1200}
            height={900}
            // First card is the LCP candidate on most viewports; the rest lazy.
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 38rem"
            className="aspect-16/10 w-full rounded-[calc(var(--radius-surface)-0.25rem)] border border-border object-cover"
          />

          {/* Centred against the image: a year badge, a name and a short body
              leave the column shorter than the screenshot beside it, and
              top-aligning the two made the card look half-empty. */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-control border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-xs tabular-nums text-accent-text">
                {project.year}
              </span>
              <span className="font-mono text-xs text-text-faint">
                {project.industry}
              </span>
            </div>

            <h2 className="mt-4 text-pretty font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">
              {project.name}
            </h2>

            {project.description && (
              <div className="project-prose mt-3 max-w-[52ch] text-pretty leading-[1.6] text-text-muted">
                <RichText data={project.description} />
              </div>
            )}

            {project.technology.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-1.5">
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
        </div>
      </motion.article>
    </li>
  );
}

function EmptyState() {
  return (
    <Container>
      <div className="mx-auto max-w-lg rounded-surface border border-dashed border-border-strong px-6 py-16 text-center">
        <p className="text-base font-medium text-text">
          Belum ada catatan project yang dipublikasikan.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Kami sedang menyiapkan tulisannya. Sementara itu, jenis pekerjaan yang
          kami tangani ada di halaman layanan.
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
