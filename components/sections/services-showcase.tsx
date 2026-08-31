import {
  BrowsersIcon,
  CheckIcon,
  CloudArrowUpIcon,
  RobotIcon,
  SquaresFourIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { services, type Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { CONSULT_CTA } from "@/lib/site";

const ICONS: Record<Service["icon"], typeof BrowsersIcon> = {
  browsers: BrowsersIcon,
  squares: SquaresFourIcon,
  cloud: CloudArrowUpIcon,
  storefront: StorefrontIcon,
  robot: RobotIcon,
};

/** Four L-shaped marks pinned to a card's corners. `className` carries the
    border colour so the caller controls the resting and hover states. */
function CornerBrackets({ className }: { className?: string }) {
  const corners = [
    "left-0 top-0 border-l border-t",
    "right-0 top-0 border-r border-t",
    "left-0 bottom-0 border-b border-l",
    "right-0 bottom-0 border-b border-r",
  ];

  return (
    <>
      {corners.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={cn(
            "pointer-events-none absolute size-3.5 transition-colors duration-300 ease-out",
            corner,
            className,
          )}
        />
      ))}
    </>
  );
}

export function ServicesShowcase() {
  return (
    <Section id="services" className="border-t border-border bg-bg">
      <Container>
        <div className="mb-14 max-w-2xl md:mb-16">
          <Reveal>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-text-faint">
              Build <span className="text-accent-text">→</span> Deploy{" "}
              <span className="text-accent-text">→</span> Run
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-text md:text-4xl">
              Layanan vour.dev
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">
              vour.dev mengerjakan pembuatan website, web application, serta
              deployment dan konfigurasi server. Selain layanan project, tersedia
              juga produk digital berupa template dan bahan siap pakai.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = ICONS[service.icon];
            const isSoon = service.status === "soon";

            return (
              <Reveal key={service.slug} index={idx} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col p-7",
                    "transform-gpu transition-[translate,background-color] duration-200 ease-out",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    isSoon
                      ? "bg-bg-subtle/20"
                      : "bg-bg-subtle/30 hover:-translate-y-1 hover:bg-bg-subtle/60",
                  )}
                >
                  {/* Corner brackets instead of a full border: the card is
                      registered by its four corners the way a technical drawing
                      marks an extent, which keeps the surface flat and lets the
                      accent land on hover without a glow.

                      Motif borrowed from 21st.dev's Moving Dot Card by
                      @minhxthanh, with its travelling dot and gradients
                      dropped. */}
                  <CornerBrackets
                    className={
                      isSoon
                        ? "border-border"
                        : "border-border-strong group-hover:border-accent"
                    }
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-control border transition-colors duration-300 ease-out",
                        isSoon
                          ? "border-border bg-surface text-text-faint"
                          : "border-accent/20 bg-accent-soft text-accent-text group-hover:border-accent/50 group-hover:bg-accent group-hover:text-accent-fg",
                      )}
                    >
                      <Icon weight="duotone" className="size-6" aria-hidden />
                    </span>

                    {isSoon ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                        Segera Hadir
                      </span>
                    ) : service.popular ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
                        Paling Populer
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                        {service.category}
                      </span>
                    )}
                  </div>

                  <h3
                    className={cn(
                      "mt-6 text-lg font-semibold tracking-tight",
                      isSoon ? "text-text-muted" : "text-text",
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2.5 text-[13px] leading-relaxed",
                      isSoon ? "text-text-faint" : "text-text-muted",
                    )}
                  >
                    {service.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {service.outcomes.slice(0, 4).map((outcome) => (
                      <li
                        key={outcome}
                        className={cn(
                          "flex items-start gap-2.5 text-[13px] leading-snug",
                          isSoon ? "text-text-faint" : "text-text-muted",
                        )}
                      >
                        <CheckIcon
                          weight="bold"
                          className={cn(
                            "mt-0.5 size-3.5 shrink-0",
                            isSoon ? "text-text-faint" : "text-accent-text",
                          )}
                          aria-hidden
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    {isSoon ? (
                      <Button variant="secondary" size="sm" className="w-full" disabled>
                        Segera Hadir
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant={service.popular ? "primary" : "secondary"}
                        size="sm"
                        className="w-full"
                      >
                        <Link href={service.ctaHref}>
                          {service.slug === "digital-products"
                            ? service.ctaLabel
                            : CONSULT_CTA}
                        </Link>
                      </Button>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default ServicesShowcase;
