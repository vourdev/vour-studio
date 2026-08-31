import type { Metadata } from "next";

import { services } from "@/lib/data/services";
import { SERVICE_AREA, siteConfig } from "@/lib/site";

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
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1536,
          height: 1024,
          type: "image/png",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function abs(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/** Stable node id, so other graphs on the site can point at the organisation. */
const ORG_ID = `${siteConfig.url}/#organization`;

/**
 * Organization plus every service line, so search engines see what vour.dev
 * sells. Built from `lib/data/services.ts` rather than a hand-kept copy, so it
 * cannot drift from the `/solutions` page a visitor actually reads.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: abs("/images/favico.png"),
    image: abs("/images/ogImage.png"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: SERVICE_AREA,
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    knowsLanguage: ["id", "en"],
    knowsAbout: [
      "Website Development",
      "Landing Page",
      "Company Profile",
      "Web Application Development",
      "Deployment",
      "Server Configuration",
      "Docker",
      "Network Configuration",
    ],
    makesOffer: services
      .filter((service) => service.status === "available")
      .map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: abs(`/solutions#${service.slug}`),
        },
      })),
  };
}

/** WebSite node. Declares the site language and its publisher. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { "@id": ORG_ID },
  };
}

/** One `Service` node per available service, for the `/solutions` page. */
export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services
      .filter((service) => service.status === "available")
      .map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.answer,
        url: abs(`/solutions#${service.slug}`),
        serviceType: service.title,
        areaServed: SERVICE_AREA,
        provider: { "@id": ORG_ID },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.offerings.map((offering) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offering.name,
              description: offering.description,
            },
          })),
        },
      })),
  };
}

/**
 * FAQPage for a set of question/answer pairs.
 *
 * Only ever call this with FAQs that are rendered visibly on the same page --
 * structured data that describes hidden content violates search-engine
 * guidelines.
 */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  date,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: abs(`/blog/${slug}`),
    mainEntityOfPage: abs(`/blog/${slug}`),
    datePublished: date,
    dateModified: date,
    inLanguage: siteConfig.locale,
    image: image ? [image] : [abs("/images/ogImage.png")],
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
