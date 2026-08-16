import { CompassIcon, RocketIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { CardHoverEffect } from "@/components/ui/card-hover-effect";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Vour mengerjakan website, dashboard internal, dan urusan server untuk bisnis yang sudah jalan dan startup yang baru mulai.",
  path: "/about",
});

const stats = [
  { value: "25+", label: "Project Production", desc: "Masih berjalan di server klien" },
  { value: "2018", label: "Tahun Berdiri", desc: "Sejak project berbayar pertama" },
  { value: "2 Mgg", label: "Rilis Fase MVP", desc: "Jarak kick-off ke rilis pertama" },
  { value: "100%", label: "Ownership Kode", desc: "Diserahkan penuh di akhir project" },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section: Asymmetric Split */}
      <Section className="pt-32 pb-16">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-16">
            <div>
              <Reveal>
                <h1 className="font-mono text-[1.85rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.5rem] lg:text-[3rem] text-balance">
                  Studio kecil yang memegang sedikit project dalam satu waktu
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[50ch] text-sm leading-relaxed text-text-muted md:text-base">
                  Kami menangani website, dashboard internal, dan urusan server. Satu tim mengerjakan dari perencanaan sampai rilis, jadi tidak ada estafet ke pihak lain di tengah jalan.
                </p>
              </Reveal>
            </div>
            
            {/* Visual Asset: Desktop Workspace View */}
            <Reveal delay={0.2} className="relative aspect-16/10 w-full overflow-hidden rounded-surface border border-border">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=560&fit=crop"
                alt="Clean developer workspace setting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 2. Horizontal Stats Bar */}
      <Section className="border-t border-border bg-bg-subtle/50 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <Reveal key={idx} index={idx} y={16}>
                <div className="space-y-1 text-center md:text-left border-r border-border/40 pr-4 last:border-r-0">
                  <p className="font-mono text-3xl font-bold tracking-tight text-accent-text md:text-4xl">
                    {s.value}
                  </p>
                  <p className="font-mono text-xs font-semibold text-text uppercase tracking-wider">{s.label}</p>
                  <p className="text-[11px] text-text-muted mt-1 leading-normal">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Misi & Visi Bento Layout */}
      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-surface-solid/40 p-8 transition-all hover:border-accent/30 duration-300">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-6">
                    <RocketIcon weight="light" className="size-5" />
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-3">
                    Menaikkan standar barang yang diserahkan
                  </h2>
                  <p className="text-sm leading-relaxed text-text-muted">
                    Kode yang terstruktur, cara rilis yang bisa diulang siapa saja, dan dokumentasi yang cukup untuk dipegang tim lain. Itu ukuran selesai buat kami.
                  </p>
                </div>
                <div className="mt-8 border-t border-border/40 pt-4 font-mono text-[9px] uppercase tracking-widest text-text-faint">
                  STANDAR SERAH TERIMA
                </div>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-surface-solid/40 p-8 transition-all hover:border-accent/30 duration-300">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-6">
                    <CompassIcon weight="light" className="size-5" />
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-3">
                    Jadi tempat pertama developer mencari fondasi
                  </h2>
                  <p className="text-sm leading-relaxed text-text-muted">
                    Starter kit, template, dan perkakas yang kami rapikan dari project sendiri, supaya orang lain tidak mengulang setup yang sama dari nol.
                  </p>
                </div>
                <div className="mt-8 border-t border-border/40 pt-4 font-mono text-[9px] uppercase tracking-widest text-text-faint">
                  DIBUAT UNTUK DEVELOPER
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 4. Prinsip Kerja: CardHoverEffect */}
      <Section className="border-t border-border bg-bg/40">
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Cara kami mengambil keputusan
              </h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Tiga aturan yang dipakai saat pilihannya tidak jelas hitam putihnya.
              </p>
            </div>
          </Reveal>

          <CardHoverEffect />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
