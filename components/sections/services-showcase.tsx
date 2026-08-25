import {
  BrowsersIcon,
  CpuIcon,
  CloudArrowUpIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { PRIMARY_CTA } from "@/lib/site";

const services = [
  {
    category: "WEB DEVELOPMENT",
    icon: BrowsersIcon,
    title: "Website & Aplikasi",
    description:
      "Website company profile, landing page, dashboard internal, hingga aplikasi web yang dibuat sesuai kebutuhan bisnis.",
    benefits: [
      "Responsive di berbagai perangkat",
      "Cepat dan mudah digunakan",
      "Bisa dikembangkan sesuai kebutuhan",
      "Source code dan dokumentasi tersedia",
    ],
    ctaHref: "/contact?service=website-development",
  },
  {
    category: "AI & AUTOMATION",
    icon: CpuIcon,
    title: "AI & Automation",
    description:
      "Otomatisasi pekerjaan dan workflow dengan AI untuk mengurangi pekerjaan manual dan membuat proses bisnis lebih efisien.",
    benefits: [
      "Workflow lebih otomatis",
      "Integrasi dengan tools yang sudah digunakan",
      "Mengurangi pekerjaan berulang",
      "Bisa disesuaikan dengan kebutuhan bisnis",
    ],
    ctaHref: "/contact?service=ai-automation",
  },
  {
    category: "INFRASTRUCTURE",
    icon: CloudArrowUpIcon,
    title: "Infrastructure & Deployment",
    description:
      "Setup server, Docker, deployment, dan infrastruktur yang membantu aplikasi berjalan stabil di production.",
    benefits: [
      "Deployment lebih terstruktur",
      "Docker & server configuration",
      "Monitoring dan maintenance",
      "Infrastruktur siap dikembangkan",
    ],
    ctaHref: "/contact?service=infrastructure",
  },
];

export function ServicesShowcase() {
  return (
    <Section id="services" className="border-t border-border bg-bg">
      <Container>
        <div className="mb-14 max-w-2xl md:mb-16">
          <Reveal>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-text-faint">
              Build <span className="text-accent-text">→</span> Automate{" "}
              <span className="text-accent-text">→</span> Run
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-text md:text-4xl">
              Layanan Kami
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              Dari website hingga sistem digital, kami membantu bisnis
              membangun, menjalankan, dan mengembangkan kebutuhan digitalnya.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.category} index={idx} className="h-full">
                <article className="group flex h-full flex-col rounded-surface border border-border bg-bg-subtle/50 p-7 transition-colors hover:border-border-strong">
                  <div className="flex items-center justify-between border-b border-border pb-6">
                    <span className="flex size-11 items-center justify-center rounded-control border border-accent/20 bg-accent-soft text-accent-text transition-colors group-hover:border-accent/40">
                      <Icon weight="duotone" className="size-6" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-faint">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-[13px] leading-snug text-text-muted"
                      >
                        <CheckIcon
                          weight="bold"
                          className="mt-0.5 size-3.5 shrink-0 text-accent-text"
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.ctaHref}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-mono text-xs font-medium text-accent-text transition-colors hover:text-accent-hover"
                  >
                    <span>{PRIMARY_CTA}</span>
                    <ArrowRightIcon
                      weight="bold"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
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
