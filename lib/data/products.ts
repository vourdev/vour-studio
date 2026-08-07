/**
 * TODO(Vour): every product below is a placeholder. Prices, feature lists and
 * availability all need real values before launch. `status: "soon"` renders a
 * disabled CTA rather than a dead link.
 */

export type Product = {
  slug: string;
  name: string;
  category: "Template" | "Starter Kit" | "Toolkit";
  tagline: string;
  features: string[];
  /** Rupiah. `null` while pricing is undecided. */
  price: number | null;
  status: "available" | "soon";
  image: string;
};

export const products: Product[] = [
  {
    slug: "portfolio-template",
    name: "Portfolio Template",
    category: "Template",
    tagline:
      "Portfolio siap pakai untuk developer dan desainer yang ingin tampil rapi tanpa membangun dari nol.",
    features: [
      "Halaman project dengan studi kasus",
      "Mode gelap dan terang",
      "Siap ditemukan mesin pencari",
    ],
    price: null,
    status: "soon",
    image: "https://picsum.photos/seed/vour-portfolio-template/800/600",
  },
  {
    slug: "landing-page-template",
    name: "Landing Page Template",
    category: "Template",
    tagline:
      "Landing page yang fokus pada satu tujuan: mengubah pengunjung menjadi calon pelanggan.",
    features: [
      "Section yang bisa disusun ulang",
      "Form kontak yang sudah terhubung",
      "Animasi yang bisa dimatikan",
    ],
    price: null,
    status: "soon",
    image: "https://picsum.photos/seed/vour-landing-template/800/600",
  },
  {
    slug: "dashboard-template",
    name: "Dashboard Template",
    category: "Template",
    tagline:
      "Panel internal dengan tabel, filter, dan grafik yang sudah tertata sejak awal.",
    features: [
      "Tabel dengan pencarian dan filter",
      "Grafik yang terbaca di dua mode warna",
      "Struktur peran pengguna",
    ],
    price: null,
    status: "soon",
    image: "https://picsum.photos/seed/vour-dashboard-template/800/600",
  },
  {
    slug: "starter-kit",
    name: "Developer Starter Kit",
    category: "Starter Kit",
    tagline:
      "Fondasi project yang sudah dipasang dan diuji, supaya Anda mulai dari fitur, bukan dari konfigurasi.",
    features: [
      "Struktur folder yang konsisten",
      "Pengaturan kualitas kode",
      "Dokumentasi cara merilis",
    ],
    price: null,
    status: "soon",
    image: "https://picsum.photos/seed/vour-starter-kit/800/600",
  },
];

export const productCategories = ["Semua", "Template", "Starter Kit", "Toolkit"] as const;

export function formatPrice(price: number | null) {
  if (price === null) return "Segera hadir";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
