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

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

/** TODO(VOUR): replace with the real figures. Deliberately not round numbers. */
const stats = [
  { value: "24", suffix: "+", label: "Project diselesaikan" },
  { value: "4", suffix: "", label: "Template dan starter kit" },
  { value: "18", suffix: "+", label: "Klien yang kembali" },
];

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
 * Sits under the hero, never inside it.
 *
 * The marquee is the only one on the site. Logos come from the `simple-icons`
 * package, so these are the real marks rather than text wordmarks, and they
 * carry no category labels underneath.
 */
export function TrustBar() {
  return (
    <section className="border-y border-border bg-bg-subtle py-12">
      <Container>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} index={i} className="flex flex-col items-center text-center gap-1">
              <dt className="order-2 text-sm text-text-muted">{stat.label}</dt>
              <dd className="order-1 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
                {stat.value}
                <span className="text-accent-text">{stat.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>

      <div className="mt-12">
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
      </div>
    </section>
  );
}
