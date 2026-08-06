"use client";

import { useEffect, useRef } from "react";

import { Container, Section } from "@/components/ui/container";
import { workflowSteps } from "@/lib/data/services";

/**
 * The only GSAP section on the site, and the only scrubbed animation.
 *
 * The motion is doing real work here: the path drawing through the six nodes IS
 * the six-step process, so scroll position maps onto progress through the
 * engagement. Everywhere else, a plain Motion reveal is enough.
 *
 * GSAP never shares a tree with Motion components. This file imports it, nothing
 * else does, and it is loaded lazily from the effect so it stays out of the
 * initial bundle.
 */
export function Workflow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static end state: full path, all nodes lit. Nothing is hidden from a
      // visitor who cannot tolerate the animation.
      root.querySelectorAll<SVGPathElement>("[data-progress-path]").forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      });
      root.querySelectorAll<HTMLElement>("[data-node]").forEach((node) => {
        node.dataset.active = "true";
      });
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const paths = gsap.utils.toArray<SVGPathElement>("[data-progress-path]");
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");

        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "bottom 78%",
              scrub: 1,
              // Recalculate on resize: the path length changes when the layout
              // flips between the vertical and horizontal variants.
              invalidateOnRefresh: true,
            },
          });
        });

        // Each node lights as the drawing passes it, so the sequence is legible
        // rather than everything arriving at once.
        nodes.forEach((node, i) => {
          ScrollTrigger.create({
            trigger: root,
            start: `top ${70 - i * 6}%`,
            end: "bottom 78%",
            onEnter: () => (node.dataset.active = "true"),
            onLeaveBack: () => (node.dataset.active = "false"),
          });
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <Section className="border-t border-border bg-bg-subtle">
      <Container>
        <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Cara kami mengerjakan project
        </h2>
        <p className="mt-4 max-w-[54ch] text-text-muted">
          Enam tahap yang sama untuk setiap project, supaya Anda selalu tahu sedang
          ada di posisi mana.
        </p>

        <div ref={rootRef} className="relative mt-16">
          {/* Vertical rail, mobile and tablet. */}
          <svg
            className="absolute left-[0.6875rem] top-2 h-[calc(100%-1rem)] w-px lg:hidden"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0.5 0 V100" stroke="var(--border)" strokeWidth="1" fill="none" />
            <path
              data-progress-path
              d="M0.5 0 V100"
              stroke="var(--accent)"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Horizontal rail, desktop. */}
          <svg
            className="absolute left-0 top-[0.6875rem] hidden h-px w-full lg:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0 0.5 H100" stroke="var(--border)" strokeWidth="1" fill="none" />
            <path
              data-progress-path
              d="M0 0.5 H100"
              stroke="var(--accent)"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="grid gap-9 lg:grid-cols-6 lg:gap-6">
            {workflowSteps.map((step) => (
              <li key={step.title} className="relative pl-9 lg:pl-0">
                <span
                  data-node
                  data-active="false"
                  className="absolute left-0 top-1 flex size-[1.375rem] items-center justify-center rounded-full border border-border bg-bg transition-colors duration-500 data-[active=true]:border-accent data-[active=true]:bg-accent lg:static lg:mb-6"
                  aria-hidden
                />
                {/* The verb is the label. No "Step 1 / Tahap 01" prefix. */}
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
