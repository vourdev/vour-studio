import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { getProducts } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { ESTIMATE_CTA, PRIMARY_CTA } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Produk Digital vour.dev: Template Website, Portfolio, dan Starter Kit",
  description:
    "Template website, template portfolio, template landing page, dan developer resources dari vour.dev. Dibeli sekali, kodenya Anda pegang, bisa diubah sepenuhnya.",
  path: "/products",
});

/**
 * Rendered visibly below the product grid, and mirrored into `FAQPage` markup.
 * Editing one without the other breaks that contract.
 */
const productFaqs = [
  {
    question: "Apa itu website template?",
    answer:
      "Website template adalah kerangka website yang sudah jadi: struktur halaman, tampilan, dan komponennya sudah dibuat, tinggal diganti isinya dengan teks dan gambar Anda. Karena tahap perancangan dan pembuatan awal sudah selesai, waktu sampai website bisa dipakai jauh lebih pendek dibanding membangun dari nol.",
  },
  {
    question: "Apakah website template bisa dikustomisasi?",
    answer:
      "Bisa. Anda menerima source code-nya, jadi warna, teks, gambar, susunan section, sampai penambahan halaman baru semuanya bisa diubah. Batasnya ada pada struktur dasar template: kalau kebutuhan Anda jauh berbeda dari bentuk aslinya, membangun website custom biasanya lebih hemat waktu daripada memaksa template mengikuti.",
  },
  {
    question: "Template atau membuat website dari nol, mana yang cocok?",
    answer:
      "Template cocok kalau kebutuhan Anda mirip bentuk umum, misalnya portfolio, landing page kampanye, atau company profile ringkas, dan Anda mengejar waktu. Website custom cocok kalau ada alur, jenis konten, atau integrasi yang khas untuk bisnis Anda. Kalau ragu, mulai dari estimator biaya untuk membandingkan gambaran keduanya.",
  },
  {
    question: "Apakah template vour.dev butuh kemampuan coding?",
    answer:
      "Untuk mengganti teks dan gambar, kemampuan dasar mengedit file sudah cukup, dan langkahnya ditulis di dokumentasi yang ikut disertakan. Untuk menambah halaman atau fitur baru, dibutuhkan pemahaman dasar pembuatan web. Kalau Anda tidak ingin mengerjakannya sendiri, pemasangan template bisa dijadikan project tersendiri.",
  },
];

export default async function ProductsPage() {
  const products = await getProducts();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Beranda", path: "/" },
      { name: "Produk", path: "/products" },
    ]),
    faqJsonLd(productFaqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled objects. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section spacing="header">
        <Container>
          <Reveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
              Produk Digital
            </span>
            <h1 className="mt-3 max-w-[24ch] text-balance font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Apa Saja Produk Digital vour.dev?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[64ch] text-sm leading-relaxed text-text-muted md:text-base">
              Produk digital vour.dev berupa template website, template
              portfolio, template landing page, developer resources, ebook, dan
              AI workflow. Semuanya dibeli sekali dan langsung bisa dipakai,
              tanpa proses pemesanan project. Source code-nya Anda pegang, jadi
              bisa diubah sepenuhnya.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted">
              Butuh sesuatu yang tidak ada di daftar ini?{" "}
              <Link
                href="/solutions#website-development"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                Lihat layanan pembuatan website custom
              </Link>{" "}
              atau{" "}
              <Link
                href="/estimate"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                hitung estimasi biayanya
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <FeaturedProducts
        products={products}
        heading="Daftar produk"
        description="Status ketersediaan tertulis di tiap kartu. Produk yang masih disiapkan ditandai sebagai segera hadir."
        showAllLink={false}
      />

      <Section className="border-t border-border bg-bg-subtle/40">
        <Container>
          <Reveal>
            <h2 className="max-w-[32ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Pertanyaan seputar template dan produk digital
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {productFaqs.map((faq, i) => (
              <Reveal key={faq.question} index={i}>
                <div className="h-full rounded-surface border border-border bg-bg p-6">
                  <h3 className="text-base font-semibold">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact">{PRIMARY_CTA}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/estimate">{ESTIMATE_CTA}</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
