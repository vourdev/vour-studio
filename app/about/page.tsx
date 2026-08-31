import {
  ArrowRightIcon,
  BuildingsIcon,
  CodeIcon,
  RocketIcon,
  StorefrontIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { faqs } from "@/lib/data/faq";
import { services, workflowSteps } from "@/lib/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import {
  ESTIMATE_CTA,
  PRIMARY_CTA,
  PRODUCTS_CTA,
  SERVICE_AREA,
  siteConfig,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Apa itu vour.dev? Profil Studio, Layanan, dan Cara Kerjanya",
  description: siteConfig.description,
  path: "/about",
});

const team = [
  {
    role: "Fullstack Developer",
    body: "Mengerjakan tampilan sampai sisi server: halaman, alur data, dan integrasi dengan layanan lain.",
  },
  {
    role: "UI/UX Designer",
    body: "Menyusun struktur halaman dan tampilan, supaya pengunjung menemukan yang dicari tanpa dijelaskan.",
  },
  {
    role: "DevOps Engineer",
    body: "Menyiapkan server, proses rilis, dan pemantauan, supaya yang sudah dibuat benar-benar jalan di production.",
  },
];

const audiences = [
  {
    icon: BuildingsIcon,
    title: "Bisnis dan UMKM",
    body: "Butuh company profile atau landing page yang bisa dikirim ke calon pelanggan dan ditemukan lewat pencarian.",
    href: "/solutions#website-development",
    linkLabel: "Lihat layanan pembuatan website",
  },
  {
    icon: UsersThreeIcon,
    title: "Tim yang sudah punya sistem",
    body: "Pekerjaan operasional sudah tidak muat di spreadsheet, atau aplikasinya belum berjalan stabil di server.",
    href: "/solutions#web-application",
    linkLabel: "Lihat layanan web application",
  },
  {
    icon: CodeIcon,
    title: "Developer dan studio kecil",
    body: "Tidak butuh jasa, butuh fondasi: template dan starter kit yang menghemat tahap setup di awal project.",
    href: "/products",
    linkLabel: "Lihat produk digital vour.dev",
  },
];

