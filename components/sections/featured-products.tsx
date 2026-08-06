import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { formatPrice, products } from "@/lib/data/products";
import { PRODUCTS_CTA } from "@/lib/site";

/**
 * Horizontal scroll-snap rail. Native scrolling on every device, so it works
 * with touch, trackpad, keyboard and a screen reader without a drag handler.
 */
export function FeaturedProducts() {
  return (
    <Section id="products">
      <Container className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Produk digital siap pakai
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
        >
          {PRODUCTS_CTA}
          <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
        </Link>
      </Container>

      <div className="mt-10 overflow-x-auto pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max snap-x snap-mandatory gap-4 px-4 md:px-8">
          {products.map((product, i) => (
            <Reveal
              key={product.slug}
              as="li"
              index={i}
              className="w-[78vw] shrink-0 snap-start sm:w-88"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle">
                <div className="relative aspect-3/2 overflow-hidden border-b border-border">
                  {/* TODO(VOUR): real product preview, 800x600. */}
                  <Image
                    src={product.image}
                    alt={`Pratinjau ${product.name}`}
                    fill
                    sizes="(max-width: 640px) 78vw, 22rem"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                    {product.category}
                  </p>
                  <h3 className="mt-3 text-lg font-medium">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {product.tagline}
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-text-muted">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <CheckIcon
                          weight="bold"
                          className="mt-1 size-3.5 shrink-0 text-accent-text"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* One status per card. While a product has no price, the badge
                      says it once; it does not also fill the price slot. */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {product.status === "available" ? (
                      <>
                        {/* TODO(VOUR): real pricing. */}
                        <span className="font-mono text-sm text-text">
                          {formatPrice(product.price)}
                        </span>
                        <Link
                          href={`/products#${product.slug}`}
                          className="text-sm font-medium text-accent-text"
                        >
                          Detail
                        </Link>
                      </>
                    ) : (
                      <span className="rounded-control border border-border px-2.5 py-1 font-mono text-xs text-text-faint">
                        Segera hadir
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
