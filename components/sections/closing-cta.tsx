import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PRIMARY_CTA, whatsappLink } from "@/lib/site";

/**
 * The closing moment, so a centred composition earns its place here even though
 * every section above is asymmetric.
 *
 * One contact-intent button, using the same label as the nav and the hero.
 * WhatsApp is a channel, presented as a quiet link rather than a second CTA
 * competing for the same click.
 */
export function ClosingCta() {
  return (
    <Section className="relative isolate overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_100%,var(--accent-soft),transparent_70%)]"
      />
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            Punya ide produk digital?
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-5 max-w-[46ch] text-text-muted md:text-lg">
            Diskusikan kebutuhan project Anda bersama VOUR. Konsultasi awal tidak
            dipungut biaya.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-9">
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">{PRIMARY_CTA}</Link>
            </Button>
          </MagneticButton>
        </Reveal>
        <Reveal index={3}>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <WhatsappLogoIcon weight="light" className="size-4" aria-hidden />
            Atau chat langsung lewat WhatsApp
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
