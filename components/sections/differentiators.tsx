import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { differentiators } from "@/lib/data/services";

/**
 * No card containers here. The section above is a bento of filled tiles, so this
 * one groups with hairlines and negative space instead, which keeps two adjacent
 * sections from reading as the same layout.
 */
export function Differentiators() {
  return (
    <Section className="border-t border-border bg-bg-subtle">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Mengapa memilih VOUR?
          </h2>
        </Reveal>

        <div className="mt-12 grid border-t border-border sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal
              key={item.title}
              index={i}
              className="border-b border-border px-0 py-8 sm:px-8 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
            >
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-text-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
