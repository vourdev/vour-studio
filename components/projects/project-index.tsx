"use client";

import { ArrowUpRightIcon, PlusIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * The project list as an index the reader scans, not a stack of cards.
 *
 * Two behaviours carry it: on a pointer device the row under the cursor floats
 * its screenshot alongside the cursor, and clicking a row opens the case notes
 * in place. Both are motivated - the preview answers "what does this look like"
 * without spending a screen per project, and the disclosure keeps three cases
 * scannable in one viewport instead of three.
 *
 * Pattern adapted from 21st.dev's Project Showcase by @jatin-yadav05 (list-based
 * portfolio with a cursor-tracked preview). Written against our own tokens and
 * Motion primitives.
 *
 * Pointer position lives in motion values, never React state: state would
 * re-render the whole list on every mousemove frame.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);
  const reduce = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 260, damping: 30, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 260, damping: 30, mass: 0.6 });

  const activePreview = hovered !== null ? projects[hovered] : null;

  return (
    <Container>
      <div
        className="relative"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(event.clientX - bounds.left);
          pointerY.set(event.clientY - bounds.top);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {/* Desktop-only, and only when the visitor accepts motion. On touch the
            screenshot is already one tap away inside the open row.

            One frame holding every screenshot, crossfading between them, rather
            than a frame per project: the box keeps its position while the image
            inside it changes, which is what makes the swap read as one object
            following the cursor. */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ x, y }}
            animate={{
              opacity: activePreview ? 1 : 0,
              scale: activePreview ? 1 : 0.88,
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          >
            <div className="relative aspect-16/10 w-72 -translate-y-1/2 translate-x-8 overflow-hidden rounded-surface border border-border-strong bg-bg-subtle shadow-2xl">
              {projects.map((project, index) => (
                <Image
                  key={project.slug}
                  src={project.image}
                  alt=""
                  fill
                  sizes="288px"
                  className="object-cover transition-[opacity,scale,filter] duration-500 ease-out"
                  style={{
                    opacity: hovered === index ? 1 : 0,
                    scale: hovered === index ? 1 : 1.08,
                    filter: hovered === index ? "none" : "blur(8px)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <ul className="border-b border-border">
          {projects.map((project, index) => {
            const isOpen = open === project.slug;

            return (
              <li
                key={project.slug}
                id={project.slug}
                className="scroll-mt-28 border-t border-border"
                onPointerEnter={() => setHovered(index)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : project.slug)}
                  aria-expanded={isOpen}
                  className="group relative grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 text-left md:grid-cols-[5rem_1fr_minmax(0,22rem)_auto] md:gap-x-8"
                >
                  <span
                    aria-hidden
                    className="absolute -inset-x-4 inset-y-0 rounded-surface bg-bg-subtle/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                  />
                  <span className="relative col-start-1 row-start-1 font-mono text-xs tabular-nums text-text-faint transition-colors group-hover:text-accent-text">
                    {project.year}
                  </span>

                  <span className="relative col-start-2 row-start-1 min-w-0">
                    <span className="block text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-text md:text-2xl">
                      <span className="relative inline-block">
                        {project.name}
                        {/* Underline wipes in from the left on hover. Signals the
                            row is interactive before the cursor reaches the
                            control on the far right. */}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-out group-hover:w-full motion-reduce:transition-none"
                        />
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] text-text-faint">
                      {project.industry}
                    </span>
                  </span>

                  <span className="relative col-span-3 col-start-1 row-start-2 mt-3 text-sm leading-relaxed text-text-muted md:col-span-1 md:col-start-3 md:row-start-1 md:mt-0 md:self-center">
                    {project.result}
                  </span>

                  <PlusIcon
                    weight="bold"
                    aria-hidden
                    className={cn(
                      "relative col-start-3 row-start-1 size-4 shrink-0 self-center text-text-faint transition-[transform,color] duration-300 group-hover:text-accent-text md:col-start-4",
                      isOpen && "rotate-45 text-accent-text",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
                        <dl className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                          <div>
                            <dt className="text-[13px] font-medium text-text">
                              Sebelumnya
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-text-muted">
                              {project.challenge}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[13px] font-medium text-accent-text">
                              Yang kami kerjakan
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-text-muted">
                              {project.solution}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-[13px] font-medium text-text">
                              Lingkup pekerjaan
                            </dt>
                            <dd className="mt-3 flex flex-wrap gap-2">
                              {project.technology.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-control border border-border bg-bg-subtle px-2.5 py-1 font-mono text-xs text-text-muted"
                                >
                                  {tech}
                                </span>
                              ))}
                            </dd>
                          </div>
                        </dl>

                        <Image
                          src={project.image}
                          alt={`Tampilan ${project.name}`}
                          width={1040}
                          height={650}
                          sizes="(max-width: 1024px) 100vw, 26rem"
                          className="aspect-16/10 w-full rounded-surface border border-border object-cover lg:order-first"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-[60ch] text-sm leading-relaxed text-text-muted">
          Kebutuhan Anda mirip salah satu di atas?{" "}
          <a
            href="/contact"
            className="inline-flex items-center gap-1 text-accent-text underline underline-offset-4 hover:no-underline"
          >
            Ceritakan lewat halaman kontak
            <ArrowUpRightIcon weight="bold" className="size-3.5" aria-hidden />
          </a>
        </p>
      </div>
    </Container>
  );
}
