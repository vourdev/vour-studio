import {
  BrowsersIcon,
  CheckIcon,
  CloudArrowUpIcon,
  RobotIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { services } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";
import { PRIMARY_CTA, PRODUCTS_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Website development, AI automation, infrastructure dan deployment, serta produk digital untuk developer. Empat layanan VOUR dan hasil yang Anda dapatkan.",
  path: "/solutions",
});

const ICONS = {
  browsers: BrowsersIcon,
  robot: RobotIcon,
  cloud: CloudArrowUpIcon,
  storefront: StorefrontIcon,
} as const;

export default function SolutionsPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <Container>
          <h1 className="max-w-[24ch] font-mono text-[1.6rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            Layanan yang kami tangani
          </h1>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-text-muted">
            Setiap layanan di bawah dijelaskan lewat hasil yang Anda dapatkan lebih
            dulu, baru rincian pekerjaannya. Kalau kebutuhan Anda tidak persis masuk
            salah satunya, tetap ceritakan saja.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="divide-y divide-border border-y border-border">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.slug} y={28}>
                <article
                  id={service.slug}
                  className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16"
                >
                  <div>
                    <Icon
                      weight="light"
                      className="size-8 text-accent-text"
                      aria-hidden
                    />
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-[46ch] leading-relaxed text-text-muted">
                      {service.summary}
                    </p>
                    {/* The three service pillars already have their detail on
                        this page, so their action here is to start a project.
                        Only the products pillar points elsewhere. */}
                    <Button asChild variant="secondary" size="sm" className="mt-7">
                      {service.ctaHref.startsWith("/products") ? (
                        <Link href="/products">{PRODUCTS_CTA}</Link>
                      ) : (
                        <Link href="/contact">{PRIMARY_CTA}</Link>
                      )}
                    </Button>
                  </div>

                  <div className="grid gap-10 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium">Yang Anda dapatkan</h3>
                      <ul className="mt-4 space-y-3 text-sm text-text-muted">
                        {service.outcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-2.5">
                            <CheckIcon
                              weight="bold"
                              className="mt-1 size-3.5 shrink-0 text-accent-text"
                              aria-hidden
                            />
                            <span className="leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical scope lives here and only here: a visitor on this
                        page has explicitly asked for the detail. */}
                    <div>
                      <h3 className="text-sm font-medium">Cakupan pekerjaan</h3>
                      <ul
                        className={cn(
                          "mt-4 space-y-3 text-sm text-text-muted",
                          "font-mono text-[0.8125rem]",
                        )}
                      >
                        {service.scope.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="rounded-surface border border-border bg-bg-subtle p-8 md:p-12">
            <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Kebutuhan Anda tidak masuk salah satu di atas?
            </h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-text-muted">
              Sebagian project yang kami kerjakan adalah gabungan dari beberapa
              layanan, atau sesuatu yang belum pernah kami kerjakan sebelumnya. Kalau
              masalahnya jelas, biasanya solusinya bisa dirancang.
            </p>
            <Button asChild className="mt-8">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
