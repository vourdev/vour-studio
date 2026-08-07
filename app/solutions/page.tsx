import {
  BrowsersIcon,
  CheckIcon,
  CloudArrowUpIcon,
  CpuIcon,
  LightningIcon,
  RobotIcon,
  ShieldCheckIcon,
  StorefrontIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { differentiators, services } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";
import { PRIMARY_CTA, PRODUCTS_CTA } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Website development, AI automation, infrastructure dan deployment, serta produk digital untuk developer. Empat layanan VOUR dan hasil yang Anda dapatkan.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      {/* Hero Section with Quick Jump Navigation Pills */}
      <Section className="pt-32 pb-8">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Layanan Studio
            </p>
            <h1 className="mt-3 max-w-[24ch] font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Solusi teknis yang fokus pada hasil nyata
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
              Setiap layanan dijelaskan lewat dampak dan hasil yang Anda dapatkan lebih dulu.
              Pilih layanan di bawah untuk melihat rincian cakupan pekerjaannya.
            </p>
          </Reveal>

          {/* Interactive Quick Jump Pills */}
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-4 py-2 text-xs font-mono text-text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent-text"
              >
                <span>{s.title}</span>
              </a>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Main Bento Grid Services Section */}
      <Section>
        <Container className="space-y-12">
          {/* Service 1: Website Development */}
          <Reveal>
            <article id="website-development" className="group relative overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-10 transition-colors hover:border-border-strong">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                      <BrowsersIcon weight="light" className="size-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-text">
                      Core Service
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                    Website Development
                  </h2>
                  <p className="mt-3 leading-relaxed text-text-muted text-sm md:text-base">
                    Pembuatan landing page, company profile, web application, dan dashboard internal
                    yang cepat, responsif, dan mudah dikembangkan.
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                        Yang Anda dapatkan
                      </h3>
                      <ul className="mt-3 space-y-2.5 text-sm text-text-muted">
                        <li className="flex gap-2">
                          <CheckIcon weight="bold" className="mt-1 size-3.5 shrink-0 text-accent-text" />
                          <span>Performa loading cepat di berbagai perangkat</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckIcon weight="bold" className="mt-1 size-3.5 shrink-0 text-accent-text" />
                          <span>Desain adaptif dan konsisten di segala layar</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckIcon weight="bold" className="mt-1 size-3.5 shrink-0 text-accent-text" />
                          <span>Struktur kode yang ramah SEO dan mudah dirawat</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                        Cakupan Pekerjaan
                      </h3>
                      <ul className="mt-3 space-y-2 font-mono text-xs text-text-muted">
                        <li>• Landing page & Campaign page</li>
                        <li>• Company profile modern</li>
                        <li>• Web application custom</li>
                        <li>• Dashboard & Panel internal</li>
                      </ul>
                    </div>
                  </div>

                  <Button asChild size="sm" className="mt-8">
                    <Link href="/contact">{PRIMARY_CTA}</Link>
                  </Button>
                </div>

                {/* Simulated Browser Window Mockup */}
                <div className="relative aspect-4/3 overflow-hidden rounded-control border border-border bg-bg p-3 shadow-xl">
                  <div className="flex items-center gap-1.5 border-b border-border pb-3 px-1">
                    <span className="size-2.5 rounded-full bg-red-500/60" />
                    <span className="size-2.5 rounded-full bg-yellow-500/60" />
                    <span className="size-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 flex-1 rounded bg-bg-subtle px-2 py-0.5 font-mono text-[0.65rem] text-text-faint">
                      vour.studio/app-dashboard
                    </span>
                  </div>
                  <div className="mt-3 space-y-3 p-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-28 rounded bg-border/60" />
                      <div className="h-6 w-16 rounded bg-accent/20 border border-accent/30" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="h-16 rounded bg-bg-subtle border border-border p-2">
                        <div className="h-2 w-10 rounded bg-text-faint/30" />
                        <div className="mt-2 h-4 w-12 rounded bg-accent-text/60" />
                      </div>
                      <div className="h-16 rounded bg-bg-subtle border border-border p-2">
                        <div className="h-2 w-10 rounded bg-text-faint/30" />
                        <div className="mt-2 h-4 w-12 rounded bg-accent-text/60" />
                      </div>
                      <div className="h-16 rounded bg-bg-subtle border border-border p-2">
                        <div className="h-2 w-10 rounded bg-text-faint/30" />
                        <div className="mt-2 h-4 w-12 rounded bg-accent-text/60" />
                      </div>
                    </div>
                    <div className="h-24 rounded bg-bg-subtle border border-border/80 p-3">
                      <div className="h-2 w-full rounded bg-border/60" />
                      <div className="mt-2 h-2 w-3/4 rounded bg-border/40" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-border/40" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* 2 Column Bento Grid: AI Automation & Infrastructure */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Service 2: AI Automation */}
            <Reveal>
              <article id="ai-automation" className="group flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-8 transition-colors hover:border-border-strong">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                      <RobotIcon weight="light" className="size-5" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 font-mono text-[0.7rem] text-yellow-600 dark:text-yellow-400">
                      <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      Coming Soon
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold tracking-tight">
                    AI Automation
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Otomasi alur kerja dan integrasi sistem operasional bisnis untuk meminimalkan beban kerja repetitif.
                  </p>

                  <div className="mt-6 space-y-2">
                    <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                      Yang Akan Datang
                    </h3>
                    <ul className="space-y-2 text-xs text-text-muted">
                      <li className="flex gap-2">
                        <CheckIcon weight="bold" className="mt-0.5 size-3 shrink-0 text-accent-text" />
                        <span>Perancangan alur kerja otomatis (Workflow Automation)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckIcon weight="bold" className="mt-0.5 size-3 shrink-0 text-accent-text" />
                        <span>Integrasi antar-dashboard operasional bisnis</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckIcon weight="bold" className="mt-0.5 size-3 shrink-0 text-accent-text" />
                        <span>Riset implementasi teknologi cerdas</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 rounded-control border border-border bg-bg p-4">
                  <div className="flex items-center justify-between font-mono text-[0.7rem] text-text-faint">
                    <span>STATUS ENGINE</span>
                    <span className="text-accent-text">PREPARATION</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <CpuIcon className="size-4 text-accent-text" />
                    <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
                      <div className="h-full w-2/3 bg-accent animate-pulse" />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Service 3: Infrastructure & Deployment */}
            <Reveal>
              <article id="infrastructure" className="group flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-8 transition-colors hover:border-border-strong">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                      <CloudArrowUpIcon weight="light" className="size-5" />
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-text-faint">
                      DevOps & Cloud
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold tracking-tight">
                    Infrastructure & Deployment
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Arsitektur server, pipeline rilis otomatis (CI/CD), monitoring performa realtime, dan optimasi efisiensi biaya cloud.
                  </p>

                  <div className="mt-6 space-y-2">
                    <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                      Cakupan DevOps
                    </h3>
                    <ul className="grid grid-cols-2 gap-2 font-mono text-xs text-text-muted">
                      <li>• Setup server & Proxy</li>
                      <li>• Pipeline CI/CD</li>
                      <li>• SSL & Keamanan</li>
                      <li>• Monitoring & Backup</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  {/* Simulated Terminal Window */}
                  <div className="rounded-control border border-border bg-bg p-3 font-mono text-[0.7rem]">
                    <div className="flex items-center gap-2 text-text-faint border-b border-border pb-2">
                      <TerminalWindowIcon className="size-3.5 text-accent-text" />
                      <span>deploy-pipeline.sh</span>
                    </div>
                    <div className="mt-2 space-y-1 text-text-muted">
                      <p className="text-green-500 dark:text-green-400">✔ Build succeed in 1.4s</p>
                      <p className="text-accent-text">✔ SSL Certificate verified</p>
                      <p>🚀 Deployed to production (100% healthy)</p>
                    </div>
                  </div>

                  <Button asChild size="sm" className="mt-5 w-full justify-center">
                    <Link href="/contact">{PRIMARY_CTA}</Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Service 4: Premium Digital Products */}
          <Reveal>
            <article id="digital-products" className="group overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-9 transition-colors hover:border-border-strong">
              <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                      <StorefrontIcon weight="light" className="size-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-text">
                      Ready Products
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
                    Premium Digital Products
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Template kode, starter kit terstruktur, dan developer toolkit siap pakai untuk mempercepat fase awal pembangunan aplikasi.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-control border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text-muted">
                      Template & Starter Kit
                    </span>
                    <span className="rounded-control border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text-muted">
                      Component Library
                    </span>
                    <span className="rounded-control border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text-muted">
                      AI Workflow Template
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end justify-center gap-4 border-t border-border pt-6 md:border-t-0 md:pt-0">
                  <p className="font-mono text-xs text-text-faint md:text-right">
                    Mulai dari fitur, bukan konfigurasi dasar.
                  </p>
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/products">{PRODUCTS_CTA}</Link>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* Differentiators Matrix Section ("Mengapa Memilih VOUR") */}
      <Section className="border-t border-border bg-bg/50">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Pendekatan Kami
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Mengapa bekerja bersama VOUR
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} index={i}>
                <div className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong">
                  <span className="flex size-9 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                    {i === 0 && <CpuIcon className="size-4" />}
                    {i === 1 && <LightningIcon className="size-4" />}
                    {i === 2 && <ShieldCheckIcon className="size-4" />}
                    {i === 3 && <TerminalWindowIcon className="size-4" />}
                  </span>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Custom Project CTA Banner */}
      <Section className="pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-surface border border-border bg-bg-subtle p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-accent/10 blur-3xl"
            />
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                Custom Solution
              </p>
              <h2 className="mt-3 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                Kebutuhan Anda tidak masuk salah satu di atas?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-text-muted">
                Sebagian project yang kami kerjakan adalah gabungan dari beberapa layanan, atau sesuatu yang sepenuhnya baru. Kalau masalahnya jelas, solusinya bisa dirancang.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button asChild className="mt-8">
                <Link href="/contact">{PRIMARY_CTA}</Link>
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}


