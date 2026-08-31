import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/container";
import { featuredFaqs, type Faq } from "@/lib/data/faq";
import { faqJsonLd } from "@/lib/seo";

/**
 * Renders the FAQ and the `FAQPage` structured data for exactly the questions
 * it shows, so the markup never describes content a visitor cannot see.
 */
export function FaqSection({
  faqs = featuredFaqs,
  heading = "Pertanyaan yang Sering Ditanyakan tentang vour.dev",
  showAllLink = true,
}: {
  faqs?: Faq[];
  heading?: string;
  showAllLink?: boolean;
}) {
  return (
    <Section id="faq" className="border-t border-border bg-bg-subtle">
      <script
        type="application/ld+json"
        // Built from the same array rendered below. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Container className="flex flex-col items-center">
        <h2 className="max-w-[28ch] text-balance text-center text-3xl font-semibold tracking-tight md:text-4xl">
          {heading}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-10 w-full max-w-3xl border-t border-border"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {showAllLink && (
          <p className="mt-8 text-sm text-text-muted">
            Pertanyaan lain soal layanan, teknologi, dan proses kerja dijawab di{" "}
            <Link
              href="/about#faq"
              className="text-accent-text underline underline-offset-4 hover:no-underline"
            >
              halaman tentang vour.dev
            </Link>
            .
          </p>
        )}
      </Container>
    </Section>
  );
}
