import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 30,
    padZero: 0,
    suffix: "+",
    description:
      "Aplikasi web, dashboard, dan sistem otomasi yang hari ini berjalan di server klien.",
  },
  {
    value: 8,
    padZero: 0,
    suffix: " tahun",
    description:
      "Pengalaman gabungan tim, dihitung sejak project berbayar pertama, bukan sejak belajar.",
  },
  {
    value: 2,
    padZero: 0,
    suffix: " minggu",
    description:
      "Jarak dari kick-off ke rilis pertama, untuk lingkup MVP yang sudah disepakati di awal.",
  },
  {
    value: 100,
    padZero: 0,
    suffix: "%",
    description:
      "Kode dan dokumentasi diserahkan di akhir. Tidak ada bagian yang kami tahan.",
  },
];

export function TrustBar() {
  return (
    <Section className="border-b border-border bg-bg/50">
      <Container>
        <div className="max-w-2xl mb-12">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Ringkasan kerja sampai hari ini
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm leading-relaxed text-text-muted max-w-lg">
              Empat angka yang paling sering ditanyakan sebelum orang memutuskan
              bekerja sama dengan kami.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-surface overflow-hidden bg-bg-subtle">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col p-6 md:p-7",
                  i > 0 ? "border-t border-border" : "",
                  "md:border-t-0",
                  i >= 2 ? "md:border-t md:border-border" : "",
                  i % 2 === 1 ? "md:border-l md:border-border" : "",
                  "lg:border-t-0 lg:border-l-0",
                  i > 0 ? "lg:border-l lg:border-border" : ""
                )}
              >
                <div className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-text flex items-baseline">
                  <AnimatedNumber value={stat.value} padZero={stat.padZero} />
                  <span className="font-mono text-lg md:text-xl font-medium text-accent-text ml-1">
                    {stat.suffix}
                  </span>
                </div>
                <div className="h-0.5 w-8 bg-accent mt-3 mb-4 rounded-full" />
                <p className="text-xs leading-relaxed text-text-muted">
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

