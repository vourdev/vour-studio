import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  productionBrowserSourceMaps: true,
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
