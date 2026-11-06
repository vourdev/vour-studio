/** TODO(vour.dev): every value marked `placeholder` needs the real thing before launch. */

/**
 * Inlined at build time, so changing it needs a redeploy. Set `NEXT_PUBLIC_SITE_URL` to
 * `https://vour.dev` once that domain resolves; until then the fallback stays on the live origin.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://vour.dev";

/**
 * Only production is indexable; previews would compete with the canonical domain.
 * An undefined `VERCEL_ENV` (local or self-hosted build) counts as production.
 */
export const IS_INDEXABLE =
  process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === undefined;

export const siteConfig = {
  name: "vour.dev",
  legalName: "vour.dev",
  tagline: "Studio digital untuk website, web application, dan deployment",
  /** Reused verbatim in metadata, JSON-LD, `llms.txt`, About and the footer. */
  description:
    "vour.dev adalah studio digital yang membantu bisnis membangun website, aplikasi web, dan kebutuhan deployment. vour.dev juga menyediakan produk digital seperti template website dan developer resources.",
  url: SITE_URL,
  locale: "id-ID",
} as const;

/** Where vour.dev operates. Used in copy and in `Organization.areaServed`. */
export const SERVICE_AREA = "Indonesia";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6287787388296";

export const PHONE_NUMBER = "087787388296";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "vour.d3v@gmail.com";

export function whatsappLink(message?: string, number = WHATSAPP_NUMBER) {
  const text =
    message ??
    "Halo vour.dev, saya mau tanya soal sebuah project. Boleh minta waktunya sebentar?";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const mainNav = [
  { label: "Layanan", href: "/solutions" },
  { label: "Produk", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** One label per destination: every button to the same place says the same thing. */
export const PRIMARY_CTA = "Mulai Project"; // -> /contact
export const SERVICES_CTA = "Lihat Layanan"; // -> /#services
export const PRODUCTS_CTA = "Lihat Produk"; // -> /products
export const PROJECTS_CTA = "Lihat Project"; // -> /projects
export const BLOG_CTA = "Lihat Blog"; // -> /blog
export const RESOURCES_CTA = BLOG_CTA; // backwards-compatibility alias
export const SERVICE_CTA = "Pelajari"; // -> /solutions#<slug>
export const CONSULT_CTA = "Konsultasi Gratis"; // -> /contact
export const ESTIMATE_CTA = "Hitung Estimasi"; // -> /estimate

/** Icon keys understood by the footer and contact page icon maps. */
export type SocialIcon = "github" | "linkedin" | "instagram" | "tiktok";

export type SocialLink = { label: string; href: string; icon: SocialIcon };
export type NavItem = { label: string; href: string };

/** Fallback when the CMS is unreachable or the fields are empty. */
export type SiteSettings = {
  contactEmail: string;
  whatsappNumber: string;
  phoneNumber: string;
  socials: SocialLink[];
  navLinks: NavItem[];
};

export const defaultSiteSettings: SiteSettings = {
  contactEmail: CONTACT_EMAIL,
  whatsappNumber: WHATSAPP_NUMBER,
  phoneNumber: PHONE_NUMBER,
  socials: [
    { label: "GitHub", href: "https://github.com/vourstudio", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/vourstudio",
      icon: "linkedin",
    },
    { label: "Instagram", href: "https://instagram.com/vour.studio", icon: "instagram" },
    { label: "TikTok", href: "https://tiktok.com/@vour.studio", icon: "tiktok" },
  ],
  navLinks: [...mainNav],
};
