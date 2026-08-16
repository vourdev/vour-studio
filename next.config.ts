import type { NextConfig } from "next";

/**
 * Applied to every response. No Content-Security-Policy here on purpose: the
 * hero's Spline runtime pulls WebAssembly, spawns workers and reaches several
 * spline.design origins plus unpkg, so an enforcing policy has to be validated
 * against real traffic before it ships. See docs/security-headers.md.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Vercel answers 403 for every `.map` under /_next/static, so emitting them
  // only costs build time and leaves each chunk advertising a sourceMappingURL
  // that nothing can fetch.
  productionBrowserSourceMaps: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      // TODO: replace Picsum placeholders with real project/article imagery.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // CMS media served by Payload locally (relative URLs are made absolute
      // against the CMS origin in lib/cms.ts).
      { protocol: "http", hostname: "localhost" },
      // CMS media served from Cloudflare R2 (public *.r2.dev subdomain) once
      // storage is enabled in the admin project.
      { protocol: "https", hostname: "*.r2.dev" },
      // Custom domain for R2 media. Keeps images loading even on networks that
      // block the *.r2.dev subdomain (e.g. some ISP DNS filtering).
      { protocol: "https", hostname: "media.vour.studio" },
      // Admin CMS deployed on Vercel (serves uploaded media)
      { protocol: "https", hostname: "vour-studio-admin.vercel.app" },
      // Unsplash for testimonial avatars
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
