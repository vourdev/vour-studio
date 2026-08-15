import {
  BrowsersIcon,
  CloudArrowUpIcon,
  PackageIcon,
} from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const services = [
  {
    icon: BrowsersIcon,
    title: "Website & Dashboard Development",
    tagline: "Custom Web Applications",
    description:
      "Kami membangun website profesional, landing page konversi tinggi, web app modular, dan dashboard internal yang cepat, responsif, dan siap meluncur ke production.",
    outcomes: [
      "Performa loading cepat (Lighthouse >95)",
      "Desain responsif & konsisten di semua layar",
      "Struktur kode bersih & asisten SEO bawaan",
    ],
    ctaLabel: "Mulai Project",
    ctaHref: "/contact?service=website-development",
    learnMoreHref: "/solutions#website-development",
    metric: "01",
  },
  {
    icon: CloudArrowUpIcon,
    title: "Infrastructure & Deployment",
    tagline: "Cloud Architecture & Devops",
    description:
      "Penyusunan arsitektur server, pipeline deployment otomatis (CI/CD), setup reverse proxy aman, ssl gratis, monitoring performa realtime, dan optimasi efisiensi biaya cloud.",
    outcomes: [
      "Pipeline CI/CD untuk rilis tanpa downtime",
      "Monitoring server 24/7 & mitigasi berkala",
      "Struktur server stabil & efisiensi biaya VPS/Cloud",
    ],
    ctaLabel: "Mulai Project",
    ctaHref: "/contact?service=infrastructure",
    learnMoreHref: "/solutions#infrastructure",
    metric: "02",
  },
  {
    icon: PackageIcon,
    title: "Premium Digital Products",
    tagline: "Production-ready Starters",
    description:
      "Template siap pakai, starter kit terstruktur, dan component library modular untuk melewati setup dasar yang membosankan dan langsung fokus membangun fitur produk.",
    outcomes: [
      "Folder architecture bersih & dokumentasi hosting",
      "Update rutin lisensi dependency terbaru",
      "Lisensi komersial bebas pasang di klien mana saja",
    ],
    ctaLabel: "Lihat Produk",
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
              Layanan Development & Infrastructure Vour
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              Kami siap bermitra untuk merancang, membangun, dan men-deploy produk digital Anda dengan standar performa engineering terbaik.
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
