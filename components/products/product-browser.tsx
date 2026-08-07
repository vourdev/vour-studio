"use client";

import { CheckIcon, EyeIcon, XIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { formatPrice, productCategories, products, type Product } from "@/lib/data/products";
import { PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductBrowser() {
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
  }, [category, query]);

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
              <article className="group flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle transition-all duration-300 hover:border-border-strong hover:shadow-lg">
                {/* Browser Window Frame Header */}
                <div className="border-b border-border bg-bg px-3 py-2 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-500/60" />
                  <span className="size-2 rounded-full bg-yellow-500/60" />
                  <span className="size-2 rounded-full bg-green-500/60" />
                  <span className="ml-2 flex-1 rounded bg-bg-subtle px-2 py-0.5 font-mono text-[0.65rem] text-text-faint truncate">
                    vour.studio/products/{product.slug}
                  </span>
                </div>

                {/* Product Image Preview with Hover Opacity & Centered Eye Icon */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="group/img relative aspect-16/10 cursor-pointer overflow-hidden border-b border-border bg-bg"
                >
                  <Image
                    src={product.image}
                    alt={`Pratinjau ${product.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 group-hover/img:scale-105 group-hover/img:opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/95 backdrop-blur-md px-4 py-2 text-xs font-mono font-medium text-text shadow-lg">
                      <EyeIcon weight="light" className="size-4 text-accent-text" />
                      <span>Pratinjau Detail</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                      {product.category}
                    </span>
                    {product.status === "available" ? (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-accent-text">
                        Tersedia
                      </span>
                    ) : (
                      <span className="rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[0.65rem] text-text-faint">
                        Segera hadir
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-lg font-semibold tracking-tight">{product.name}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-2">
                    {product.tagline}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-text-muted">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <CheckIcon
                          weight="bold"
                          className="mt-0.5 size-3.5 shrink-0 text-accent-text"
                          aria-hidden
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {product.status === "available" ? (
                      <span className="font-mono text-sm font-semibold">{formatPrice(product.price)}</span>
                    ) : (
                      <span className="font-mono text-xs text-text-faint">Fase Finalisasi</span>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs font-mono font-medium text-accent-text hover:underline"
                    >
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              </article>
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

