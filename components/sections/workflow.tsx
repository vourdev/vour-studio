"use client";

import { useEffect, useRef } from "react";

import { Container, Section } from "@/components/ui/container";
import { LENIS_SCROLL_EVENT } from "@/components/layout/lenis-provider";
import { workflowSteps } from "@/lib/data/services";

export function Workflow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-progress-line], [data-progress-line-v]").forEach((el) => {
        el.style.transform = "none";
      });
      root.querySelectorAll<HTMLElement>("[data-node], [data-title]").forEach((el) => {
        el.dataset.active = "true";
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

      // Lenis scrolls the page on its own schedule; keep ScrollTrigger in sync.
      const onLenisScroll = () => ScrollTrigger.update();
      window.addEventListener(LENIS_SCROLL_EVENT, onLenisScroll);

      const ctx = gsap.context(() => {
        const lineH = root.querySelector<HTMLElement>("[data-progress-line]");
        const lineV = root.querySelector<HTMLElement>("[data-progress-line-v]");
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
        const titles = gsap.utils.toArray<HTMLElement>("[data-title]");

        // Initial unlit state
        if (lineH) gsap.set(lineH, { scaleX: 0 });
        if (lineV) gsap.set(lineV, { scaleY: 0 });
        nodes.forEach((node) => (node.dataset.active = "false"));
        titles.forEach((title) => (title.dataset.active = "false"));

        // ScrollTrigger to scrub line filling and node activation as user scrolls down
        ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          end: "bottom 40%",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            if (lineH) gsap.set(lineH, { scaleX: p });
            if (lineV) gsap.set(lineV, { scaleY: p });

            nodes.forEach((node, i) => {
              const title = titles[i];
              const threshold = nodes.length > 1 ? i / (nodes.length - 1) : 0;
              // Step 1 activates at initial scroll entry (p > 0.01), subsequent steps activate when line reaches them
              const isActive = p >= (i === 0 ? 0.01 : threshold);

              node.dataset.active = isActive ? "true" : "false";
              if (title) title.dataset.active = isActive ? "true" : "false";
            });
          },
        });
      }, root);

      cleanup = () => {
        window.removeEventListener(LENIS_SCROLL_EVENT, onLenisScroll);
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <Section id="workflow" className="relative border-t border-border bg-bg-subtle/50">
      <Container>
        <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Cara kami mengerjakan project
        </h2>
        <p className="mt-4 max-w-[54ch] text-text-muted">
          Enam tahap yang sama untuk setiap project, supaya Anda selalu tahu sedang ada di posisi mana.
        </p>

        <div ref={rootRef} className="relative mt-16">
          {/* Vertical rail line (mobile & tablet) */}
          <div className="absolute left-[1.125rem] top-5 bottom-5 w-0.5 lg:hidden bg-border overflow-hidden -translate-x-1/2 z-0">
            <div
              data-progress-line-v
              className="h-full w-full bg-accent origin-top"
            />
          </div>

          {/* Horizontal rail line (desktop: starts at Node 1 center and ends at Node 6 center) */}
          <div className="absolute left-[1.125rem] right-[calc(100%/6-1.125rem)] top-[1.125rem] hidden h-0.5 lg:block bg-border overflow-hidden -translate-y-1/2 z-0">
            <div
              data-progress-line
              className="h-full w-full bg-accent origin-left"
            />
          </div>

          <ol className="grid gap-9 lg:grid-cols-6 lg:gap-6">
            {workflowSteps.map((step, index) => {
              const stepNumber = String(index + 1).padStart(2, "0");
              return (
                <li key={step.title} className="relative pl-12 lg:pl-0">
                  {/* Step Node Circle with Step Number */}
                  <span
                    data-node
                    data-active="false"
                    className="absolute left-0 top-0.5 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs font-semibold text-text-faint transition-all duration-300 data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-accent-fg data-[active=true]:shadow-md data-[active=true]:shadow-accent/20 data-[active=true]:scale-110 lg:static lg:mb-6"
                    aria-hidden
                  >
                    {stepNumber}
                  </span>

                  <div>
                    <h3
                      data-title
                      data-active="false"
                      className="text-base font-semibold transition-colors duration-300 data-[active=true]:text-accent-text"
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

