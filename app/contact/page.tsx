import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";

import { LeadForm } from "@/components/forms/lead-form";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Kontak",
  description:
    "Diskusikan kebutuhan project Anda bersama VOUR. Hubungi lewat WhatsApp, email, atau kirim pesan langsung dari halaman ini.",
  path: "/contact",
});

const channels = [
  {
    icon: WhatsappLogoIcon,
    label: "WhatsApp",
    value: "Jalur tercepat, biasanya dibalas di jam kerja",
    href: whatsappLink(),
    external: true,
  },
  {
    icon: EnvelopeSimpleIcon,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
];

const socials = [
  { icon: GithubLogoIcon, label: "GitHub", href: "https://github.com/vourstudio" },
  {
    icon: LinkedinLogoIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/company/vourstudio",
  },
  {
    icon: InstagramLogoIcon,
    label: "Instagram",
    href: "https://instagram.com/vour.studio",
  },
  { icon: TiktokLogoIcon, label: "TikTok", href: "https://tiktok.com/@vour.studio" },
];

export default function ContactPage() {
  return (
    <Section className="pt-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <h1 className="max-w-[16ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Mari bicarakan project Anda
          </h1>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-text-muted">
            Ceritakan masalah yang ingin diselesaikan. Konsultasi awal tidak dipungut
            biaya, dan hasilnya berupa urutan pengerjaan yang masuk akal untuk keadaan
            Anda sekarang.
          </p>

          <ul className="mt-10 space-y-4">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-start gap-4 rounded-surface border border-border p-5 transition-colors hover:border-accent"
                >
                  <channel.icon
                    weight="light"
                    className="mt-0.5 size-5 shrink-0 text-accent-text"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-medium">{channel.label}</span>
                    <span className="mt-1 block text-sm text-text-muted">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-text">Ikuti VOUR</h2>
            <ul className="mt-4 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-control border border-border text-text-muted transition-colors hover:border-accent hover:text-accent-text"
                  >
                    <social.icon weight="light" className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-surface border border-border bg-bg-subtle p-6 md:p-9">
          <h2 className="text-lg font-medium">Kirim pesan</h2>
          <p className="mt-2 text-sm text-text-muted">
            Kami balas ke email yang Anda isi di bawah.
          </p>
          <div className="mt-8">
            <LeadForm sourcePage="/contact" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
