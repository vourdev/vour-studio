"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/data/products";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  onPreviewClick?: (product: Product) => void;
}

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="font-mono text-sm font-semibold text-text">{value}</span>
    <span className="font-mono text-xs text-text-muted">{label}</span>
  </div>
);

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, product, onPreviewClick }, ref) => {
    return (
      <motion.article
        ref={ref}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-surface bg-bg-subtle border border-border shadow-sm",
          className
        )}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Top section with background image and content */}
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={`Pratinjau ${product.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute left-4 top-4">
            <span className="inline-block rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 font-mono text-xs text-white">
              {product.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
            <div className="text-white flex-1">
              <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
              <p className="mt-1 text-sm text-white/90 line-clamp-2">{product.tagline}</p>
            </div>

            {/* Animated button - hidden by default, appears on parent card hover */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {product.status === "available" ? (
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  aria-label={`Lihat detail ${product.name}`}
                  className="shadow-lg whitespace-nowrap"
                >
                  <Link href="/contact">
                    Lihat Live
                    <ArrowUpRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onPreviewClick?.(product)}
                  aria-label={`Pratinjau ${product.name}`}
                  className="shadow-lg whitespace-nowrap"
                >
                  Pratinjau
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom section with product details */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {product.status === "available" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-text">
                  <span className="size-1.5 rounded-full bg-accent-text animate-pulse" />
                  Tersedia
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text-faint">
                  Segera Hadir
                </span>
              )}
            </div>

            {/* Feature count indicator */}
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <CheckIcon className="size-3.5 text-accent-text" weight="bold" />
              <span className="font-mono">{product.features.length} fitur</span>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-border" />

          <div className="flex justify-between gap-4">
            <StatItem
              label="Kategori"
              value={product.category === "Starter Kit" ? "Kit" : product.category.split(" ")[0]}
            />
            <StatItem
              label="Harga"
              value={
                product.status === "available"
                  ? formatPrice(product.price)?.replace(/\s/g, "") || "TBA"
                  : "TBA"
              }
            />
            <StatItem
              label="Status"
              value={product.status === "available" ? "Live" : "Soon"}
            />
          </div>

        </div>
      </motion.article>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
