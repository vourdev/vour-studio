/**
 * TODO(Vour): placeholder case studies. Replace names, industries and results
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
      "Katalog yang dulu dikirim manual lewat chat kini bisa dibuka sendiri oleh calon pembeli, dan tim penjualan tidak lagi mengulang pertanyaan yang sama.",
    challenge:
      "Katalog produk tersebar di beberapa file dan hanya dikirim manual saat ada yang bertanya. Tim penjualan menghabiskan sebagian besar waktu menjawab pertanyaan yang sama.",
    solution:
      "Katalog daring dengan pencarian dan filter, ditambah halaman detail yang bisa langsung dibagikan sebagai tautan tunggal ke calon pembeli.",
    technology: ["Web Application", "Content Management"],
    image: "https://picsum.photos/seed/vour-project-arunika/1200/800",
  },
  {
    slug: "kirana-logistik",
    name: "Kirana Logistik",
    industry: "Logistik",
    year: "2025",
    result:
      "Laporan harian yang sebelumnya disusun manual tiap pagi sekarang sudah siap sebelum tim masuk kerja.",
    challenge:
      "Data pengiriman dicatat di beberapa spreadsheet terpisah. Menyusun laporan harian memakan waktu satu hingga dua jam setiap pagi dan sering berbeda antar cabang.",
    solution:
      "Dashboard internal yang menarik data dari sumber yang sudah dipakai, lalu merangkumnya otomatis setiap malam ke satu tampilan yang sama untuk semua cabang.",
    technology: ["Dashboard", "AI Automation"],
    image: "https://picsum.photos/seed/vour-project-kirana/1200/800",
  },
  {
    slug: "sembara-coffee",
    name: "Sembara Coffee",
    industry: "Food and beverage",
    year: "2024",
    result:
      "Pemesanan grosir masuk lewat satu jalur yang tercatat rapi, menggantikan pesanan yang sebelumnya tercecer di beberapa aplikasi chat.",
    challenge:
      "Pesanan grosir datang dari berbagai kanal dan sering terlewat. Tidak ada catatan tunggal yang bisa dicek ulang saat terjadi selisih.",
    solution:
      "Halaman pemesanan dengan konfirmasi otomatis, plus notifikasi internal setiap kali pesanan baru masuk sehingga tidak ada yang menunggu tanpa jawaban.",
    technology: ["Web Application", "Automation"],
    image: "https://picsum.photos/seed/vour-project-sembara/1600/900",
  },
];
