import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { formatPrice, type Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

/**
 * Grid mechanic adapted from 21st.dev's Feature Bento by @uilayout.contact.
 * `spanFor` widens the leftover tiles so the final row never ends in a hole.
 */
function spanFor(index: number, total: number) {
  if (total < 4) return "md:col-span-1";
  if (index === 0) return "md:col-span-2 md:row-span-2";
  if (index <= 2) return "md:col-span-1";

  const rest = total - 3;
  const positionInRest = index - 3;
  const remainder = rest % 3;
  const isLastRow = positionInRest >= rest - (remainder || 3);

  if (!isLastRow || remainder === 0) return "md:col-span-1";
  if (remainder === 1) return "md:col-span-3";
  return positionInRest === rest - 1 ? "md:col-span-2" : "md:col-span-1";
}

function columnsFor(total: number) {
  if (total <= 1) return "md:grid-cols-1";
  if (total === 2) return "md:grid-cols-2";
  return "md:grid-cols-3";
}

function Availability({ product }: { product: Product }) {
  if (product.status !== "available") {
    return (
      <span className="font-mono text-xs text-text-faint">Segera hadir</span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-3">
      <span className="font-mono text-sm text-text">{formatPrice(product.price)}</span>
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 text-sm text-accent-text underline-offset-4 hover:underline"
      >
        Ambil produk
        <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
      </Link>
    </span>
  );
}

export function ProductBento({ products }: { products: Product[] }) {
  return (
    <Container>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:auto-rows-[16rem]",
          columnsFor(products.length),
        )}
      >
        {products.map((product, index) => {
          const span = spanFor(index, products.length);
          const isHero = index === 0 && products.length >= 4;
          const isWide = span.includes("col-span-2") && !isHero;

          // Short catalogues give every cell a screenshot; long ones only the large cells.
          const hasImage =
            products.length < 4 ||
            isHero ||
            isWide ||
            span.includes("col-span-3");

          return (
            <Reveal
              key={product.slug}
              index={index}
              className={cn("min-h-[16rem]", span)}
            >
              <article
                id={product.slug}
                className={cn(
                  "group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-surface border border-border",
                  "transition-colors duration-300 hover:border-border-strong",
                  hasImage ? "bg-bg" : "bg-bg-subtle/40",
                )}
              >
                {hasImage && (
                  <>
                    <Image
                      src={product.image}
                      alt={`Pratinjau ${product.name}`}
                      fill
                      sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 100vw"}
                      // LCP candidate.
                      priority={index === 0}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {/* Scrim, not glass: copy must clear WCAG AA over an arbitrary photo. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/25"
                    />
                  </>
                )}

                <div
                  className={cn(
                    "relative flex flex-1 flex-col p-6 md:p-7",
                    hasImage && "justify-end",
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                    {product.category}
                  </span>

                  <h3
                    className={cn(
                      "mt-2 font-semibold tracking-tight text-text",
                      isHero ? "text-2xl md:text-3xl" : "text-lg",
                    )}
                  >
                    {product.name}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 leading-relaxed text-text-muted",
                      isHero ? "max-w-[46ch] text-sm md:text-base" : "text-[13px]",
                    )}
                  >
                    {product.tagline}
                  </p>

                  {isHero && (
                    <ul className="mt-5 space-y-2 text-[13px] text-text-muted">
                      {product.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckIcon
                            weight="bold"
                            className="mt-[0.2rem] size-3 shrink-0 text-accent-text"
                            aria-hidden
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-6">
                    <Availability product={product} />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
