import {
  ArrowRightIcon,
  BrowsersIcon,
  CloudArrowUpIcon,
  PackageIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

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
    ctaLabel: "Mulai Konsultasi",
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
    ctaLabel: "Mulai Konsultasi",
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
  return (
    <Section id="services" className="relative border-t border-border bg-bg/80 backdrop-blur-sm overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-mono text-3xl font-semibold tracking-tight text-balance md:text-[2.25rem] leading-tight">
              Layanan Development & Infrastructure Vour
            </h2>
            <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted md:text-base">
              Kami siap bermitra untuk merancang, membangun, dan men-deploy produk digital Anda dengan standar performa engineering terbaik.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} index={index} y={32}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-surface border border-border bg-surface-solid/40 p-8 transition-all duration-300 hover:border-accent/30 hover:bg-surface-solid/70 hover:shadow-2xl hover:-translate-y-1">
                  {/* Subtle hover gradient glass indicator */}
                  <div className="absolute top-0 right-0 h-24 w-24 bg-accent-soft blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Corner index number */}
                  <span className="absolute top-6 right-8 font-mono text-sm font-semibold text-text-faint/60 group-hover:text-accent-text/80 transition-colors duration-300">
                    {service.metric}
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-control border border-border bg-bg-subtle text-accent-text group-hover:border-accent/40 group-hover:bg-accent-soft transition-all duration-300">
                      <Icon weight="duotone" className="size-6 animate-pulse-subtle" aria-hidden />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-wider uppercase text-text-faint group-hover:text-accent-text/70 transition-colors duration-300">
                        {service.tagline}
                      </p>
                      <h3 className="mt-0.5 text-lg font-bold tracking-tight text-white group-hover:text-accent-text transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  <div className="my-6 h-px w-full bg-border" />

                  <ul className="space-y-3.5 text-xs text-text-muted mb-8">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5">
                        <CheckCircleIcon
                          weight="fill"
                          className="mt-0.5 size-4 shrink-0 text-accent/80 group-hover:text-accent transition-colors duration-300"
                        />
                        <span className="leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    <Button asChild size="sm" className="flex-1 active:scale-95 transition-transform duration-100">
                      <Link href={service.ctaHref}>{service.ctaLabel}</Link>
                    </Button>
                    <Link
                      href={service.learnMoreHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-accent-text transition-colors group/link"
                    >
                      Detail
                      <ArrowRightIcon
                        weight="bold"
                        className="size-3 transition-transform duration-200 group-hover/link:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
export default ServicesShowcase;
