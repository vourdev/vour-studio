import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { CONTACT_EMAIL, mainNav, siteConfig, whatsappLink } from "@/lib/site";

const SOCIAL_ICONS = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  instagram: InstagramLogoIcon,
  tiktok: TiktokLogoIcon,
} as const;

const socials = [
  { label: "GitHub", href: "https://github.com/vourstudio", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/company/vourstudio", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/vour.studio", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@vour.studio", icon: "tiktok" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            {siteConfig.tagline}. Membantu bisnis membangun produk digital yang
            benar-benar dipakai.
          </p>
          <ul className="mt-6 flex items-center gap-3">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-control border border-border text-text-muted transition-colors hover:border-accent hover:text-accent-text"
                  >
                    <Icon weight="light" className="size-4" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint">
            Menu
          </h2>
          <ul className="mt-4 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint">
            Kontak
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <WhatsappLogoIcon weight="light" className="size-4" aria-hidden />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <EnvelopeSimpleIcon weight="light" className="size-4" aria-hidden />
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. Seluruh hak cipta
          dilindungi.
        </p>
        <p>{siteConfig.tagline}</p>
      </Container>
    </footer>
  );
}
