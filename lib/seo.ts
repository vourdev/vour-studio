import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/ogImage.png",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** Organization plus the three service lines, so search engines see what Vour sells. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: "ID",
    knowsAbout: [
      "Web Development",
      "Dashboard Development",
      "AI Automation",
      "Infrastructure and Deployment",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description:
            "Landing page, company profile, web application, dan dashboard yang modern dan responsif.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation",
          description:
            "Workflow AI, automation, dan internal tools untuk memangkas pekerjaan manual.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Infrastructure and Deployment",
          description:
            "Deployment yang stabil, aman, dan mudah dipelihara, lengkap dengan monitoring.",
        },
      },
    ],
  };
}
