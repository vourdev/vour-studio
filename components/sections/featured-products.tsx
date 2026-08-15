"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  PackageIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  productCategories,
  type Product,
} from "@/lib/data/products";
import { PRODUCTS_CTA } from "@/lib/site";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const modalTitleId = useId();

  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [quickViewProduct]);

  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Section id="products" className="relative overflow-hidden border-t border-border">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Produk digital siap pakai
              </h2>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-text-muted">
                Solusi dan komponen teruji untuk mempercepat peluncuran project Anda tanpa mengorbankan kualitas.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-control border border-border bg-bg-subtle px-4 py-2 text-sm font-medium text-text transition-all hover:border-border-strong hover:bg-surface-solid hover:text-accent-text"
            >
              {PRODUCTS_CTA}
              <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <Reveal y={16} className="mt-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
            {productCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-control px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                    isActive
                      ? "border border-accent/40 bg-accent-soft font-semibold text-accent-text shadow-xs"
                      : "border border-transparent text-text-muted hover:border-border hover:bg-bg-subtle hover:text-text"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <Reveal y={24} className="mt-8">
            <div className="flex flex-col items-center justify-center rounded-surface border border-dashed border-border bg-bg-subtle/50 px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-surface-solid text-accent-text">
                <PackageIcon weight="duotone" className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">
                Belum Ada Produk dalam Kategori Ini
              </h3>
              <p className="mt-2 max-w-[42ch] text-sm text-text-muted">
                Produk untuk kategori &ldquo;{activeCategory}&rdquo; sedang dalam tahap persiapan dan akan segera rilis.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("Semua")}
                className="mt-6 rounded-control border border-border bg-bg px-4 py-2 font-mono text-xs font-medium text-text transition-all hover:border-accent hover:text-accent-text"
              >
                Lihat Semua Produk
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <Reveal key={product.slug} y={24} index={i}>
                <ProductCard
                  product={product}
                  onPreviewClick={setQuickViewProduct}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Container>

      {/* Quick View Modal */}
      {quickViewProduct ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overscroll-contain"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-bg/80 backdrop-blur-md transition-opacity"
            onClick={() => setQuickViewProduct(null)}
          />

          {/* Modal Card - Full Flex & Max-Height for Scrollability */}
          <div
            data-lenis-prevent
            className="relative z-10 my-auto flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle shadow-2xl animate-in fade-in zoom-in-95 duration-200 overscroll-contain"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-bg px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-control border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent-text">
                  {quickViewProduct.category}
                </span>
                <span className="font-mono text-xs text-text-faint">
                  / {quickViewProduct.slug}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="rounded-control p-1 text-text-muted transition-colors hover:bg-surface-solid hover:text-text"
                aria-label="Tutup pratinjau"
              >
                <XIcon weight="bold" className="size-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-6 overscroll-contain"
            >
              <div className="relative aspect-16/9 overflow-hidden rounded-surface border border-border">
                <Image
                  src={quickViewProduct.image}
                  alt={`Pratinjau ${quickViewProduct.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
              </div>

              <div className="mt-6">
                <h3 id={modalTitleId} className="text-2xl font-semibold tracking-tight text-text">
                  {quickViewProduct.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {quickViewProduct.tagline}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                  Fitur Unggulan
                </h4>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {quickViewProduct.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-control border border-border bg-bg p-3 text-sm text-text-muted"
                    >
                      <CheckIcon
                        weight="bold"
                        className="mt-0.5 size-4 shrink-0 text-accent-text"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <div>
                  <span className="font-mono text-xs text-text-faint block">Status Produk</span>
                  <span className="mt-1 inline-block font-mono text-sm font-medium text-text">
                    {quickViewProduct.status === "available"
                      ? formatPrice(quickViewProduct.price)
                      : "Segera Hadir"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    Tutup
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={`/products#${quickViewProduct.slug}`}
                      onClick={() => setQuickViewProduct(null)}
                    >
                      {PRODUCTS_CTA}
                      <ArrowRightIcon weight="bold" className="ml-1.5 size-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}



