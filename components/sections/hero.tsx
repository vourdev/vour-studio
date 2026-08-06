import Link from "next/link";

import { AuroraCanvas } from "@/components/motion/aurora-canvas";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_CTA, PRODUCTS_CTA, siteConfig } from "@/lib/site";

/**
 * Four text elements, no more: eyebrow, headline, subheadline, CTAs. No trust
 * strip and no tagline under the buttons; those live in the section below.
 *
 * Exactly one canvas on the page. The ambient wash behind everything is a plain
 * CSS gradient, so it costs nothing at runtime.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden pt-24 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_78%_38%,var(--accent-soft),transparent_70%)]"
      />

      {/* Column split is tuned so the headline lands on exactly two lines at lg.
          Widening the text column past this pushes it to three. */}
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,0.62fr)]">
        <div>
          <Reveal
            as="p"
            y={12}
            className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text"
          >
            {siteConfig.tagline}
          </Reveal>

          <KineticHeading
            text="Website, Dashboard, dan AI Automation untuk Bisnis Modern."
            accentFrom={6}
            className="mt-6 text-[2.25rem] font-semibold leading-[1.06] tracking-tight sm:text-[2.6rem] lg:text-[3rem]"
          />

          <Reveal
            as="p"
            delay={0.45}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-text-muted md:text-lg"
          >
            VOUR membantu bisnis dan developer membangun produk digital yang cepat,
            rapi, dan siap dikembangkan.
          </Reveal>

          <Reveal delay={0.55} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact">{PRIMARY_CTA}</Link>
              </Button>
            </MagneticButton>
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">{PRODUCTS_CTA}</Link>
            </Button>
          </Reveal>
        </div>

        {/* The aurora, given a frame so it reads as a designed object rather than
            a stray gradient. TODO(VOUR): a real product screenshot can be layered
            inside this panel once one exists. */}
        <Reveal delay={0.3} y={32} className="hidden lg:block">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-surface border border-border-strong bg-bg-subtle">
            <AuroraCanvas className="absolute inset-0 size-full" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg),transparent_45%)] opacity-40"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
