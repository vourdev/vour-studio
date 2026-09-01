import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ServiceIndex } from "@/components/sections/service-index";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { services } from "@/lib/data/services";
import { CONSULT_CTA } from "@/lib/site";

/**
 * The service index: a numbered ledger rather than a wall of cards.
 *
 * Each entry carries only what a visitor needs to pick a direction (number,
 * name, what it is built with) and links into the matching section of
 * `/solutions`, where the full breakdown already lives. The section is
 * anchored at `#services` because the hero's secondary CTA scrolls here.
 *
 * The grid is a client island (`ServiceIndex`) because its hover indicator is
 * a shared-element animation. Only the four fields it renders are handed over,
 * so the rest of each `Service` stays out of the payload.
 */
export function ServicesShowcase() {
  const items = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    summary: service.indexSummary,
    href: service.ctaHref,
    isSoon: service.status === "soon",
  }));

  return (
    <Section id="services" className="border-t border-border bg-bg">
      <Container>
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-text-faint">
                Apa yang bisa kami bantu
              </span>
              {/* The mark is sized in `em`, so it tracks the headline across
                  every breakpoint instead of needing its own scale. */}
              <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-text md:text-5xl lg:text-6xl">
                Layanan
                <span className="mt-2 flex items-center gap-[0.25em]">
                  <Image
                    src="/images/vourdev-logo.jpeg"
                    alt=""
                    aria-hidden
                    width={160}
                    height={160}
                    className="size-[0.85em] shrink-0 rounded-control object-cover outline outline-white/10 -outline-offset-1"
                  />
                  vour.dev
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="max-w-[42ch] text-sm leading-relaxed text-pretty text-text-muted">
              vour.dev mengerjakan pembuatan website, web application, serta
              deployment dan konfigurasi server untuk bisnis yang sudah jalan.
            </p>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-pretty text-text-muted">
              Tersedia juga produk digital berupa template dan bahan siap pakai,
              untuk kebutuhan yang tidak perlu dikerjakan dari nol.
            </p>
            <Button asChild className="mt-8">
              <Link href="/contact">
                {CONSULT_CTA}
                <ArrowRightIcon weight="bold" className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>

        <ServiceIndex items={items} />
      </Container>
    </Section>
  );
}

export default ServicesShowcase;
