import {
  BrowsersIcon,
  CloudArrowUpIcon,
  PackageIcon,
} from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { PRIMARY_CTA, PRODUCTS_CTA } from "@/lib/site";

const services = [
  {
    icon: BrowsersIcon,
    title: "Website & Dashboard Development",
    tagline: "Custom Web Applications",
    description:
      "Landing page, company profile, web app, sampai dashboard internal. Dibangun supaya cepat dibuka, enak dipakai di layar kecil, dan tidak menyusahkan saat ditambah fitur.",
    outcomes: [
      "Halaman terbuka cepat, termasuk di koneksi seluler",
      "Tetap rapi dari layar HP sampai monitor lebar",
      "Struktur kode yang bisa dilanjutkan developer lain",
    ],
    ctaLabel: PRIMARY_CTA,
    ctaHref: "/contact?service=website-development",
    learnMoreHref: "/solutions#website-development",
    metric: "01",
  },
  {
    icon: CloudArrowUpIcon,
    title: "Infrastructure & Deployment",
    tagline: "Cloud Architecture & Devops",
    description:
      "Server disiapkan, rilis dijalankan otomatis, sertifikat keamanan dipasang, dan pemakaian dipantau sebelum tagihannya membengkak.",
    outcomes: [
      "Rilis versi baru tanpa menurunkan situs",
      "Gangguan ketahuan dari monitoring, bukan dari keluhan pengguna",
      "Biaya server ditinjau ulang, bukan dibiarkan jalan sendiri",
    ],
    ctaLabel: PRIMARY_CTA,
    ctaHref: "/contact?service=infrastructure",
    learnMoreHref: "/solutions#infrastructure",
    metric: "02",
  },
  {
    icon: PackageIcon,
    title: "Premium Digital Products",
    tagline: "Production-ready Starters",
    description:
      "Template, starter kit, dan component library yang sudah melewati tahap setup membosankan, jadi hari pertama Anda dipakai menulis fitur.",
    outcomes: [
      "Struktur folder dan petunjuk hosting ikut di dalamnya",
      "Diperbarui mengikuti versi dependency terbaru",
      "Lisensi komersial, boleh dipasang di klien mana pun",
    ],
    ctaLabel: PRODUCTS_CTA,
    ctaHref: "/#products",
    learnMoreHref: "/solutions#digital-products",
    metric: "03",
  },
];

export function ServicesShowcase() {
  const bentoServices: BentoItem[] = services.map((s, idx) => {
    const Icon = s.icon;
    return {
      title: s.title,
      description: s.description,
      icon: <Icon weight="duotone" className="w-[18px] h-[18px] text-accent-text" />,
      status: idx === 0 ? "Web" : idx === 1 ? "Cloud" : "Starters",
      tagline: s.tagline,
      meta: s.metric,
      tags: s.outcomes,
      cta: s.ctaLabel,
      href: s.learnMoreHref,
      colSpan: idx === 0 ? 2 : idx === 1 ? 1 : 3,
    };
  });

  return (
    <Section id="services" className="relative border-t border-border bg-bg/80 backdrop-blur-sm overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <Container>
        <Reveal>
          <div className="max-w-2xl text-left mb-12">
            <h2 className="font-mono text-2xl font-semibold tracking-tight text-balance md:text-3xl leading-tight">
              Yang paling sering diminta
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              Dari halaman pertama yang dibuka pengunjung sampai server yang menampungnya.
              Tiga hal di bawah ini yang biasanya jadi titik mulai.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BentoGrid items={bentoServices} />
        </Reveal>
      </Container>
    </Section>
  );
}

export default ServicesShowcase;
