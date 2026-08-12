"use client";

import { CheckIcon, XIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { ProductCard } from "@/components/products/product-card";
import { formatPrice, productCategories, type Product } from "@/lib/data/products";
import { PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>("Semua");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "Semua" || product.category === category;
      const matchesQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [category, query, products]);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
          {productCategories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-mono transition-all",
                category === option
                  ? "border-accent bg-accent text-accent-fg font-semibold shadow-sm"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text bg-bg-subtle",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="md:w-72">
          <Field label="Cari produk" htmlFor="product-search">
            <Input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nama atau kata kunci..."
            />
          </Field>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-surface border border-dashed border-border p-12 text-center">
          <p className="font-semibold text-lg">Tidak ada produk yang cocok</p>
          <p className="mx-auto mt-2 max-w-[42ch] text-sm text-text-muted">
            Coba kata kunci lain, atau ubah kategori ke Semua. Kalau yang Anda cari belum ada, kami bisa membuatkannya khusus.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("Semua");
            }}
            className="mt-6 text-sm font-semibold text-accent-text hover:underline"
          >
            Atur ulang pencarian
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <li key={product.slug} id={product.slug}>
              <ProductCard product={product} onPreviewClick={setSelectedProduct} />
            </li>
          ))}
        </ul>
      )}

      {/* Quick View Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-surface border border-border bg-bg p-6 md:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-border bg-bg-subtle text-text-muted transition-colors hover:text-text"
            >
              <XIcon className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                {selectedProduct.category}
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{selectedProduct.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{selectedProduct.tagline}</p>

            <div className="relative mt-6 aspect-16/9 overflow-hidden rounded-control border border-border">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                Fitur & Spesifikasi
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs text-text-muted">
                {selectedProduct.features.map((f) => (
                  <li key={f} className="flex gap-2 items-center">
                    <CheckIcon className="size-3.5 text-accent-text shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <div>
                <p className="font-mono text-xs text-text-faint">Harga Lisensi</p>
                <p className="font-mono text-lg font-bold text-text">
                  {selectedProduct.status === "available"
                    ? formatPrice(selectedProduct.price)
                    : "Segera Hadir"}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={() => setSelectedProduct(null)}>
                  Tutup
                </Button>
                <Button asChild size="sm">
                  <Link href="/contact">{PRIMARY_CTA}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

