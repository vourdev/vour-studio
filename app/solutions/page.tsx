import {
  CpuIcon,
  FileTextIcon,
  LightningIcon,
  ShieldCheckIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { ClosingCta } from "@/components/sections/closing-cta";
import { ServiceLedger } from "@/components/sections/service-ledger";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { differentiators, services } from "@/lib/data/services";
import { breadcrumbJsonLd, buildMetadata, servicesJsonLd } from "@/lib/seo";
import { ESTIMATE_CTA, PRIMARY_CTA, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Layanan vour.dev: Website, Web Application, dan Deployment",
  description:
    "Layanan vour.dev mencakup pembuatan landing page, company profile, website portfolio, web application, deployment, konfigurasi server, Docker, dan konfigurasi jaringan.",
  path: "/solutions",
});

/** Only two services earn a figure; the rest would be decoration for its own sake. */
const SERVICE_VISUALS = {
  "website-development": <BrowserVisual />,
  "deployment-infrastructure": <TerminalVisual />,
};

/** A browser chrome mock. Decorative: the service copy carries the meaning. */
function BrowserVisual() {
  return (
    <div
      aria-hidden
      className="relative aspect-16/10 overflow-hidden rounded-control border border-border bg-bg p-3 shadow-xl"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-1 pb-3">
        <span className="size-2.5 rounded-full bg-red-500/60" />
        <span className="size-2.5 rounded-full bg-yellow-500/60" />
        <span className="size-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 flex-1 rounded bg-bg-subtle px-2 py-0.5 font-mono text-[0.65rem] text-text-faint">
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="mt-3 space-y-3 p-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-border/60" />
          <div className="h-6 w-16 rounded border border-accent/30 bg-accent/20" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded border border-border bg-bg-subtle p-2">
              <div className="h-2 w-10 rounded bg-text-faint/30" />
              <div className="mt-2 h-4 w-12 rounded bg-accent-text/60" />
            </div>
          ))}
        </div>
        <div className="h-24 rounded border border-border/80 bg-bg-subtle p-3">
          <div className="h-2 w-full rounded bg-border/60" />
          <div className="mt-2 h-2 w-3/4 rounded bg-border/40" />
          <div className="mt-2 h-2 w-1/2 rounded bg-border/40" />
        </div>
      </div>
    </div>
  );
}

/** A deploy log mock. Decorative: the service copy carries the meaning. */
function TerminalVisual() {
  return (
    <div
      aria-hidden
      className="rounded-control border border-border bg-bg p-3 font-mono text-[0.7rem]"
    >
      <div className="flex items-center gap-2 border-b border-border pb-2 text-text-faint">
        <TerminalWindowIcon className="size-3.5 text-accent-text" />
        <span>deploy-pipeline.sh</span>
      </div>
      <div className="mt-2 space-y-1 text-text-muted">
        <p className="text-green-500 dark:text-green-400">✔ Build selesai</p>
        <p className="text-accent-text">✔ Sertifikat HTTPS terpasang</p>
        <p>🚀 Rilis ke production tanpa downtime</p>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Layanan", path: "/solutions" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled objects. No user input reaches this string.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([servicesJsonLd(), breadcrumb]),
        }}
      />

      <Section spacing="header">
        <Container>
          <Reveal>
            <h1 className="max-w-[26ch] text-balance font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Apa Saja Layanan vour.dev?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              vour.dev menyediakan pembuatan website (landing page, company
              profile, website portfolio, website custom), pembuatan web
              application, serta deployment dan konfigurasi infrastruktur
              termasuk server, Docker, dan jaringan. Di luar layanan project,
              vour.dev juga menjual produk digital berupa template dan developer
              resources.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted">
              Halaman ini boleh teknis. Tiap layanan di bawah disertai cakupan
              pekerjaannya, bukan cuma janji hasil akhirnya. Kalau yang Anda cari
              adalah kisaran biayanya,{" "}
              <Link
                href="/estimate"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                hitung estimasi biaya project
              </Link>{" "}
              lebih dulu.
            </p>
          </Reveal>

        </Container>
      </Section>

      <ServiceLedger services={services} visuals={SERVICE_VISUALS} />

      {/* Differentiators Matrix Section ("Mengapa Memilih vour.dev") */}
      <Section className="border-t border-border bg-bg/50">
        <Container>
          <Reveal>
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Apa yang membedakan vour.dev dari freelancer atau agency?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted">
              vour.dev adalah studio kecil berisi fullstack developer, UI/UX
              designer, dan DevOps engineer. Artinya desain, pembuatan, dan
              pemasangan ke server dikerjakan satu tim yang sama, tanpa perlu
              mencari orang berbeda untuk tiap tahap.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} index={i}>
                <div className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong">
                  <span className="mb-4 flex size-9 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                    {i === 0 && <CpuIcon className="size-4" />}
                    {i === 1 && <LightningIcon className="size-4" />}
                    {i === 2 && <ShieldCheckIcon className="size-4" />}
                    {i === 3 && <FileTextIcon className="size-4" />}
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

      <Section spacing="continued">
        <Container>
          <div className="relative overflow-hidden rounded-surface border border-border bg-bg-subtle p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-accent/10 blur-3xl"
            />
            <Reveal>
              <h2 className="max-w-[24ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Kebutuhan Anda tidak masuk salah satu di atas?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-text-muted">
                Sebagian project yang kami ambil adalah gabungan beberapa
                layanan, atau sesuatu yang belum pernah kami kerjakan sebelumnya.
                Selama masalahnya jelas, rancangannya bisa disusun.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">{PRIMARY_CTA}</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/estimate">{ESTIMATE_CTA}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
