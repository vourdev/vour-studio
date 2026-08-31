/**
 * TODO(vour.dev): placeholder case studies. Replace names, industries and results
 * with real engagements, and swap the Picsum seeds for real screenshots.
 *
 * `result` is the headline of each card, not the screenshot. What the client
 * got back is the thing a prospect is actually scanning for.
 */

export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  result: string;
  challenge: string;
  solution: string;
  technology: string[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "arunika-living",
    name: "Arunika Living",
    industry: "Retail furnitur",
    year: "2025",
    result:
      "Calon pembeli membuka katalognya sendiri. Tim penjualan berhenti mengulang jawaban yang sama tiap hari.",
    challenge:
      "Katalog tersebar di beberapa file dan baru dikirim kalau ada yang bertanya. Sebagian besar jam kerja tim penjualan habis untuk itu.",
    solution:
      "Katalog daring dengan pencarian dan filter. Tiap produk punya satu tautan yang bisa langsung dikirim ke calon pembeli.",
    technology: ["Web Application", "Content Management"],
    image: "https://picsum.photos/seed/vour-project-arunika/1200/800",
  },
  {
    slug: "kirana-logistik",
    name: "Kirana Logistik",
    industry: "Logistik",
    year: "2025",
    result:
      "Laporan harian sudah siap sebelum tim masuk kerja, tanpa ada yang menyusunnya pagi itu.",
    challenge:
      "Data pengiriman tercatat di beberapa spreadsheet terpisah. Menyusun laporan makan satu sampai dua jam tiap pagi, dan angkanya sering beda antar cabang.",
    solution:
      "Dashboard internal yang menarik data dari sumber yang sudah dipakai, lalu merangkumnya tiap malam ke satu tampilan yang sama untuk semua cabang.",
    technology: ["Dashboard", "AI Automation"],
    image: "https://picsum.photos/seed/vour-project-kirana/1200/800",
  },
  {
    slug: "sembara-coffee",
    name: "Sembara Coffee",
    industry: "Food and beverage",
    year: "2024",
    result:
      "Pesanan grosir masuk lewat satu jalur yang tercatat, bukan tercecer di beberapa aplikasi chat.",
    challenge:
      "Pesanan datang dari berbagai kanal dan sesekali terlewat. Saat ada selisih, tidak ada satu catatan yang bisa dicek ulang.",
    solution:
      "Halaman pemesanan dengan konfirmasi otomatis, plus notifikasi internal tiap pesanan baru masuk, jadi tidak ada pembeli yang menunggu tanpa jawaban.",
    technology: ["Web Application", "Automation"],
    image: "https://picsum.photos/seed/vour-project-sembara/1600/900",
  },
];
