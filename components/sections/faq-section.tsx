import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/container";
import { faqs } from "@/lib/data/faq";

/**
 * Headline stacked above the accordion. A big headline on the left with a small
 * explainer floating on the right is the split-header pattern; one focused
 * message reads better.
 */
export function FaqSection() {
  return (
    <Section id="faq" className="border-t border-border bg-bg-subtle">
      <Container className="flex flex-col items-center">
        <h2 className="text-center max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Pertanyaan yang sering masuk
        </h2>

        <Accordion type="single" collapsible className="mt-10 w-full max-w-3xl border-t border-border mx-auto">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
