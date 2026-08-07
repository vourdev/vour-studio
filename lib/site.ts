/**
 * Single source of truth for brand, navigation and contact details.
 *
 * TODO(Vour): every value marked `placeholder` needs the real thing before launch.
 */

export const siteConfig = {
  name: "Vour",
  legalName: "Vour Studio",
  tagline: "AI-Powered Product Engineering Studio",
  description:
    "Vour membangun website, dashboard internal, dan workflow AI untuk bisnis modern. Juga menyediakan template dan starter kit untuk developer.",
  url: "https://vour-studio.vercel.app",
  locale: "id-ID",
} as const;

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6287787388296";

export const PHONE_NUMBER = "087787388296";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "vour.d3v@gmail.com";

export function whatsappLink(message?: string, number = WHATSAPP_NUMBER) {
  const text =
    message ??
    "Halo Vour, saya ingin mendiskusikan sebuah project. Boleh minta informasinya?";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const mainNav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * One label per intent, site-wide.
 *
 * Every button that leads to the same place says exactly the same thing, so a
 * visitor never sees "Lihat Produk" in the hero and "Lihat semua produk" three
 * sections later and wonders whether they go somewhere different.
 */
export const PRIMARY_CTA = "Mulai Project"; // -> /contact
export const PRODUCTS_CTA = "Lihat Produk"; // -> /products
export const PROJECTS_CTA = "Lihat Project"; // -> /projects
export const RESOURCES_CTA = "Lihat Blog"; // -> /resources
export const SERVICE_CTA = "Pelajari"; // -> /solutions#<slug>

/** Icon keys understood by the footer and contact page icon maps. */
export type SocialIcon = "github" | "linkedin" | "instagram" | "tiktok";

export type SocialLink = { label: string; href: string; icon: SocialIcon };
export type NavItem = { label: string; href: string };

/**
 * Dynamic site-wide settings (contact, socials, nav) read from the admin CMS
 * via `getSiteSettings()` in `lib/cms.ts`. This constant is the fallback used
 * when the CMS is unreachable or the fields are empty.
 */
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
