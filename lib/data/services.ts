import { PRIMARY_CTA, PRODUCTS_CTA, SERVICE_CTA } from "@/lib/site";

/**
 * The single source of truth for what vour.dev sells.
 *
 * Every surface reads from here -- the home showcase, `/solutions`, `llms.txt`,
 * the `Service` JSON-LD and the sitemap -- so a visitor, a crawler and a
 * language model all get the same list. Adding a service anywhere else is a
 * bug, not a shortcut.
 *
 * Copy rule from the brief: `summary`, `answer` and `outcomes` sell the
 * outcome and never name a technology. `offerings` may be technical, because
 * it renders only on `/solutions`, where a technical buyer has asked for it.
 */

export type ServiceOffering = {
  name: string;
  description: string;
};

export type Service = {
  slug: string;
  /** Category label above the card title. */
  category: string;
  icon: "browsers" | "squares" | "cloud" | "storefront" | "robot";
  title: string;
  /** Question-form heading, matching how the service is actually searched. */
  question: string;
  /** Answers `question` in its first sentence, before any elaboration. */
  answer: string;
  /** One-line card summary for listings. */
  summary: string;
  /** What the client gets back, not what we do. */
  outcomes: string[];
  /** The concrete deliverables inside this service. */
  offerings: ServiceOffering[];
  status: "available" | "soon";
  popular?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    category: "WEBSITE",
    icon: "browsers",
    title: "Website Development",
    question: "Apa saja yang termasuk jasa pembuatan website vour.dev?",
    answer:
      "Jasa pembuatan website vour.dev mencakup landing page, company profile, website portfolio, dan website custom sesuai kebutuhan bisnis. Pengerjaannya dimulai dari perancangan struktur halaman dan tampilan, dilanjutkan pembuatan, lalu pemasangan sampai website bisa diakses publik di domain Anda.",
    summary:
      "Landing page, company profile, website portfolio, dan website custom. Dibuat supaya cepat dibuka, rapi di layar kecil, dan mudah ditambah halaman baru.",
    outcomes: [
      "Halaman terbuka cepat, termasuk di koneksi seluler",
      "Tetap rapi dari layar HP sampai monitor lebar",
      "Isi halaman bisa diubah tanpa menyentuh kode",
      "Source code dan dokumentasinya diserahkan di akhir project",
    ],
    offerings: [
      {
        name: "Landing Page",
        description:
          "Satu halaman dengan satu tujuan, biasanya mengumpulkan kontak atau pendaftaran dari satu kampanye tertentu.",
      },
      {
        name: "Company Profile",
        description:
          "Beberapa halaman yang memperkenalkan perusahaan: profil, layanan atau produk, portofolio, dan kontak.",
      },
      {
        name: "Website Portfolio",
        description:
          "Etalase karya untuk perorangan atau studio, dengan halaman detail per project.",
      },
      {
        name: "Website Custom",
        description:
          "Struktur halaman dan fitur disusun dari kebutuhan Anda, bukan dari template yang sudah jadi.",
      },
    ],
    status: "available",
    popular: true,
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#website-development",
  },
  {
    slug: "web-application",
    category: "WEB APPLICATION",
    icon: "squares",
    title: "Web Application Development",
    question: "Kapan bisnis membutuhkan web application?",
    answer:
      "Bisnis membutuhkan web application ketika pengunjung atau tim tidak cukup hanya membaca halaman, tetapi harus login, mengisi, mengubah, dan melihat data. Contohnya dashboard operasional, panel admin, dan sistem pencatatan internal yang selama ini dikerjakan lewat spreadsheet.",
    summary:
      "Dashboard, panel internal, dan aplikasi web dengan alur login dan data. Untuk pekerjaan yang sudah tidak muat lagi di spreadsheet.",
    outcomes: [
      "Data operasional tercatat di satu tempat, bukan di banyak file",
      "Akses tiap orang dibatasi sesuai perannya",
      "Alur kerja tim dipindahkan apa adanya, bukan dipaksa ikut aplikasi",
      "Fitur bisa ditambah bertahap setelah rilis pertama",
    ],
    offerings: [
      {
        name: "Dashboard Operasional",
        description:
          "Ringkasan angka yang biasa dipantau harian, ditarik langsung dari data yang sudah Anda punya.",
      },
      {
        name: "Panel Admin & Manajemen Data",
        description:
          "Halaman untuk menambah, mengubah, dan menghapus data, lengkap dengan hak akses per peran pengguna.",
      },
      {
        name: "Sistem Internal",
        description:
          "Pencatatan dan alur persetujuan yang selama ini berjalan manual, dipindahkan ke satu aplikasi.",
      },
      {
        name: "Integrasi Sistem",
        description:
          "Menyambungkan aplikasi dengan layanan lain yang sudah Anda pakai lewat API.",
      },
    ],
    status: "available",
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#web-application",
  },
  {
    slug: "deployment-infrastructure",
    category: "DEPLOYMENT",
    icon: "cloud",
    title: "Deployment & Infrastructure",
    question: "Apakah vour.dev menyediakan deployment dan konfigurasi server?",
    answer:
      "Ya. vour.dev mengerjakan deployment, konfigurasi server, Docker, dan konfigurasi jaringan. Layanan ini bisa diambil sebagai bagian dari pembuatan website, atau berdiri sendiri untuk aplikasi yang sudah Anda miliki tetapi belum berjalan stabil di production.",
    summary:
      "Website atau aplikasi dipasang sampai bisa diakses publik: server, domain, sertifikat HTTPS, proses rilis, dan pemantauan.",
    outcomes: [
      "Website bisa diakses publik di domain Anda sendiri",
      "Versi baru bisa dirilis tanpa menurunkan situs",
      "Gangguan ketahuan dari pemantauan, bukan dari laporan pengguna",
      "Cara menjalankan dan merilis ulang ditulis di dokumentasi",
    ],
    offerings: [
      {
        name: "Deployment",
        description:
          "Memindahkan aplikasi dari komputer developer ke server yang bisa diakses publik, termasuk domain dan sertifikat HTTPS.",
      },
      {
        name: "Server Configuration",
        description:
          "Penyiapan VPS atau cloud server: reverse proxy, firewall, hak akses, backup rutin, dan pemantauan pemakaian.",
      },
      {
        name: "Docker",
        description:
          "Aplikasi dan dependensinya dibungkus jadi container, supaya jalan sama persis di komputer developer maupun di server.",
      },
      {
        name: "Network Configuration",
        description:
          "Pengaturan DNS, subdomain, routing antar layanan, dan akses privat antar server.",
      },
    ],
    status: "available",
    ctaLabel: SERVICE_CTA,
    ctaHref: "/solutions#deployment-infrastructure",
  },
  {
    slug: "digital-products",
    category: "PRODUK DIGITAL",
    icon: "storefront",
    title: "Produk Digital",
    question: "Apa saja produk digital vour.dev?",
    answer:
      "Produk digital vour.dev berupa template website, template portfolio, template landing page, developer resources, ebook, dan AI workflow. Semuanya dibeli sekali dan langsung bisa dipakai, tanpa proses pemesanan project.",
    summary:
      "Template dan bahan siap pakai yang sudah melewati tahap setup membosankan, jadi hari pertama Anda dipakai menulis fitur.",
    outcomes: [
      "Struktur folder dan konfigurasi sudah ditata dari awal",
      "Petunjuk pemasangan dan hosting ikut di dalamnya",
      "Bisa diubah sepenuhnya karena kodenya Anda pegang",
      "Diperbarui mengikuti versi dependency terbaru",
    ],
    offerings: [
      {
        name: "Website Template",
        description:
          "Template siap pakai untuk company profile dan website bisnis, tinggal diganti isinya.",
      },
      {
        name: "Portfolio Template",
        description:
          "Template portfolio untuk developer dan desainer, dengan format studi kasus per project.",
      },
      {
        name: "Landing Page Template",
        description:
          "Template satu halaman untuk kampanye, dengan section yang bisa disusun ulang.",
      },
      {
        name: "Developer Resources",
        description:
          "Starter kit, component, dan perkakas yang dirapikan dari project sendiri.",
      },
      {
        name: "Ebook",
        description: "Panduan tertulis seputar pembuatan dan pengelolaan produk digital.",
      },
      {
        name: "AI Workflow",
        description:
          "Rangkaian alur kerja berbantuan AI yang bisa langsung dipasang di perkakas Anda.",
      },
    ],
    status: "available",
    ctaLabel: PRODUCTS_CTA,
    ctaHref: "/products",
  },
  {
    slug: "ai-automation",
    category: "AI & AUTOMATION",
    icon: "robot",
    title: "AI Automation",
    question: "Apakah vour.dev menyediakan AI automation?",
    answer:
      "Belum. AI automation masih kami siapkan dan belum dibuka sebagai layanan berbayar. Kalau kebutuhan Anda ke arah sana, silakan tetap hubungi kami supaya bisa kami kabari saat layanannya dibuka.",
    summary:
      "Menyambungkan sistem yang sudah Anda pakai supaya pekerjaan salin-tempel harian berhenti. Layanan ini masih kami siapkan.",
    outcomes: [
      "Alur kerja berulang dipetakan lalu dijalankan otomatis",
      "Data antar-tool operasional berhenti dicatat dua kali",
      "Uji coba terbatas dulu sebelum dipakai satu tim",
    ],
    offerings: [
      {
        name: "Workflow Automation",
        description: "Alur kerja berulang dijalankan otomatis. Masih dalam persiapan.",
      },
      {
        name: "Systems Integration",
        description:
          "Menyambungkan perkakas operasional yang sudah dipakai. Masih dalam persiapan.",
      },
    ],
    status: "soon",
    ctaLabel: PRIMARY_CTA,
    ctaHref: "/contact?service=ai-automation",
  },
];

/** Services that are actually purchasable today. */
export const availableServices = services.filter((s) => s.status === "available");

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const differentiators = [
  {
    title: "Satu Tim, Satu Tanggung Jawab",
    body: "Desain, pembuatan, dan pemasangan dikerjakan tim yang sama. Tidak ada lempar-lemparan saat ada yang perlu diperbaiki.",
  },
  {
    title: "Lingkup Ditulis di Awal",
    body: "Halaman, fitur, jadwal, dan biaya disepakati sebelum pengerjaan dimulai, jadi tidak ada tambahan mendadak di tengah jalan.",
  },
  {
    title: "Kode Bisa Dilanjutkan",
    body: "Developer lain bisa membaca struktur kode ini tanpa perlu menghubungi kami dulu.",
  },
  {
    title: "Dokumentasi Ikut Diserahkan",
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
