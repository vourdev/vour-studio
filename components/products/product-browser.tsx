"use client";

import { CheckIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Field, Input } from "@/components/ui/field";
import { formatPrice, productCategories, products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

/**
 * Search and filter over a static in-memory list. There is no product backend
 * yet, and building one for four placeholder items would be premature.
 */
export function ProductBrowser() {
  const [category, setCategory] = useState<string>("Semua");
  const [query, setQuery] = useState("");

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

  // Column count follows the result count, so a filter returning four items
  // renders 2x2 rather than a row of three plus one orphan.
  const gridClass = cn(
    "mt-12 grid gap-6 sm:grid-cols-2",
    filtered.length > 4 && "lg:grid-cols-3",
    filtered.length === 1 && "sm:max-w-md sm:grid-cols-1",
  );

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
                "rounded-control border px-4 py-2 text-sm transition-colors",
                category === option
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text",
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
              placeholder="Nama atau kata kunci"
            />
          </Field>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-surface border border-dashed border-border p-12 text-center">
          <p className="font-medium">Tidak ada produk yang cocok</p>
          <p className="mx-auto mt-2 max-w-[42ch] text-sm text-text-muted">
            Coba kata kunci lain, atau ubah kategori ke Semua. Kalau yang Anda cari
            belum ada, kami bisa membuatkannya khusus.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("Semua");
            }}
            className="mt-6 text-sm font-medium text-accent-text"
          >
            Atur ulang pencarian
          </button>
        </div>
      ) : (
        <ul className={gridClass}>
          {filtered.map((product) => (
            <li key={product.slug} id={product.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg-subtle">
                <div className="relative aspect-3/2 border-b border-border">
                  {/* TODO(VOUR): real product preview, 800x600. */}
                  <Image
                    src={product.image}
                    alt={`Pratinjau ${product.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                    {product.category}
                  </p>
                  <h2 className="mt-3 text-lg font-medium">{product.name}</h2>
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
                  {/* One status per card, matching the homepage rail. */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {product.status === "available" ? (
                      <span className="font-mono text-sm">{formatPrice(product.price)}</span>
                    ) : (
                      <span className="rounded-control border border-border px-2.5 py-1 font-mono text-xs text-text-faint">
                        Segera hadir
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
