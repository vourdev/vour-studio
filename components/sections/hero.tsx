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

/** One viewport tall; `min-h` keeps short windows from crushing the type. */
export function Hero() {
  return (
    <section className="relative isolate flex h-dvh min-h-152 flex-col overflow-hidden pt-24 pb-6 md:pb-8">
      {/* Transparent to the pointer: the waves track the cursor from a window listener. */}
      <GlowyWavesBackground className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <Container className="flex flex-1 flex-col items-center justify-center text-center">
        <Reveal
          delay={0.25}
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-text-muted backdrop-blur-sm md:mb-7 md:tracking-[0.18em]"
        >
          <SparkleIcon weight="fill" className="size-4 text-accent-text" aria-hidden />
          Studio digital di Indonesia
        </Reveal>

        <KineticHeading
          text="Website, Web Application, dan Deployment untuk Bisnis Anda."
          accentFrom={5}
          className="font-display text-[1.85rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.5rem] lg:text-[3.5rem]"
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

      <Reveal delay={0.65} className="mt-6 w-full shrink-0 md:mt-8">
        <Container className="flex flex-col items-center">
          <p className="mb-4 max-w-[81ch] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-text-faint md:mb-5">
            Alat yang kami pakai sehari-hari
          </p>
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
