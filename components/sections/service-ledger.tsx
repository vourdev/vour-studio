"use client";

import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { scrollToElement } from "@/components/layout/lenis-provider";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import type { Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { ESTIMATE_CTA, PRIMARY_CTA } from "@/lib/site";

/** Fixed nav is `top-4 h-14`, so its bottom edge sits at 72px. */
const NAV_BOTTOM = 72;
/** Breathing room between the nav (or the mobile strip) and the reference line. */
const GAP = 24;

/**
 * The service list as an index plus long-form panels: a sticky rail on desktop,
 * a sticky tab strip on mobile, both tracking whichever panel the reader is in.
 *
 * Panels keep `id={service.slug}` because `/solutions#<slug>` is linked from the
 * home showcase, the About page, `llms.txt` and the `Service` JSON-LD. The
 * scroll-margin below is what keeps those deep links from landing under the nav.
 *
 * Scroll-spy approach adapted from 21st.dev's Service Changelog by @ruixen.ui:
 * resolve the scrolling document from the section's `ownerDocument`, derive the
 * reference line from the strip's rendered height rather than a magic number,
 * and coalesce scroll work into one rAF.
 */
export function ServiceLedger({
  services,
  visuals,
}: {
  services: Service[];
  /**
   * Optional decorative figure per service, keyed by slug. A rendered node
   * rather than a render function: functions cannot cross the server/client
   * boundary, and these figures are static anyway.
   */
  visuals?: Partial<Record<string, ReactNode>>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let raf: number | null = null;

    const compute = () => {
      raf = null;

      // The mobile strip is `display:none` on desktop, where the nav alone sets
      // the reference line. Reading the rendered rect covers both cases without
      // duplicating the breakpoint in JS.
      const strip = stripRef.current;
      const stripBottom = strip?.getBoundingClientRect().bottom ?? 0;
      const referenceY = Math.max(stripBottom, NAV_BOTTOM) + GAP;

      if (strip && sectionRef.current) {
        sectionRef.current.style.setProperty(
          "--ledger-strip-h",
          `${strip.offsetHeight}px`,
        );
      }

      let next = 0;
      for (let i = 0; i < panelRefs.current.length; i++) {
        const el = panelRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top - referenceY <= 1) next = i;
        else break;
      }

      // The last panel's top may never cross the line when there is not enough
      // content under it, so bottoming out forces the final entry.
      const doc = sectionRef.current?.ownerDocument ?? document;
      const scroller = doc.scrollingElement ?? doc.documentElement;
      if (
        scroller &&
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
      ) {
        next = panelRefs.current.length - 1;
      }

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(compute);
    };

    compute();

    const doc = sectionRef.current?.ownerDocument ?? document;
    const win = doc.defaultView ?? window;
    // Scroll events do not bubble but they do traverse capture, so this also
    // catches scrolling from any nested container.
    doc.addEventListener("scroll", onScroll, { passive: true, capture: true });
    win.addEventListener("resize", onScroll, { passive: true });

    return () => {
      doc.removeEventListener("scroll", onScroll, true);
      win.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [services.length]);

  // Keep the active tab inside the mobile scroller. Scroll the strip on its own
  // axis only: `scrollIntoView` here would nudge the page vertically and fight
  // the spy, landing the reader on the wrong panel.
  useEffect(() => {
    const container = stripRef.current;
    const tab = container?.children[activeIndex] as HTMLElement | undefined;
    if (!container || !tab) return;
    const delta =
      tab.getBoundingClientRect().left -
      container.getBoundingClientRect().left -
      (container.clientWidth - tab.clientWidth) / 2;
    container.scrollBy({ left: delta, behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeIndex, reduceMotion]);

  const jumpTo = (index: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = panelRefs.current[index];
    if (target) scrollToElement(target, { instant: Boolean(reduceMotion) });
  };

  return (
    <Section
      ref={sectionRef}
      spacing="continued"
      // Deep links from elsewhere on the site land on a panel, not under the nav.
      style={{
        scrollPaddingTop: `calc(${NAV_BOTTOM}px + var(--ledger-strip-h, 0px) + ${GAP}px)`,
      }}
    >
      {/* Mobile: a sticky strip under the floating nav. */}
      <nav
        aria-label="Daftar layanan"
        className="sticky top-[4.5rem] z-30 border-y border-border bg-bg/85 backdrop-blur-md lg:hidden"
      >
        <div
          ref={stripRef}
          className="flex items-stretch gap-0 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              onClick={jumpTo(i)}
              aria-current={activeIndex === i ? "true" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3.5 font-mono text-xs transition-colors",
                activeIndex === i
                  ? "border-accent text-accent-text"
                  : "border-transparent text-text-faint hover:text-text",
              )}
            >
              <span className="tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{service.title}</span>
            </a>
          ))}
        </div>
      </nav>

      <Container>
        <div className="grid gap-y-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
          {/* Desktop: a sticky index rail. */}
          <nav aria-label="Daftar layanan" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-border">
              {services.map((service, i) => {
                const isActive = activeIndex === i;
                return (
                  <li key={service.slug}>
                    <a
                      href={`#${service.slug}`}
                      onClick={jumpTo(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "-ml-px flex items-baseline gap-3 border-l-2 py-2.5 pl-4 text-sm transition-colors duration-200",
                        isActive
                          ? "border-accent text-text"
                          : "border-transparent text-text-faint hover:border-border-strong hover:text-text-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[11px] tabular-nums transition-colors",
                          isActive ? "text-accent-text" : "text-text-faint",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{service.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex flex-col gap-y-20 md:gap-y-28">
            {services.map((service, index) => {
              const isSoon = service.status === "soon";
              const visual = visuals?.[service.slug];

              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  style={{
                    scrollMarginTop: `calc(${NAV_BOTTOM}px + var(--ledger-strip-h, 0px) + ${GAP}px)`,
                  }}
                  className="scroll-mt-28"
                >
                  {/* Index gutter: a hairline and a number instead of a card
                      border, so five services read as one document rather than
                      five repeated boxes. */}
                  <div className="flex items-center gap-4 border-t border-border pt-5">
                    <span className="font-mono text-xs tabular-nums text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
                      {service.category}
                    </span>
                    {isSoon && (
                      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                        Segera Hadir
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 max-w-[24ch] text-balance text-2xl font-semibold tracking-tight md:text-[2rem] md:leading-[1.2]">
                    {service.question}
                  </h2>

                  {/* The answer shares a row with the figure when there is one,
                      and takes the full measure when there is not -- an empty
                      reserved column would read as a missing image. */}
                  <div
                    className={cn(
                      "mt-4",
                      visual &&
                        "grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
                    )}
                  >
                    <p className="max-w-[62ch] text-pretty leading-relaxed text-text-muted md:text-lg">
                      {service.answer}
                    </p>
                    {visual}
                  </div>

                  {/* Offerings flow in columns rather than sitting in a grid of
                      cards. A service has anywhere from two to six of them, and
                      flowing text balances itself at any count -- no empty
                      cells, and no column that runs far longer than its
                      neighbour. */}
                  <div className="mt-10 border-t border-border pt-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
                      Yang termasuk di dalamnya
                    </h3>
                    <dl className="mt-5 gap-x-12 sm:columns-2">
                      {service.offerings.map((offering) => (
                        <div
                          key={offering.name}
                          className="mb-5 break-inside-avoid last:mb-0"
                        >
                          <dt className="text-sm font-medium text-text">
                            {offering.name}
                          </dt>
                          <dd className="mt-1 text-[13px] leading-relaxed text-text-muted">
                            {offering.description}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Outcomes are one short line each, so they wrap as a strip
                      instead of a column. This is what keeps the CTA a fixed
                      distance below the copy no matter how many offerings the
                      service has. */}
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-text-muted">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2">
                        <CheckIcon
                          weight="bold"
                          className="mt-[0.3rem] size-3 shrink-0 text-accent-text"
                          aria-hidden
                        />
                        <span className="leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Both CTAs are real buttons so they share the `sm` height.
                      The secondary one is `ghost` rather than `secondary`: this
                      row repeats once per service, and five outlined buttons
                      down the page would out-weigh the copy they sit under. */}
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <Button asChild size="sm">
                      <Link href={`/contact?service=${service.slug}`}>
                        {isSoon ? "Kabari Saya" : PRIMARY_CTA}
                      </Link>
                    </Button>
                    {!isSoon && (
                      <Button asChild size="sm" variant="ghost">
                        <Link href="/estimate">
                          {ESTIMATE_CTA}
                          <ArrowRightIcon
                            weight="bold"
                            className="size-3.5"
                            aria-hidden
                          />
                        </Link>
                      </Button>
                    )}
                  </div>

                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
