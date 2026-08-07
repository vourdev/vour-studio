import dynamic from "next/dynamic";

import { getProducts, getProjects } from "@/lib/cms";
import { Capabilities } from "@/components/sections/capabilities";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Differentiators } from "@/components/sections/differentiators";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { ResourcesPreview } from "@/components/sections/resources-preview";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { TrustBar } from "@/components/sections/trust-bar";

// The only section that pulls in GSAP. Splitting it out keeps ~50KB of animation
// engine off the critical path for a visitor who never scrolls that far.
const Workflow = dynamic(() =>
  import("@/components/sections/workflow").then((m) => m.Workflow),
);

export default async function Home() {
  const [products, projects] = await Promise.all([getProducts(), getProjects()]);

  return (
    <>
      <Hero />
      <TrustBar />
      <Capabilities />
      <Differentiators />
      <FeaturedProducts products={products} />
      <SelectedProjects projects={projects} />
      <Workflow />
      <ResourcesPreview />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
