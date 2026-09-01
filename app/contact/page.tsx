import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react/ssr";
import dynamic from "next/dynamic";

import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

/** The map renders a generated dot grid and animates arcs, so it stays out of
    the initial bundle: nothing above it depends on the code. */
const WorldMap = dynamic(() => import("@/components/ui/world-map"));

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

/**
 * Arcs drawn from Jakarta out to the regions clients have written in from.
 * Coordinates are the cities themselves, so the drawing is honest about what
 * it shows: reach, not offices.
 */
const JAKARTA = { lat: -6.2, lng: 106.85, label: "Jakarta" };

const REACH = [
  { start: JAKARTA, end: { lat: 1.35, lng: 103.82, label: "Singapura" } },
  { start: JAKARTA, end: { lat: -37.81, lng: 144.96, label: "Melbourne" } },
  { start: JAKARTA, end: { lat: 25.2, lng: 55.27, label: "Dubai" } },
  { start: JAKARTA, end: { lat: 52.37, lng: 4.9, label: "Amsterdam" } },
];

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

  const channels = [
    {
      label: "WhatsApp",
      value: settings.phoneNumber,
      href: whatsappLink(undefined, settings.whatsappNumber),
      external: true,
    },
    {
      label: "Email",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
      external: false,
    },
  ];

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Container>
        <Reveal>
          <h1 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-text md:text-5xl lg:text-6xl">
            Mulai project
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-pretty text-text-muted">
            Ceritakan kebutuhan Anda. Setelah diskusi awal, Anda menerima
            proposal berisi lingkup, jadwal, dan biaya. Tidak dipungut biaya dan
            tidak wajib berlanjut.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-14 md:mt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <h2 className="text-sm font-semibold tracking-tight text-text">
              Kirim brief
            </h2>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-text-muted">
              Semakin jelas kebutuhannya, semakin akurat estimasi yang kami
              kirim balik.
            </p>
            <div className="mt-8">
              <LeadForm sourcePage="/contact" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:col-start-9">
            <h2 className="text-sm font-semibold tracking-tight text-text">
              Atau langsung
            </h2>

            <ul className="mt-6">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-baseline justify-between gap-4 border-t border-border py-4 transition-colors duration-200 ease-out hover:border-accent"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-faint">
                      {channel.label}
                    </span>
                    <span className="flex items-baseline gap-1.5 font-mono text-sm text-text transition-colors duration-200 ease-out group-hover:text-accent-text">
                      {channel.value}
                      <ArrowUpRightIcon
                        weight="bold"
                        aria-hidden
                        className="size-3.5 shrink-0 self-center transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 border-t border-border pt-8">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-control border border-border text-text-muted transition-colors duration-200 ease-out hover:border-accent hover:text-accent-text"
                >
                  <social.icon weight="light" className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* The page's one visual, and its closing note: it carries no copy and
          nothing follows it, so it reads as a sign-off rather than something
          the visitor has to scroll past to reach the form. */}
      <Container className="mt-20 md:mt-28">
        <Reveal>
          <WorldMap dots={REACH} lineColor="#39d5f6" />
        </Reveal>
      </Container>
    </div>
  );
}
