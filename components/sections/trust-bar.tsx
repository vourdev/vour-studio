import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 30,
    padZero: 0,
    suffix: "+",
    label: "Project Selesai",
    description:
      "Website bisnis, dashboard operasional, dan aplikasi web modern yang sukses tayang di production server.",
  },
  {
    value: 4,
    padZero: 0,
    suffix: " Tahun",
    label: "Pengalaman Industri",
    description:
      "Teruji merancang arsitektur sistem tangguh, antarmuka responsif, serta automasi cloud infrastructure.",
  },
  {
    value: 10,
    padZero: 0,
    suffix: "+",
    label: "Modern Tech Stack",
    description:
      "Next.js, TypeScript, Tailwind, Docker, hingga CI/CD pipeline untuk skalabilitas dan performa maksimal.",
  },
  {
    value: 95,
    padZero: 0,
    suffix: "+",
    label: "Lighthouse Score",
    description:
      "Standar baku kecepatan rendering, aksesibilitas, optimasi SEO, dan efisiensi kode di semua peramban.",
  },
];

export function TrustBar() {
  return (
    <Section className="border-b border-border bg-bg/50">
      <Container>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-surface overflow-hidden bg-bg-subtle">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col p-6 md:p-7 justify-between",
                  i > 0 ? "border-t border-border" : "",
                  "md:border-t-0",
                  i >= 2 ? "md:border-t md:border-border" : "",
                  i % 2 === 1 ? "md:border-l md:border-border" : "",
                  "lg:border-t-0 lg:border-l-0",
                  i > 0 ? "lg:border-l lg:border-border" : ""
                )}
              >
                <div>
                  <div className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-text flex items-baseline">
                    <AnimatedNumber value={stat.value} padZero={stat.padZero} />
                    <span className="font-mono text-lg md:text-xl font-medium text-accent-text ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-text">
                    {stat.label}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

