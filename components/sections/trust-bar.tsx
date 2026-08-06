import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "24", suffix: "+", label: "Project diselesaikan" },
  { value: "4", suffix: "", label: "Template dan starter kit" },
  { value: "18", suffix: "+", label: "Klien yang kembali" },
];

/**
 * TrustBar sits directly under the hero, displaying high-level business stats.
 * Aligned and centered cleanly to match the centered theme.
 */
export function TrustBar() {
  return (
    <section className="border-b border-border bg-bg-subtle py-12">
      <Container>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              index={i}
              className="flex flex-col items-center text-center gap-1"
            >
              <dt className="order-2 text-sm text-text-muted">{stat.label}</dt>
              <dd className="order-1 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
                {stat.value}
                <span className="text-accent-text">{stat.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}