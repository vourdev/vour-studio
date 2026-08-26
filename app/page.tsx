import dynamic from "next/dynamic";

import { getProducts } from "@/lib/cms";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Differentiators } from "@/components/sections/differentiators";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { TrustBar } from "@/components/sections/trust-bar";

const Workflow = dynamic(() =>
  import("@/components/sections/workflow").then((m) => m.Workflow),
);

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <TrustBar />
      <Differentiators />
      <ServicesShowcase />
      <FeaturedProducts products={products} />
      <Workflow />
      <TestimonialsMarquee />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
