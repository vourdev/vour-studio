"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export type ProductFaq = {
  question: string;
  answer: string;
  /** Where the answer leads next. */
  link: { href: string; label: string };
};

/**
 * The product FAQ as a question rail plus one answer panel.
 *
 * A stacked list would have been the third list-shaped section on this route,
 * after the bento and the page intro. It also reads as a wall: four long
 * answers, all open, none of them the one you came for. Here the questions stay
 * scannable in one glance and the panel answers whichever is selected.
 *
 * The panel is a fixed minimum height so switching questions never jumps the
 * page, and every answer stays in the DOM for crawlers.
 */
export function ProductFaq({
  faqs,
  heading,
}: {
  faqs: ProductFaq[];
  heading: string;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-[26ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              {heading}
            </h2>

            <ul className="mt-8 border-t border-border">
              {faqs.map((faq, index) => {
                const isActive = index === active;
                return (
                  <li key={faq.question} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "group flex w-full items-baseline gap-4 py-4 text-left transition-colors",
                        isActive ? "text-text" : "text-text-muted hover:text-text",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[11px] tabular-nums transition-colors",
                          isActive ? "text-accent-text" : "text-text-faint",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-snug">{faq.question}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Every panel stays mounted and they share one grid cell, so the
              container is as tall as the longest answer and switching never
              jumps the page. Keeping them in the DOM is also what lets the
              FAQPage markup describe content that is genuinely on the page. */}
          <div className="grid">
            {faqs.map((faq, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={faq.question}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: reduce || isActive ? 0 : 8,
                  }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col",
                    !isActive && "pointer-events-none",
                  )}
                >
                  <p className="font-mono text-6xl leading-none tabular-nums text-border-strong md:text-7xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-6 max-w-[28ch] text-balance text-xl font-semibold tracking-tight md:text-2xl">
                    {faq.question}
                  </h3>
                  <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-text-muted md:text-base">
                    {faq.answer}
                  </p>

                  <Link
                    href={faq.link.href}
                    tabIndex={isActive ? undefined : -1}
                    className="mt-7 inline-flex w-fit items-center gap-2 text-sm text-accent-text underline-offset-4 transition-colors hover:underline"
                  >
                    {faq.link.label}
                    <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
