import {
  BrowsersIcon,
  CpuIcon,
  CloudArrowUpIcon,
  CheckIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { CONSULT_CTA } from "@/lib/site";

type Service = {
  category: string;
  icon: typeof BrowsersIcon;
  title: string;
  description: string;
  benefits: string[];
  ctaHref: string;
  popular?: boolean;
  comingSoon?: boolean;
};

const services: Service[] = [
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
    popular: true,
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
    comingSoon: true,
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

        <div className="grid gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isMuted = service.comingSoon;

            return (
              <Reveal key={service.category} index={idx} className="h-full">
                <article
                  className={[
                    "group relative flex h-full flex-col rounded-surface border p-7",
                    "transform-gpu transition-[translate,border-color] duration-200 ease-out",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    isMuted
                      ? "border-border bg-bg-subtle/30"
                      : "bg-bg-subtle/60 hover:-translate-y-1 hover:border-accent/40",
                    service.popular && !isMuted
                      ? "border-accent/30"
                      : "border-border",
                  ].join(" ")}
                >
                  {(service.popular || service.comingSoon) && (
                    <span
                      className={[
                        "absolute -top-3 left-1/2 z-10 -translate-x-1/2 inline-flex items-center rounded-control px-3 py-1",
                        "font-mono text-[10px] font-medium uppercase tracking-[0.14em] whitespace-nowrap",
                        service.comingSoon
                          ? "border border-border-strong bg-bg-subtle text-text-faint"
                          : "bg-accent text-accent-fg",
                      ].join(" ")}
                    >
                      {service.comingSoon ? "Segera Hadir" : "Paling Populer"}
                    </span>
                  )}

                  <div className="flex items-center justify-between border-b border-border pb-6">
                    <span
                      className={[
                        "flex size-11 items-center justify-center rounded-control border transition-colors duration-300 ease-out",
                        isMuted
                          ? "border-border bg-surface text-text-faint"
                          : "border-accent/20 bg-accent-soft text-accent-text group-hover:border-accent/50 group-hover:bg-accent group-hover:text-accent-fg",
                      ].join(" ")}
                    >
                      <Icon weight="duotone" className="size-6" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-faint">
                      {service.category}
                    </span>
                  </div>

                  <h3
                    className={[
                      "mt-6 text-lg font-semibold tracking-tight",
                      isMuted ? "text-text-muted" : "text-text",
                    ].join(" ")}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={[
                      "mt-3 text-[13px] leading-relaxed",
                      isMuted ? "text-text-faint" : "text-text-muted",
                    ].join(" ")}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={[
                          "flex items-start gap-2.5 text-[13px] leading-snug",
                          isMuted ? "text-text-faint" : "text-text-muted",
                        ].join(" ")}
                      >
                        <CheckIcon
                          weight="bold"
                          className={[
                            "mt-0.5 size-3.5 shrink-0",
                            isMuted ? "text-text-faint" : "text-accent-text",
                          ].join(" ")}
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    {service.comingSoon ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        disabled
                      >
                        Segera Hadir
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant={service.popular ? "primary" : "secondary"}
                        size="sm"
                        className="w-full"
                      >
                        <Link href={service.ctaHref}>{CONSULT_CTA}</Link>
                      </Button>
                    )}
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
