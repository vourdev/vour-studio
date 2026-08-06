import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { Nav } from "@/components/layout/nav";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
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
    default: `${siteConfig.name} - Jasa Pembuatan Website, Dashboard, dan AI Automation`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "jasa pembuatan website",
    "jasa pembuatan dashboard",
    "ai automation",
    "web development Indonesia",
    "template developer",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      // next-themes swaps this class before paint; suppressHydrationWarning keeps
      // React from complaining about the server/client mismatch that causes.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
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
      <body className="flex min-h-full flex-col">
        {/* "system" rather than "dark": the visitor's OS preference wins on first
            visit, and the nav toggle overrides it from there. Hard-coding "dark"
            would make enableSystem decorative. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
          >
            Lompat ke konten utama
          </a>
          <LenisProvider />
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          // Static, author-controlled object. No user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
