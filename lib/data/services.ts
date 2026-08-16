import { PRODUCTS_CTA, SERVICE_CTA } from "@/lib/site";

/**
 * Copy rule from the brief: sell the outcome, never the stack. Nothing in the
 * `summary` fields names a technology. The `scope` arrays exist only for the
 * Solutions page, where a technical buyer has explicitly asked for detail.
 */

export type Service = {
  slug: string;
  icon: "browsers" | "robot" | "cloud" | "storefront";
  title: string;
  summary: string;
  /** Outcomes, not features. Each one is something the client gets back. */
  outcomes: string[];
  /** Shown only on /solutions, under a "Yang kami tangani" heading. */
  scope: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "browsers",
    title: "Website Development",
    summary:
      "Landing page, company profile, web application, sampai dashboard internal. Dibangun supaya cepat dibuka, enak dipakai di layar kecil, dan tidak menyusahkan saat ditambah fitur.",
    outcomes: [
      "Halaman terbuka cepat, termasuk di koneksi seluler",
      "Tetap rapi dari layar HP sampai monitor lebar",
      "Struktur kode yang bisa dilanjutkan developer lain",
    ],
    scope: [
      "Landing page & Campaign page",
      "Company profile",
      "Web application",
      "Dashboard & Panel internal",
    ],
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#website-development",
  },
  {
    slug: "ai-automation",
    icon: "robot",
    title: "AI Automation",
    summary:
      "Menyambungkan sistem yang sudah Anda pakai supaya pekerjaan salin-tempel harian berhenti. Layanan ini masih kami siapkan.",
    outcomes: [
      "Alur kerja berulang dipetakan lalu dijalankan otomatis",
      "Data antar-tool operasional berhenti dicatat dua kali",
      "Uji coba terbatas dulu sebelum dipakai satu tim",
    ],
    scope: [
      "Workflow Automation (Coming Soon)",
      "Process Optimization (Coming Soon)",
      "Systems Integration (Coming Soon)",
    ],
    ctaLabel: "Coming Soon",
    ctaHref: "#",
  },
  {
    slug: "infrastructure",
    icon: "cloud",
    title: "Infrastructure & Deployment",
    summary:
      "Server disiapkan, rilis dijalankan otomatis, sertifikat keamanan dipasang, dan pemakaian dipantau sebelum tagihannya membengkak.",
    outcomes: [
      "Rilis versi baru tanpa menurunkan situs",
      "Gangguan ketahuan dari monitoring, bukan dari laporan pengguna",
      "Biaya server ditinjau ulang, bukan dibiarkan jalan sendiri",
    ],
    scope: [
      "Setup server & Reverse proxy",
      "Pipeline deployment otomatis",
      "Konfigurasi dan sertifikat keamanan",
      "Sistem pemantauan & Backup rutin",
    ],
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#infrastructure",
  },
  {
    slug: "digital-products",
    icon: "storefront",
    title: "Premium Digital Products",
    summary:
      "Template dan starter kit yang sudah melewati tahap setup membosankan, jadi hari pertama Anda dipakai menulis fitur.",
    outcomes: [
      "Struktur folder yang sudah ditata dari awal",
      "Petunjuk konfigurasi dan hosting ikut di dalamnya",
      "Diperbarui mengikuti versi dependency terbaru",
    ],
    scope: [
      "Template & Starter kit",
      "Component library",
      "AI workflow template",
      "Developer toolkit",
    ],
    ctaLabel: PRODUCTS_CTA,
    ctaHref: "/#products",
  },
];

export const differentiators = [
  {
    title: "AI-Powered Development",
    body: "AI kami pakai untuk pekerjaan yang berulang. Keputusan arsitektur dan review kode tetap dipegang orang.",
  },
  {
    title: "Modern Tech Stack",
    body: "Teknologi dipilih karena cocok dengan masalahnya, bukan karena sedang ramai dibicarakan.",
  },
  {
    title: "Clean Architecture",
    body: "Developer lain bisa membaca struktur kode ini tanpa perlu menelepon kami dulu.",
  },
  {
    title: "Documentation",
    body: "Cara menjalankan, mengubah, dan merilis ulang ditulis di repo. Tidak ada langkah yang cuma ada di kepala kami.",
  },
];

export const workflowSteps = [
  {
    title: "Consultation",
    body: "Kami dengar masalahnya sampai selesai, sebelum menyebut solusi apa pun.",
  },
  {
    title: "Planning",
    body: "Lingkup, jadwal, dan biaya ditulis dan disepakati sebelum baris pertama dikerjakan.",
  },
  {
    title: "Development",
    body: "Progress bisa dilihat tiap minggu, jadi tidak ada kejutan di akhir.",
  },
  {
    title: "Testing",
    body: "Dicoba di HP lama, layar lebar, dan koneksi lambat sebelum dinyatakan selesai.",
  },
  {
    title: "Deployment",
    body: "Dipasang di domain Anda, lengkap dengan sertifikat keamanan dan pemantauan.",
  },
  {
    title: "Support",
    body: "Masa pendampingan setelah rilis, saat masalah kecil biasanya baru muncul.",
  },
];
