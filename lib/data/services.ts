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
      "Pembuatan landing page, company profile, web application, dan dashboard internal yang cepat, responsif, dan mudah dikembangkan.",
    outcomes: [
      "Performa loading cepat di berbagai perangkat",
      "Desain adaptif dan konsisten di segala layar",
      "Struktur kode yang ramah SEO dan mudah dirawat",
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
      "Otomasi alur kerja dan integrasi sistem operasional bisnis untuk meminimalkan beban kerja repetitif. Layanan ini sedang dalam persiapan.",
    outcomes: [
      "Perancangan alur kerja otomatis",
      "Integrasi antar-dashboard operasional",
      "Riset implementasi teknologi cerdas",
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
      "Penyusunan arsitektur server, pipeline rilis otomatis (CI/CD), monitoring performa realtime, dan optimasi efisiensi biaya cloud.",
    outcomes: [
      "Pipeline CI/CD untuk rilis tanpa kendala",
      "Sistem pemantauan server dan mitigasi berkala",
      "Efisiensi dan skalabilitas penggunaan server",
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
      "Template kode, starter kit terstruktur, dan developer toolkit siap pakai untuk mempercepat fase awal pembangunan aplikasi.",
    outcomes: [
      "Inisiasi project dengan tata struktur bersih",
      "Dokumentasi lengkap petunjuk konfigurasi",
      "Pembaruan berkala mengikuti update dependency",
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
