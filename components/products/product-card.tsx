"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/data/products";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  onPreviewClick?: (product: Product) => void;
}

/**
 * Product tile for the home-page teaser. Shares its visual language with the
 * `/products` bento: image on top, copy on a solid surface below, availability
 * stated as text.
 *
 * Deliberately absent: a category pill floating on the screenshot, a pulsing
 * status dot, and the "Kategori / Harga / Status" strip. The pill sat on top of
 * an image we do not control, the dot conveyed nothing, and the strip repeated
 * what the copy right above it already said.
 */
const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, product, onPreviewClick }, ref) => {
    const isAvailable = product.status === "available";

    return (
      <motion.article
        ref={ref}
        className={cn(
          "group relative flex h-full w-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle/40",
          "transition-colors duration-300 hover:border-border-strong",
          className,
        )}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border">
          <Image
            src={product.image}
            alt={`Pratinjau ${product.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
            {product.category}
          </span>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-text">
            {product.name}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
            {product.tagline}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            {isAvailable ? (
              <>
                <span className="font-mono text-sm text-text">
                  {formatPrice(product.price)}
                </span>
                <Button asChild size="sm" variant="secondary">
                  <Link href="/products">
                    Lihat detail
                    <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <span className="font-mono text-xs text-text-faint">
                  Segera hadir
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPreviewClick?.(product)}
                  aria-label={`Pratinjau ${product.name}`}
                >
                  Pratinjau
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.article>
    );
  },
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
