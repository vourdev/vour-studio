import Link from "next/link";
import {
  siDocker,
  siGithub,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

import { KineticHeading } from "@/components/motion/kinetic-heading";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { WaveMatrix } from "@/components/motion/wave-matrix";
import { Marquee } from "@/components/motion/marquee";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_CTA, PRODUCTS_CTA, siteConfig } from "@/lib/site";

const logos = [
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siPostgresql,
  siSupabase,
  siDocker,
  siVercel,
  siN8n,
  siGithub,
];

/**
 * Centred composition. The rest of the site is asymmetric on purpose, but here
 * the headline IS the visual, so centring it is the right call rather than a
 * default.
 *
 * Four text elements, no more: eyebrow, headline, subheadline, CTAs. No trust
 * strip and no tagline under the buttons; those live in the section below.
 *
 * Display type is mono here and on every page H1. Section headings stay sans.
 * The studio sells engineering, and a monospace display face says that before
 * the copy does.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden pt-24 pb-16">
      {/* Static lattice: one paint, never repainted. The canvas above it draws
          only the cells a wave is currently lighting. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 dot-grid opacity-75"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <WaveMatrix className="pointer-events-none absolute inset-0 -z-10 size-full" />

      <Container className="flex flex-col items-center text-center">
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
          className="mt-7 max-w-5xl font-mono text-[1.85rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.5rem] lg:text-[3.25rem]"
        />

        <Reveal
          as="p"
          delay={0.45}
          className="mt-7 max-w-[52ch] text-base leading-relaxed text-text-muted md:text-lg"
        >
          Vour membantu bisnis dan developer membangun produk digital yang cepat,
          rapi, dan siap dikembangkan.
        </Reveal>

        <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </MagneticButton>
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">{PRODUCTS_CTA}</Link>
          </Button>
        </Reveal>

        {/* Tech Stack Marquee */}
        <Reveal delay={0.65} className="mt-16 w-full max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-faint mb-6 text-center">
            {"Built on the tech stack trusted by developers at the world's most innovative companies"}
          </p>
          <Marquee durationSeconds={45}>
            {logos.map((logo) => (
              <span
                key={logo.title}
                className="mx-7 inline-flex shrink-0 items-center text-text-faint transition-colors hover:text-text"
                title={logo.title}
              >
                <svg
                  role="img"
                  aria-label={logo.title}
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="currentColor"
                >
                  <path d={logo.path} />
                </svg>
              </span>
            ))}
          </Marquee>
        </Reveal>
      </Container>
    </section>
  );
}
