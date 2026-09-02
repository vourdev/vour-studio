import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSiteSettings } from "@/lib/cms";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { Nav } from "@/components/layout/nav";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { IS_INDEXABLE, siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Jasa Pembuatan Website, Web Application, dan Deployment`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "vour.dev",
    "jasa pembuatan website",
    "jasa pembuatan landing page",
    "jasa pembuatan company profile",
    "jasa pembuatan web application",
    "jasa deployment dan konfigurasi server",
    "template website",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  icons: {
    icon: "/images/favico.png",
    shortcut: "/images/favico.png",
    apple: "/images/favico.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/ogImage.png`,
        secureUrl: `${siteConfig.url}/images/ogImage.png`,
        width: 1536,
        height: 1024,
        type: "image/png",
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/ogImage.png"],
  },
  // Mirrors robots.txt. A disallow only asks a crawler not to fetch the page;
  // a URL it already knows about can still be listed. The meta tag is what
  // actually keeps preview hosts out of the index.
  robots: IS_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="id"
      // next-themes swaps this class before paint; suppressHydrationWarning keeps
      // React from complaining about the server/client mismatch that causes.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Scroll reveals are server-rendered with `opacity:0` and only revealed
            once Motion hydrates. If JS never arrives, everything below the hero
            would stay invisible. This makes the failure mode "no animation"
            rather than "no page". */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* "system" rather than "dark": the visitor's OS preference wins on first
            visit, and the nav toggle overrides it from there. Hard-coding "dark"
            would make enableSystem decorative. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
          >
            Lompat ke konten utama
          </a>
          <LenisProvider />
          <Nav settings={settings} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} />
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          // Static, author-controlled object. No user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
      </body>
    </html>
  );
}
