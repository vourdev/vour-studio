import Link from "next/link";

import { Estimator } from "@/components/estimator/estimator";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Berapa Biaya Membuat Website? Hitung Estimasi Project",
  description:
    "Biaya pembuatan website bergantung pada jenis website, jumlah halaman, fitur, dan kebutuhan deployment. Hitung kisarannya dengan estimator project vour.dev.",
  path: "/estimate",
});

/** Rendered visibly below the estimator, and mirrored into `FAQPage` markup. */
const estimateFaqs = [
  {
    question: "Berapa biaya membuat website?",
    answer:
      "Biaya pembuatan website bergantung pada jenis website, jumlah halaman, fitur yang diminta, tingkat kerumitan desain, dan kebutuhan deployment. Landing page satu halaman berada di ujung yang paling ringan; web application dengan alur login dan pengelolaan data berada di ujung sebaliknya. Estimator di halaman ini memberi kisaran awal berdasarkan pilihan Anda.",
  },
  {
    question: "Apakah hasil estimator ini harga final?",
    answer:
      "Bukan. Hasilnya adalah kisaran untuk menyusun anggaran, bukan penawaran resmi. Angka pastinya ditulis di proposal setelah sesi konsultasi, ketika lingkup pekerjaannya sudah jelas: berapa halaman, fitur apa saja, dan siapa yang menyediakan materi seperti teks dan gambar.",
  },
  {
    question: "Apa yang membuat biaya website naik?",
    answer:
      "Tiga hal yang paling sering menaikkan biaya: jumlah halaman unik, fitur yang butuh penyimpanan dan hak akses data (login, pembayaran, pengelolaan konten), dan integrasi dengan sistem lain yang sudah Anda pakai. Desain yang dibuat dari nol juga menambah waktu dibanding penyesuaian di atas struktur yang sudah ada.",
  },
  {
    question: "Berapa biaya membuat website untuk UMKM?",
    answer:
      "Untuk UMKM, lingkup yang paling sering diambil adalah landing page atau company profile ringkas, yang berada di kisaran paling ringan di estimator ini. Lingkupnya bisa dimulai kecil, misalnya profil usaha, daftar produk, dan tombol kontak, lalu ditambah kemudian ketika kebutuhannya sudah lebih jelas.",
  },
];

export default function EstimatePage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Beranda", path: "/" },
      { name: "Estimasi Biaya", path: "/estimate" },
    ]),
    faqJsonLd(estimateFaqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled objects. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="pt-32 md:pt-36">
        <Container>
          <header className="max-w-3xl">
            <h1 className="text-balance font-display text-3xl font-bold leading-[1.15] tracking-tight text-text sm:text-4xl">
              Berapa Biaya Membuat Website?
            </h1>
            <p className="mt-5 max-w-[64ch] text-pretty text-base leading-relaxed text-text-muted md:text-lg">
              Biaya pembuatan website bergantung pada jenis website, jumlah
              halaman, fitur, desain, dan kebutuhan deployment. Untuk memberi
              gambaran awal, pilih kebutuhan Anda di estimator berikut dan
              kisaran biayanya langsung muncul.
            </p>
            <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-text-muted">
              Belum yakin jenis website yang dibutuhkan?{" "}
              <Link
                href="/solutions#website-development"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                Lihat layanan pembuatan website
              </Link>{" "}
              atau{" "}
              <Link
                href="/products"
                className="text-accent-text underline underline-offset-4 hover:no-underline"
              >
                bandingkan dengan template siap pakai
              </Link>
              .
            </p>
          </header>

          <div className="mt-14 md:mt-16">
            <Estimator />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle/40">
        <Container>
          <Reveal>
            <h2 className="max-w-[32ch] text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Pertanyaan seputar biaya pembuatan website
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {estimateFaqs.map((faq, i) => (
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
        </Container>
      </Section>
    </>
  );
}
