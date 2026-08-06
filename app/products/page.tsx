import { ProductBrowser } from "@/components/products/product-browser";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Template, starter kit, dan toolkit siap pakai dari VOUR untuk developer yang ingin melewati bagian membosankan dan langsung mengerjakan bagian yang penting.",
  path: "/products",
});

/** TODO(VOUR): confirm these answers once the first product actually ships. */
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

export default function ProductsPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <Container>
          <h1 className="max-w-[22ch] font-mono text-[1.6rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            Produk digital untuk developer
          </h1>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-text-muted">
            Fondasi yang sudah dipasang dan diuji, supaya Anda mulai dari fitur, bukan
            dari konfigurasi. Semua produk dilengkapi dokumentasi.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <ProductBrowser />
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Sebelum membeli
          </h2>
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
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
