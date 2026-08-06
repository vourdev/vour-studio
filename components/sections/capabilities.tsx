import {
  ArrowRightIcon,
  BrowsersIcon,
  CloudArrowUpIcon,
  RobotIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const ICONS = {
  browsers: BrowsersIcon,
  robot: RobotIcon,
  cloud: CloudArrowUpIcon,
  storefront: StorefrontIcon,
} as const;

/**
 * Four items, four cells, no empty tiles. Cells 1 and 4 span two columns so the
 * grid has rhythm instead of being four identical boxes, and those two carry an
 * accent wash so the block is not uniform text-on-surface.
 */
const SPANS = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];
const WASHED = [true, false, false, true];

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Container>
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Apa yang bisa kami bantu?
          </h2>
          <p className="mt-4 max-w-[58ch] text-text-muted">
            Empat hal yang kami kerjakan, dari halaman pertama yang dilihat pelanggan
            sampai sistem yang berjalan diam-diam di belakang layar.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.slug} index={i} className={SPANS[i]}>
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-surface border border-border p-7 transition-colors hover:border-border-strong",
                    WASHED[i]
                      ? "bg-[radial-gradient(120%_100%_at_0%_0%,var(--accent-soft),transparent_60%)]"
                      : "bg-bg-subtle",
                  )}
                >
                  <Icon
                    weight="light"
                    className="size-7 text-accent-text"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-xl font-medium">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {service.summary}
                  </p>
                  <Link
                    href={service.ctaHref}
                    className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent-text"
                  >
                    {service.ctaLabel}
                    <ArrowRightIcon
                      weight="bold"
                      className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
