import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/ssr";

import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cara Memulai Project dengan vour.dev",
  description:
    "Kirim kebutuhan lewat form atau WhatsApp, lanjut ke sesi konsultasi, lalu terima proposal berisi lingkup, jadwal, dan biaya. Konsultasi pertama tidak dipungut biaya.",
  path: "/contact",
});

const SOCIAL_ICONS = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  instagram: InstagramLogoIcon,
  tiktok: TiktokLogoIcon,
} as const;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const socials = settings.socials.map((social) => ({
    icon: SOCIAL_ICONS[social.icon] ?? GithubLogoIcon,
    label: social.label,
    href: social.href,
  }));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Kontak", path: "/contact" },
  ]);

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* 1. Header Hero Area */}
      <Container className="max-w-3xl text-center">
        <Reveal>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
            Mulai Konsultasi
          </span>
          <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
            Bagaimana Cara Memulai Project?
          </h1>
          <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-text-muted">
            Kirim kebutuhan Anda lewat form di bawah atau langsung melalui
            WhatsApp. Setelah sesi konsultasi, Anda menerima proposal berisi
            lingkup, jadwal, dan biaya. Konsultasi awal bebas biaya dan tidak
            wajib berlanjut jadi project.
          </p>
        </Reveal>
      </Container>

      {/* 2. Direct Channels Selection */}
      <Container className="mt-12 md:mt-16 max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Primary Channel: WhatsApp */}
          <Reveal>
            <a
              href={whatsappLink(undefined, settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-xl border border-accent/40 bg-accent-soft p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <div>
                <div className="flex size-11 items-center justify-center rounded-lg border border-accent/30 bg-surface text-accent-text">
                  <WhatsappLogoIcon weight="duotone" className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text">WhatsApp Prioritas</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Jalur tercepat untuk diskusi awal. Tim merespons di hari kerja pukul 09.00-18.00 WIB.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-accent-text">
                <span>Chat {settings.phoneNumber}</span>
                <ArrowRightIcon weight="bold" className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </a>
          </Reveal>

          {/* Secondary Channel: Email */}
          <Reveal index={1}>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
            >
              <div>
                <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-bg-subtle text-text-muted group-hover:text-accent-text transition-colors">
                  <EnvelopeSimpleIcon weight="duotone" className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text">Email Resmi</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Ideal untuk pengiriman dokumen RFP, spesifikasi teknis lengkap, atau penawaran kerjasama formal.
                </p>
              </div>
              <div className="mt-6 font-mono text-xs text-text-muted transition-colors group-hover:text-accent-text">
                {settings.contactEmail}
              </div>
            </a>
          </Reveal>
        </div>

        {/* Social Platforms */}
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-xs text-text-faint">
            Kanal lainnya:
          </span>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:border-accent hover:text-accent-text transition-colors"
              >
                <social.icon weight="light" className="size-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* 3. Form & Guidelines Block */}
      <Container className="mt-16 md:mt-24 max-w-5xl">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-12 items-start">
          {/* Left Column: Brief Form */}
          <Reveal className="rounded-xl border border-border bg-surface p-7 sm:p-9 shadow-sm">
            <div className="border-b border-border pb-6 mb-7">
              <h2 className="text-xl font-bold tracking-tight text-text">Kirim Brief Project</h2>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                Isi formulir berikut dan tim engineer kami akan mempelajari kebutuhan Anda sebelum menjadwalkan diskusi.
              </p>
            </div>
            <LeadForm sourcePage="/contact" />
          </Reveal>

          {/* Right Column: Workflow Steps & Guidelines */}
          <div className="space-y-6">
            <Reveal index={1}>
              <div className="rounded-xl border border-border bg-surface p-7 shadow-xs">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                  Tahapan Diskusi
                </h3>
                <ol className="mt-4 space-y-3 font-mono text-xs text-text-muted list-decimal list-inside leading-relaxed">
                  <li>Pengiriman rincian &amp; cakupan kebutuhan</li>
                  <li>Review arsitektur &amp; estimasi waktu 1-2 hari kerja</li>
                  <li>Klarifikasi via meeting online singkat jika diperlukan</li>
                  <li>Penyusunan proposal teknis &amp; jadwal rilis</li>
                </ol>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="rounded-xl border border-border bg-surface p-7 shadow-xs">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                  Komitmen Transparansi
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  Setiap rincian estimasi biaya dan tahapan pengerjaan disampaikan secara tertulis dan terbuka. Tidak ada biaya tersembunyi.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
