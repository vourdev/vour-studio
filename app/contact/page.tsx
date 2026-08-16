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
import { Container, Section } from "@/components/ui/container";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Kontak",
  description:
    "Ceritakan masalah yang mau dibereskan. Konsultasi pertama tidak dipungut biaya dan tidak wajib berlanjut jadi project.",
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

  return (
    <>
      {/* 1. Header Hero Area */}
      <Section className="pt-32 pb-12">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <h1 className="font-mono text-3xl font-semibold tracking-tighter sm:text-[2.25rem] lg:text-[2.75rem]">
              Ceritakan dulu masalahnya
            </h1>
            <p className="mt-4 text-sm text-text-muted leading-relaxed md:text-base">
              Konsultasi pertama gratis dan tidak wajib berlanjut jadi project. Pilih jalur yang paling gampang buat Anda.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 2. Visual Channel Cards Selection */}
      <Section className="py-0">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Primary Channel: WhatsApp */}
            <Reveal>
              <a
                href={whatsappLink(undefined, settings.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-surface border-2 border-accent/40 bg-accent-soft/30 p-8 hover:border-accent hover:bg-accent-soft/50 transition-all duration-300 h-full"
              >
                <div>
                  <span className="flex size-12 items-center justify-center rounded-control bg-accent-soft border border-accent/30 text-accent-text mb-6">
                    <WhatsappLogoIcon weight="duotone" className="size-6" />
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp Prioritas</h3>
                  <p className="text-xs leading-relaxed text-text-muted">
                    Paling cepat dibalas. Hari kerja 09.00–18.00 WIB, biasanya dalam hitungan jam.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold text-accent-text group-hover:translate-x-1 transition-transform">
                  <span>Chat ke {settings.phoneNumber}</span>
                  <ArrowRightIcon weight="bold" className="size-3.5" />
                </div>
              </a>
            </Reveal>

            {/* Secondary Channel: Email */}
            <Reveal index={1}>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="group flex flex-col justify-between rounded-surface border border-border bg-surface-solid/40 p-8 hover:border-border-strong hover:bg-surface-solid/70 transition-all duration-300 h-full"
              >
                <div>
                  <span className="flex size-12 items-center justify-center rounded-control bg-bg border border-border text-text-muted group-hover:text-accent-text transition-colors mb-6">
                    <EnvelopeSimpleIcon weight="duotone" className="size-6" />
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">Email Proposal</h3>
                  <p className="text-xs leading-relaxed text-text-muted">
                    Untuk RFP, dokumen tender, atau apa pun yang butuh jejak tertulis.
                  </p>
                </div>
                <div className="mt-8 font-mono text-xs text-text-muted group-hover:text-accent-text transition-colors">
                  {settings.contactEmail}
                </div>
              </a>
            </Reveal>
          </div>

          {/* Social Platform shortcuts */}
          <Reveal y={16} className="mt-12 flex flex-col items-center gap-4">
            <span className="font-mono text-[10px] tracking-wider uppercase text-text-faint">
              Kami juga ada di sini
            </span>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-control border border-border bg-bg-subtle text-text-muted hover:border-accent hover:text-accent-text transition-colors"
                >
                  <social.icon weight="light" className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Form & Guideline Split Block */}
      <Section className="border-t border-border bg-bg-subtle/30 mt-20 pb-20">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
            {/* Left Column (60%): Brief Form */}
            <Reveal className="relative overflow-hidden rounded-surface border border-border bg-bg-subtle p-6 md:p-9">
              <BackgroundBeams />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Kirim brief project</h2>
                <p className="text-xs text-text-muted mb-8 leading-normal">
                  Sudah punya gambaran lingkup atau dokumen spek? Tempel saja di sini.
                </p>
                <LeadForm sourcePage="/contact" />
              </div>
            </Reveal>

            {/* Right Column (40%): Tech-guidelines & Steps Sidebar */}
            <div className="space-y-6">
              {/* Steps overview card */}
              <Reveal index={1}>
                <div className="rounded-surface border border-border bg-bg p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-accent-text mb-3">
                    Proses Konsultasi
                  </h3>
                  <ol className="space-y-3 font-mono text-[11px] text-text-muted list-decimal list-inside">
                    <li>Anda kirim rincian kebutuhan</li>
                    <li>Obrolan klarifikasi 15–30 menit, kalau perlu</li>
                    <li>Estimasi biaya dan tahapan dikirim tertulis</li>
                  </ol>
                </div>
              </Reveal>

              {/* Budget guidance card */}
              <Reveal index={2}>
                <div className="rounded-surface border border-accent/20 bg-accent-soft/20 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-accent-text mb-2">
                    Kisaran Biaya
                  </h3>
                  <p className="text-[11px] leading-relaxed text-text-muted">
                    Sebagian besar project web custom mulai di angka Rp 15–30 juta. Pekerjaan infrastruktur dan pipeline rilis dihitung terpisah, mulai Rp 8 juta. Angka pastinya menyesuaikan lingkup.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
