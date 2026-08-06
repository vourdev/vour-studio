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
      "Landing page, company profile, web application, hingga dashboard yang cepat dibuka, rapi di semua ukuran layar, dan mudah dikembangkan saat bisnis Anda tumbuh.",
    outcomes: [
      "Halaman yang terbuka cepat, bahkan di koneksi seluler",
      "Tampilan konsisten dari ponsel sampai layar besar",
      "Struktur yang siap ditemukan mesin pencari",
    ],
    scope: [
      "Landing page dan campaign page",
      "Company profile",
      "Web application",
      "Dashboard dan panel internal",
    ],
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#website-development",
  },
  {
    slug: "ai-automation",
    icon: "robot",
    title: "AI Automation",
    summary:
      "Workflow AI dan otomasi proses untuk memangkas pekerjaan manual yang berulang, sehingga tim Anda bisa fokus pada hal yang benar-benar butuh keputusan manusia.",
    outcomes: [
      "Pekerjaan berulang berjalan tanpa diawasi",
      "Data mengalir otomatis antar tools yang sudah Anda pakai",
      "Waktu tim kembali untuk pekerjaan bernilai tinggi",
    ],
    scope: [
      "Workflow AI untuk operasional harian",
      "Otomasi antar aplikasi",
      "Internal tools",
      "Business process automation",
    ],
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#ai-automation",
  },
  {
    slug: "infrastructure",
    icon: "cloud",
    title: "Infrastructure & Deployment",
    summary:
      "Deployment yang stabil, aman, dan mudah dipelihara. Setiap rilis bisa diulang tanpa drama, dan Anda tahu lebih dulu kalau ada yang bermasalah.",
    outcomes: [
      "Rilis baru tanpa downtime yang terasa pengguna",
      "Peringatan lebih dulu sebelum masalah jadi keluhan",
      "Biaya server yang terukur dan bisa direncanakan",
    ],
    scope: [
      "Setup dan konfigurasi server",
      "Pipeline rilis otomatis",
      "Sertifikat keamanan dan reverse proxy",
      "Monitoring dan backup",
    ],
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#infrastructure",
  },
  {
    slug: "digital-products",
    icon: "storefront",
    title: "Premium Digital Products",
    summary:
      "Template, starter kit, dan toolkit siap pakai untuk developer yang ingin melewati bagian membosankan dan langsung mengerjakan bagian yang penting.",
    outcomes: [
      "Struktur project yang sudah tertata sejak menit pertama",
      "Dokumentasi yang menjelaskan alasan, bukan sekadar langkah",
      "Update mengikuti versi yang sedang dipakai",
    ],
    scope: [
      "Template dan starter kit",
      "Component library",
      "AI workflow siap pakai",
      "Developer toolkit",
    ],
    ctaLabel: PRODUCTS_CTA,
    ctaHref: "/products",
  },
];

export const differentiators = [
  {
    title: "AI-Powered Development",
    body: "Kami memakai AI di dalam proses kerja, bukan sebagai jargon. Hasilnya siklus pengerjaan yang lebih pendek tanpa mengorbankan ketelitian.",
  },
  {
    title: "Modern Tech Stack",
    body: "Pilihan teknologi ditentukan oleh kebutuhan project, bukan tren. Yang penting: cepat dibuka, aman, dan tidak menyulitkan saat ditambah fitur.",
  },
  {
    title: "Clean Architecture",
    body: "Struktur kode yang bisa dibaca developer lain. Anda tidak terkunci pada satu orang untuk melanjutkan pengembangan.",
  },
  {
    title: "Documentation",
    body: "Setiap penyerahan project dilengkapi dokumentasi cara menjalankan, mengubah, dan merilis ulang. Tidak ada bagian yang hanya ada di kepala kami.",
  },
];

export const workflowSteps = [
  {
    title: "Consultation",
    body: "Kami dengarkan masalahnya dulu, bukan langsung menawarkan solusi.",
  },
  {
    title: "Planning",
    body: "Ruang lingkup, jadwal, dan biaya disepakati tertulis sebelum pengerjaan.",
  },
  {
    title: "Development",
    body: "Progress bisa Anda lihat berkala, bukan hanya di akhir.",
  },
  {
    title: "Testing",
    body: "Diuji di berbagai perangkat dan ukuran layar sebelum dianggap selesai.",
  },
  {
    title: "Deployment",
    body: "Rilis ke domain Anda, lengkap dengan pengamanan dasar dan monitoring.",
  },
  {
    title: "Support",
    body: "Masa pendampingan setelah rilis untuk memastikan semuanya berjalan.",
  },
];
