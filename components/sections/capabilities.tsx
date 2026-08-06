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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mt-12 max-w-7xl mx-auto border-y border-border lg:border-y-0">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal
                key={service.slug}
                index={index}
                className={cn(
                  "flex flex-col lg:border-r py-10 relative group/feature border-border",
                  index === 0 && "lg:border-l",
                  index % 2 === 0 ? "md:border-r" : "",
                  index < 2 ? "md:border-b" : "",
                  index < 3 ? "border-b lg:border-b-0" : ""
                )}
              >
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-accent-soft to-transparent pointer-events-none" />

                <div className="mb-4 relative z-10 px-8 text-text-muted group-hover/feature:text-accent transition-colors duration-200">
                  <Icon weight="light" className="size-8" aria-hidden />
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 px-8">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-accent transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-text">
                    {service.title}
                  </span>
                </div>
                <p className="text-sm text-text-muted max-w-xs relative z-10 px-8 leading-relaxed flex-1">
                  {service.summary}
                </p>
                <div className="mt-6 relative z-10 px-8">
                  {service.slug === "ai-automation" ? (
                    <span className="inline-flex items-center text-sm font-medium text-text-faint">
                      {service.ctaLabel}
                    </span>
                  ) : (
                    <Link
                      href={service.ctaHref}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      {service.ctaLabel}
                      <ArrowRightIcon
                        weight="bold"
                        className="size-3.5 transition-transform duration-300 ease-out-expo group-hover/feature:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
