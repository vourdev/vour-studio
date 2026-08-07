/**
 * Single source of truth for brand, navigation and contact details.
 *
 * TODO(VOUR): every value marked `placeholder` needs the real thing before launch.
 */

export const siteConfig = {
  name: "VOUR",
  legalName: "VOUR Studio",
  tagline: "AI-Powered Product Engineering Studio",
  description:
    "VOUR membangun website, dashboard internal, dan workflow AI untuk bisnis modern. Juga menyediakan template dan starter kit untuk developer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vour.studio", // placeholder domain
  locale: "id-ID",
} as const;

/** placeholder: swap for the real WhatsApp business number (digits only, 62 prefix). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890";

/** placeholder: swap for the real inbox. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "halo@vour.studio";

export function whatsappLink(message?: string) {
  const text =
    message ??
    "Halo VOUR, saya ingin mendiskusikan sebuah project. Boleh minta informasinya?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

/** placeholder: swap for the real profiles. */
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/vourstudio", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/vourstudio",
    icon: "linkedin",
  },
  { label: "Instagram", href: "https://instagram.com/vour.studio", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@vour.studio", icon: "tiktok" },
] as const;