const stack = [
  { label: "Next.js & React", note: "Kerangka aplikasi web" },
  { label: "TypeScript", note: "Bahasa utama, di sisi tampilan maupun server" },
  { label: "Tailwind CSS", note: "Penataan tampilan" },
  { label: "Node.js", note: "Sisi server dan integrasi" },
  { label: "PostgreSQL", note: "Basis data" },
  { label: "Docker", note: "Pembungkusan aplikasi agar konsisten antar server" },
  { label: "CI/CD", note: "Proses rilis otomatis" },
  { label: "VPS & Cloud", note: "Tempat aplikasi dijalankan" },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* 1. The answer, before anything else. */}
      <Section spacing="header">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h1 className="text-balance font-mono text-[1.85rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.5rem] lg:text-[3rem]">
                  Apa itu vour.dev?
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-text md:text-lg">
                  {siteConfig.description}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
                  vour.dev adalah studio kecil yang berbasis di {SERVICE_AREA}.
                  Desain, pembuatan, dan pemasangan ke server dikerjakan tim yang
                  sama, jadi Anda tidak perlu mencari orang berbeda untuk tiap
                  tahap.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contact">{PRIMARY_CTA}</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/solutions">Lihat rincian layanan</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal
              delay={0.2}
              className="relative aspect-16/10 w-full overflow-hidden rounded-surface border border-border"
            >
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=560&fit=crop"
                alt="Layar kode pada meja kerja developer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover brightness-90 grayscale transition-all duration-500 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 2. What vour.dev does. */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <h2 className="max-w-[30ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Apa yang vour.dev kerjakan?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              Ada empat hal yang bisa dipesan hari ini: pembuatan website,
              pembuatan web application, deployment beserta konfigurasi
              infrastrukturnya, dan produk digital siap pakai.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services
              .filter((service) => service.status === "available")
              .map((service, i) => (
                <Reveal key={service.slug} index={i}>
                  <Link
                    href={service.ctaHref}
                    className="group flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-accent/40"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                      {service.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent-text">
                      {service.offerings.map((o) => o.name).join(" · ")}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-text group-hover:text-accent-text">
                      Selengkapnya
                      <ArrowRightIcon
                        weight="bold"
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>
        </Container>
      </Section>

      {/* 3. Who it is for. */}
      <Section className="border-t border-border bg-bg-subtle/40">
        <Container>
          <Reveal>
            <h2 className="max-w-[30ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Siapa yang cocok menggunakan vour.dev?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              Tiga kelompok, dengan kebutuhan yang berbeda-beda.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} index={i}>
                <div className="flex h-full flex-col rounded-surface border border-border bg-bg p-6">
                  <span className="mb-4 flex size-10 items-center justify-center rounded-control border border-border bg-bg-subtle text-accent-text">
                    <audience.icon weight="light" className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold">{audience.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                    {audience.body}
                  </p>
                  <Link
                    href={audience.href}
                    className="mt-5 text-sm text-accent-text underline underline-offset-4 hover:no-underline"
                  >
                    {audience.linkLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. How it works. */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <h2 className="max-w-[30ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Bagaimana vour.dev bekerja?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              Enam tahap, dari percakapan pertama sampai masa pendampingan
              setelah rilis.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <Reveal key={step.title} index={i}>
                <li className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6">
                  <span className="font-mono text-xs text-accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.role}
                  className="rounded-surface border border-border bg-bg p-6"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                    {member.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {member.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5. Technology. */}
      <Section className="border-t border-border bg-bg-subtle/40">
        <Container>
          <Reveal>
            <h2 className="max-w-[34ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Teknologi apa yang digunakan vour.dev?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              Website dan aplikasi dibangun dengan Next.js, React, dan
              TypeScript. Di sisi server, vour.dev bekerja dengan Node.js,
              PostgreSQL, Docker, dan pipeline rilis otomatis. Pilihannya
              menyesuaikan masalah yang sedang dikerjakan, bukan sebaliknya.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((item, i) => (
              <Reveal key={item.label} index={i}>
                <div className="rounded-control border border-border bg-bg px-4 py-3">
                  <p className="font-mono text-sm text-text">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Digital products. */}
      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <Reveal>
                <h2 className="max-w-[34ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  Apakah vour.dev menjual produk digital?
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
                  Ya. Selain layanan project, vour.dev menjual template website,
                  template portfolio, template landing page, developer resources,
                  ebook, dan AI workflow. Produk ini dibeli sekali dan langsung
                  bisa dipakai, tanpa proses pemesanan project. Kodenya Anda
                  pegang, jadi bisa diubah sepenuhnya.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="flex flex-col items-start gap-4 rounded-surface border border-border bg-bg-subtle p-6">
                <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                  <StorefrontIcon weight="light" className="size-5" />
                </span>
                <p className="text-sm leading-relaxed text-text-muted">
                  Status ketersediaan tiap produk tertulis di halaman produk.
                </p>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/products">{PRODUCTS_CTA}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. Starting a project. */}
      <Section className="border-t border-border bg-bg-subtle/40">
        <Container>
          <div className="relative overflow-hidden rounded-surface border border-border bg-bg p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-accent/10 blur-3xl"
            />
            <Reveal>
              <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg-subtle text-accent-text">
                <RocketIcon weight="light" className="size-5" />
              </span>
              <h2 className="mt-5 max-w-[30ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Bagaimana cara memulai project dengan vour.dev?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted md:text-base">
                Kirim kebutuhan Anda lewat halaman kontak atau WhatsApp. Setelah
                sesi konsultasi, Anda menerima proposal berisi lingkup, jadwal,
                dan biaya. Kalau yang dibutuhkan sekarang baru gambaran anggaran,
                mulai dari estimator biayanya.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
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

      <FaqSection
        faqs={faqs}
        heading="Pertanyaan Lain tentang vour.dev"
        showAllLink={false}
      />

      <ClosingCta />
    </>
  );
}
