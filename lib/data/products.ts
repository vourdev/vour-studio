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
      "Untuk developer dan desainer yang butuh portfolio layak dikirim minggu ini juga.",
    features: [
      "Halaman project dengan format studi kasus",
      "Mode gelap dan terang",
      "Judul dan preview link sudah diatur",
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
      "Satu halaman, satu tujuan: pengunjung meninggalkan nomor atau emailnya sebelum menutup tab.",
    features: [
      "Section bisa disusun ulang tanpa merusak layout",
      "Form kontak sudah tersambung, tinggal isi tujuannya",
      "Animasi bisa dimatikan lewat satu pengaturan",
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
      "Tabel, filter, dan grafik yang sudah tertata, tinggal disambungkan ke data Anda.",
    features: [
      "Tabel dengan pencarian, filter, dan urutan kolom",
      "Grafik yang tetap terbaca di mode gelap",
      "Pembagian hak akses per peran pengguna",
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
      "Setup awal yang biasanya makan dua hari, sudah dikerjakan dan diuji lebih dulu.",
    features: [
      "Struktur folder yang konsisten antar-project",
      "Pemeriksa kualitas kode sudah terpasang",
      "Langkah rilis ditulis di README",
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
