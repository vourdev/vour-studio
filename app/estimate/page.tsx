import { Estimator } from "@/components/estimator/estimator";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Estimasi Biaya Website & Aplikasi | VOUR",
  description:
    "Hitung estimasi biaya website, aplikasi, AI automation, dan infrastruktur sesuai kebutuhan project Anda.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <Section className="pt-32 md:pt-36">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-mono text-3xl font-bold leading-[1.15] tracking-tight text-balance text-text sm:text-4xl">
            Estimasi Biaya Project
          </h1>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-pretty text-text-muted md:text-lg">
            Sudah punya gambaran project yang ingin dibuat? Pilih kebutuhan Anda
            dan dapatkan kisaran estimasinya.
          </p>
        </header>

        <div className="mt-14 md:mt-16">
          <Estimator />
        </div>
      </Container>
    </Section>
  );
}
