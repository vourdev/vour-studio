import { ProductBrowser } from "@/components/products/product-browser";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/container";
import { getProducts } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { BookOpenIcon, ShieldCheckIcon, SparkleIcon } from "@phosphor-icons/react/ssr";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Template, starter kit, dan toolkit siap pakai dari Vour untuk developer yang ingin melewati bagian membosankan dan langsung mengerjakan bagian yang penting.",
  path: "/products",
});

/** TODO(Vour): confirm these answers once the first product actually ships. */
const productFaqs = [
  {
    question: "Kapan produknya bisa dibeli?",
    answer:
      "Produk pertama sedang dalam tahap penyelesaian. Halaman ini akan diperbarui begitu tersedia, termasuk harga dan cara pembeliannya.",
  },
  {
    question: "Apakah dapat update setelah membeli?",
    answer:
      "Ya. Setiap produk akan mendapat pembaruan mengikuti versi yang sedang dipakai, tanpa biaya tambahan untuk pembeli sebelumnya.",
  },
  {
    question: "Apakah boleh dipakai untuk project klien?",
    answer:
      "Boleh. Lisensi yang kami rencanakan mengizinkan pemakaian pada project klien. Yang tidak diizinkan adalah menjual ulang produknya sebagai produk Anda sendiri.",
  },
  {
    question: "Bagaimana kalau butuh penyesuaian?",
    answer:
      "Kami menerima pengerjaan penyesuaian di atas produk yang sudah ada, atau membangun sesuatu yang sepenuhnya baru sesuai kebutuhan Anda.",
  },
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Section className="pt-32 pb-0">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Digital Products
            </p>
            <h1 className="mt-3 max-w-[22ch] font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Produk digital & starter kit untuk developer
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted md:text-base">
              Fondasi yang sudah dipasang dan diuji, supaya Anda mulai dari fitur produk utama, bukan dari konfigurasi dasar yang membosankan.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <ProductBrowser products={products} />
        </Container>
      </Section>

      {/* 3-Column Product Guarantee / Highlights Banner */}
      <Section className="border-t border-border bg-bg/50">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Jaminan Kualitas
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Setiap produk dikirim dengan standar produksi
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal index={0}>
              <div className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong">
                <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                  <BookOpenIcon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">Dokumentasi Lengkap</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Setiap template dilengkapi dokumentasi petunjuk konfigurasi, struktur folder, dan panduan customisasi kode.
                </p>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong">
                <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                  <SparkleIcon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">Pembaruan Berkala</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Update gratis secara rutin mengikuti versi framework, library UI, dan dependency versi terbaru tanpa biaya tambahan.
                </p>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="flex h-full flex-col rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong">
                <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                  <ShieldCheckIcon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">Lisensi Komersial</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Bebas digunakan untuk membangun produk komersial sendiri maupun project klien tanpa batasan jumlah deployment.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Redesigned FAQ Section */}
      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              FAQ
            </p>
            <h2 className="mt-3 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Pertanyaan sebelum membeli
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              className="mt-8 max-w-3xl border-t border-border"
            >
              {productFaqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}


