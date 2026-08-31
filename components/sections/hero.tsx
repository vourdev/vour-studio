import { SparkleIcon } from "@phosphor-icons/react/ssr";
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

import { GlowyWavesBackground } from "@/components/motion/glowy-waves";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee-utils/marquee";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_CTA, SERVICES_CTA } from "@/lib/site";

/** Dissolve at both ends of the marquee track. Wide enough that a logo fades
    over roughly its own width plus the gap, so nothing pops out of existence. */
const MARQUEE_MASK =
  "linear-gradient(to right, transparent 0%, black 13%, black 87%, transparent 100%)";

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
 * Three text elements, no more: headline, subheadline, CTAs. No trust strip and
 * no tagline under the buttons; those live in the section below.
 *
 * The section is exactly one viewport tall: headline, subheadline and CTAs take
 * the free space in the middle, and the stack marquee is anchored to the bottom
 * edge as its own band, so the whole hero — marquee included — resolves without
 * a scroll on a standard desktop. `min-h` keeps very short windows from
 * crushing the type; there the marquee simply falls below the fold.
 *
 * Display type is mono here and on every page H1. Section headings stay sans.
 * The studio sells engineering, and a monospace display face says that before
 * the copy does.
 */
export function Hero() {
  return (
    <section className="relative isolate flex h-dvh min-h-152 flex-col overflow-hidden pt-24 pb-6 md:pb-8">
      {/* Owns the whole backdrop: lattice, wave band, accent glow, edge
          falloff. Fully transparent to the pointer — the waves track the cursor
          from a window listener, so nothing above has to opt out. */}
      <GlowyWavesBackground className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <Container className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Same accent dot as the wordmark, so the pill reads as the studio
            signing the headline rather than as a generic badge. */}
        <Reveal
          delay={0.25}
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-text-muted backdrop-blur-sm md:mb-7 md:tracking-[0.18em]"
        >
          {/* <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" /> */}
          <SparkleIcon weight="fill" className="size-4 text-accent-text" aria-hidden />
          Studio digital di Indonesia
        </Reveal>

        <KineticHeading
          text="Website, Web Application, dan Deployment untuk Bisnis Anda."
          accentFrom={5}
          className="font-mono text-[1.85rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.5rem] lg:text-[3.5rem]"
        />

        <Reveal
          as="p"
          delay={0.45}
          className="mt-5 max-w-[58ch] text-base leading-relaxed text-text-muted md:mt-6 md:text-lg"
        >
          vour.dev membangun website, aplikasi web, dan kebutuhan deployment
          untuk bisnis di Indonesia. Kode dan dokumentasinya jadi milik Anda.
        </Reveal>

        <Reveal
          delay={0.55}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-9"
        >
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </MagneticButton>
          <Button asChild size="lg" variant="secondary">
            <Link href="/#services">{SERVICES_CTA}</Link>
          </Button>
        </Reveal>
      </Container>

      {/* Tech stack marquee. Its own band at the foot of the viewport rather
          than another item in the centred stack, so the height it takes is
          fixed and the composition above can absorb the rest. */}
      <Reveal delay={0.65} className="mt-6 w-full shrink-0 md:mt-8">
        <Container className="flex flex-col items-center">
          <p className="mb-4 max-w-[81ch] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-text-faint md:mb-5">
            {"BUILT ON THE TECH STACK TRUSTED BY DEVELOPERS AT THE WORLD'S MOST INNOVATIVE COMPANIES"}
          </p>
          {/* Both ends of the track fade out instead of being cut by the
              overflow box, so a logo dissolves on its way off rather than
              disappearing at a hard edge. */}
          <div className="w-full max-w-3xl" style={{ maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}>
            <Marquee className="w-full [--duration:40s]" pauseOnHover>
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
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
