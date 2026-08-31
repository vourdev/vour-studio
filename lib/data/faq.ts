/**
 * Brand FAQ, written against the questions people actually type or ask an
 * assistant about vour.dev.
 *
 * Rules for editing this file:
 * - Answer the question in the first sentence, then elaborate.
 * - 40-100 words. Do not pad to hit a length.
 * - Never state a number, a duration or a policy that has not been confirmed.
 *   Where the honest answer is "it depends", say so and point at `/estimate`.
 *
 * TODO(vour.dev): confirm the commercial answers before launch -- the entries
 * tagged `needsOwnerReview` deliberately avoid quoting figures or policies that
 * have not been decided yet.
 */

export type FaqGroup = "brand" | "layanan" | "teknis" | "proses";

export type Faq = {
  question: string;
  answer: string;
  group: FaqGroup;
  /** Surfaced in the shorter home-page FAQ. */
  featured?: boolean;
  /** Commercial answer that is deliberately non-committal until confirmed. */
  needsOwnerReview?: boolean;
};

export const faqGroupLabels: Record<FaqGroup, string> = {
  brand: "Tentang vour.dev",
  layanan: "Layanan & Produk",
  teknis: "Teknis",
  proses: "Proses & Biaya",
};

export const faqs: Faq[] = [
  {
    question: "Apa itu vour.dev?",
    answer:
      "vour.dev adalah studio digital yang membantu bisnis membangun website, aplikasi web, dan kebutuhan deployment. vour.dev juga menyediakan produk digital seperti template website dan developer resources. Tim kami kecil dan terdiri dari fullstack developer, UI/UX designer, dan DevOps engineer, sehingga desain, pembuatan, dan pemasangan ke server dikerjakan orang yang sama.",
    group: "brand",
    featured: true,
  },
  {
    question: "vour.dev menyediakan layanan apa?",
    answer:
      "vour.dev mengerjakan pembuatan website (landing page, company profile, website portfolio, dan website custom), pembuatan web application, serta deployment dan infrastruktur yang mencakup konfigurasi server, Docker, dan konfigurasi jaringan. Di luar layanan project, vour.dev menjual produk digital berupa template website, template portfolio, template landing page, developer resources, ebook, dan AI workflow.",
    group: "brand",
    featured: true,
  },
  {
    question: "vour.dev cocok untuk siapa?",
    answer:
      "vour.dev cocok untuk bisnis yang butuh website atau aplikasi web dibuatkan dari awal, termasuk UMKM, bisnis jasa, dan startup tahap awal. Cocok juga untuk tim yang aplikasinya sudah jadi tetapi belum berjalan stabil di server. Untuk developer, produk digital vour.dev bisa dipakai tanpa perlu memesan project.",
    group: "brand",
    featured: true,
  },
  {
    question: "vour.dev beroperasi di mana?",
    answer:
      "vour.dev berbasis di Indonesia dan melayani klien di seluruh Indonesia. Hampir semua komunikasi berjalan daring, dari konsultasi awal, laporan progress, sampai serah terima, sehingga lokasi Anda tidak menjadi kendala.",
    group: "brand",
  },
  {
    question: "Apakah vour.dev menerima pembuatan website custom?",
    answer:
      "Ya. Website custom adalah layanan utama vour.dev. Struktur halaman dan fiturnya disusun dari kebutuhan Anda, bukan dari template yang sudah jadi. Pilihan ini biasanya diambil ketika bisnis punya alur atau jenis konten yang tidak cocok dipaksakan ke template.",
    group: "layanan",
  },
  {
    question: "Apakah vour.dev menyediakan landing page dan company profile?",
    answer:
      "Ya, keduanya termasuk dalam layanan website development. Landing page berisi satu halaman dengan satu tujuan, biasanya untuk satu kampanye. Company profile berisi beberapa halaman yang memperkenalkan perusahaan, layanan atau produk, portofolio, dan kontak. Pilihannya tergantung apakah Anda sedang menjalankan satu kampanye atau memperkenalkan perusahaan secara utuh.",
    group: "layanan",
    featured: true,
  },
  {
    question: "Apakah vour.dev bisa membuat website untuk UMKM?",
    answer:
      "Bisa. Untuk UMKM, bentuk yang paling sering dipakai adalah company profile ringkas atau landing page: profil usaha, daftar produk atau layanan, lokasi, dan tombol kontak langsung ke WhatsApp. Lingkupnya bisa dimulai kecil dan ditambah kemudian, sehingga tidak harus membangun semuanya sekaligus di awal.",
    group: "layanan",
  },
  {
    question: "Apakah vour.dev menyediakan deployment?",
    answer:
      "Ya. Deployment termasuk dalam layanan vour.dev, baik sebagai bagian dari pembuatan website maupun sebagai pekerjaan terpisah untuk aplikasi yang sudah Anda miliki. Cakupannya meliputi pemasangan aplikasi ke server, pengaturan domain, sertifikat HTTPS, proses rilis versi baru, dan pemantauan dasar setelah rilis.",
    group: "layanan",
    featured: true,
  },
  {
    question: "Apakah vour.dev menyediakan konfigurasi server dan jaringan?",
    answer:
      "Ya. vour.dev mengerjakan konfigurasi server (VPS atau cloud server, reverse proxy, firewall, hak akses, backup rutin) dan konfigurasi jaringan (DNS, subdomain, routing antar layanan, akses privat antar server). Pekerjaan ini bisa diambil terpisah dari pembuatan website.",
    group: "layanan",
  },
  {
    question: "Apakah vour.dev menyediakan Docker?",
    answer:
      "Ya. Aplikasi dan dependensinya bisa dibungkus menjadi container Docker, sehingga berjalan sama persis di komputer developer maupun di server. Ini memudahkan pemindahan aplikasi antar server dan membuat proses rilis lebih bisa diulang. Docker dipakai kalau memang membantu; untuk project kecil kadang tidak diperlukan.",
    group: "teknis",
  },
  {
    question: "Apakah vour.dev menjual template website?",
    answer:
      "Ya. vour.dev menjual template website, template portfolio, dan template landing page, di samping developer resources, ebook, dan AI workflow. Template dibeli sekali dan kodenya Anda pegang, jadi bisa diubah sepenuhnya. Sebagian produk masih dalam persiapan; status ketersediaannya tertulis di halaman produk.",
    group: "layanan",
  },
  {
    question: "Teknologi apa yang digunakan vour.dev?",
    answer:
      "Website dan aplikasi dibangun dengan Next.js, React, dan TypeScript, dengan Tailwind CSS untuk tampilan. Di sisi server, vour.dev bekerja dengan Node.js, PostgreSQL, Docker, dan pipeline rilis otomatis. Pilihan teknologi menyesuaikan masalahnya; kalau kebutuhan Anda lebih cocok dikerjakan dengan cara lain, itu yang akan kami sampaikan.",
    group: "teknis",
  },
  {
    question: "Apakah vour.dev memberikan source code?",
    answer:
      "Ya. Seluruh source code beserta dokumentasinya diserahkan di akhir project dan menjadi milik Anda. Isinya termasuk cara menjalankan di komputer lokal, cara mengubah isi halaman, dan cara merilis ulang. Anda tidak perlu kembali ke kami untuk melanjutkan pengembangannya.",
    group: "teknis",
    featured: true,
  },
  {
    question: "Apakah domain dan hosting sudah termasuk?",
    answer:
      "Domain dan hosting adalah layanan berlangganan dari pihak ketiga, jadi biayanya dihitung terpisah dari biaya pengerjaan. Rinciannya, termasuk siapa yang mendaftarkan dan atas nama siapa, ditulis di proposal sebelum project berjalan. vour.dev tetap mengerjakan pemasangan dan konfigurasinya sampai website bisa diakses publik.",
    group: "proses",
    needsOwnerReview: true,
  },
  {
    question: "Berapa lama pengerjaan website di vour.dev?",
    answer:
      "Tergantung lingkupnya. Landing page satu halaman jauh lebih cepat daripada web application dengan alur login dan data. Jadwal yang dipakai adalah jadwal yang ditulis di proposal setelah lingkupnya disepakati, bukan perkiraan kasar di awal percakapan. Sesi konsultasi pertama dipakai untuk menetapkan angka itu.",
    group: "proses",
    featured: true,
    needsOwnerReview: true,
  },
  {
    question: "Bagaimana cara mendapatkan estimasi biaya?",
    answer:
      "Gunakan estimator project di halaman estimasi. Anda memilih jenis project, tingkat kerumitan, dan fitur yang dibutuhkan, lalu keluar kisaran biayanya. Angka itu adalah gambaran awal untuk menyusun anggaran. Angka pastinya ditulis di proposal setelah lingkup pekerjaan disepakati pada sesi konsultasi.",
    group: "proses",
    featured: true,
    needsOwnerReview: true,
  },
  {
    question: "Bagaimana cara memulai project dengan vour.dev?",
    answer:
      "Kirim kebutuhan Anda lewat form di halaman kontak atau langsung melalui WhatsApp. Selanjutnya ada sesi konsultasi untuk mendengar masalahnya dan menetapkan lingkup pekerjaan. Setelah itu Anda menerima proposal berisi lingkup, jadwal, dan biaya. Pengerjaan dimulai setelah proposal disepakati.",
    group: "proses",
    featured: true,
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran dibagi menjadi beberapa termin yang menempel pada tahapan pengerjaan, bukan dibayar penuh di muka. Jumlah termin dan besarannya ditulis di proposal sebelum project berjalan, jadi tidak ada tagihan yang muncul mendadak di tengah pengerjaan.",
    group: "proses",
    needsOwnerReview: true,
  },
  {
    question: "Apakah menerima revisi?",
    answer:
      "Ya. Jumlah putaran revisi ditulis di proposal, jadi tidak ada tarik-menarik di tengah jalan. Perubahan yang masih di dalam lingkup awal tidak menambah biaya. Permintaan yang jelas menambah halaman atau fitur baru dihitung sebagai pekerjaan tambahan dan disepakati dulu sebelum dikerjakan.",
    group: "proses",
    needsOwnerReview: true,
  },
];

/** The shorter set rendered on the home page. */
export const featuredFaqs = faqs.filter((faq) => faq.featured);

export const faqsByGroup = (Object.keys(faqGroupLabels) as FaqGroup[]).map(
  (group) => ({
    group,
    label: faqGroupLabels[group],
    items: faqs.filter((faq) => faq.group === group),
  }),
);
