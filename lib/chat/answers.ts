/**
 * Every answer the assistant can give, lifted verbatim from the knowledge
 * base. The assistant has no other source: it matches a visitor question to
 * one of these and returns the stored text unchanged, so nothing it says was
 * ever generated.
 *
 * `topic` is the knowledge-base section a pair was filed under. It widens a
 * match when the question shares a topic word but few others.
 *
 * Prices here must agree with `lib/data/estimator.ts`.
 */
export type Answer = { q: string; a: string; topic: string };

export const answers: Answer[] = [
  {
    q: "Apa itu VOUR.dev?",
    a: "VOUR.dev adalah studio digital independen berbasis di Indonesia yang membantu bisnis membangun website, aplikasi web, dan kebutuhan deployment serta infrastruktur digital. VOUR.dev juga menyediakan produk digital seperti website template, ebook, AI workflow, dan developer resources.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "VOUR.dev itu perusahaan apa?",
    a: "VOUR.dev adalah studio digital yang berfokus pada website development, digital products, deployment, dan infrastructure.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "VOUR.dev bergerak di bidang apa?",
    a: "VOUR.dev bergerak di bidang digital development dan digital products, khususnya pembuatan website, aplikasi web, deployment, server, Docker, dan konfigurasi jaringan.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "VOUR.dev berlokasi di mana?",
    a: "VOUR.dev berbasis di Indonesia.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Siapa saja yang ada di VOUR.dev?",
    a: "VOUR.dev dibangun oleh tim kecil yang terdiri dari Fullstack Developer, UI/UX Designer, dan DevOps Engineer.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev agency?",
    a: "VOUR.dev dapat diposisikan sebagai digital studio yang menggabungkan kemampuan UI/UX, development, dan infrastructure dalam satu tim.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev sama dengan v0.dev?",
    a: "Tidak. VOUR.dev adalah studio digital independen berbasis di Indonesia dan tidak berafiliasi dengan v0.dev, v0.app, maupun Vercel.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev milik Vercel?",
    a: "Tidak. VOUR.dev tidak dimiliki atau berafiliasi dengan Vercel.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apa hubungan VOUR.dev dengan v0.dev?",
    a: "Tidak ada hubungan kepemilikan atau afiliasi. VOUR.dev dan v0.dev merupakan entitas yang berbeda dan memiliki fokus yang berbeda.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apa saja layanan VOUR.dev?",
    a: "VOUR.dev menyediakan layanan website development, landing page, company profile, portfolio website, web application, deployment, server configuration, Docker, dan network configuration.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat website?",
    a: "Ya. VOUR.dev melayani pembuatan website custom sesuai kebutuhan bisnis, produk, jasa, UMKM, personal brand, maupun kebutuhan lainnya.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat landing page?",
    a: "Ya. Landing page merupakan salah satu layanan utama VOUR.dev.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat company profile?",
    a: "Ya. VOUR.dev dapat membantu membuat website company profile sesuai kebutuhan bisnis.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat portfolio website?",
    a: "Ya. VOUR.dev dapat membuat website portfolio untuk individu, profesional, maupun bisnis.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat website untuk UMKM?",
    a: "Ya. VOUR.dev dapat membantu UMKM membuat landing page maupun website bisnis sesuai kebutuhan.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev membuat web application?",
    a: "Ya. VOUR.dev dapat mengembangkan web application dan dashboard sesuai scope dan kebutuhan project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev menyediakan deployment?",
    a: "Ya. VOUR.dev dapat membantu proses deployment website dan aplikasi ke environment production.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev menyediakan konfigurasi server?",
    a: "Ya. VOUR.dev menyediakan layanan konfigurasi server sesuai kebutuhan project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev menyediakan Docker?",
    a: "Ya. VOUR.dev dapat membantu konfigurasi dan deployment menggunakan Docker jika dibutuhkan oleh project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah VOUR.dev menyediakan konfigurasi jaringan?",
    a: "Ya. VOUR.dev juga menyediakan layanan konfigurasi jaringan sesuai kebutuhan.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apa itu landing page?",
    a: "Landing page adalah halaman website yang dirancang untuk menyampaikan informasi atau menawarkan produk, jasa, campaign, maupun tujuan tertentu secara fokus.",
    topic: "LANDING PAGE",
  },
  {
    q: "Landing page cocok untuk siapa?",
    a: "Landing page cocok untuk bisnis, UMKM, produk, jasa, personal brand, campaign, event, maupun individu yang membutuhkan halaman promosi yang fokus.",
    topic: "LANDING PAGE",
  },
  {
    q: "Berapa harga landing page VOUR.dev?",
    a: "Paket landing page VOUR.dev saat ini mulai dari Rp1.500.000.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apa yang didapat dari paket landing page Rp1.500.000?",
    a: "Paket mencakup 1 halaman landing page, maksimal 5 section, custom responsive design, SEO basic, integrasi WhatsApp atau social media, hosting VPS VOUR.dev selama 1 tahun, subdomain VOUR.dev, SSL, 1x revisi, deployment, dan source code.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah landing page dibuat custom?",
    a: "Ya. Landing page dibuat sesuai kebutuhan dan materi project client, bukan sekadar menggunakan template siap pakai.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah landing page responsive?",
    a: "Ya. Landing page dibuat responsive untuk desktop, tablet, dan mobile.",
    topic: "LANDING PAGE",
  },
  {
    q: "Berapa maksimal section?",
    a: "Paket landing page dasar mencakup maksimal 5 section dalam satu halaman.",
    topic: "LANDING PAGE",
  },
  {
    q: "Berapa maksimal halaman?",
    a: "Paket landing page hanya mencakup 1 halaman.",
    topic: "LANDING PAGE",
  },
  {
    q: "Berapa kali revisi?",
    a: "Paket landing page mencakup 1x revisi.",
    topic: "LANDING PAGE",
  },
  {
    q: "Berapa lama pengerjaan landing page?",
    a: "Estimasi pengerjaan adalah sekitar 3–5 hari kerja setelah seluruh materi yang dibutuhkan diterima.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah bisa lebih dari 5 section?",
    a: "Kebutuhan di luar scope paket dapat didiskusikan terlebih dahulu dan dapat membutuhkan penyesuaian biaya serta waktu pengerjaan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah bisa membuat landing page dengan desain dari Figma?",
    a: "Bisa. Client dapat memberikan desain atau referensi sebagai acuan. Detail pengerjaan disesuaikan dengan scope project.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah VOUR.dev menyediakan desain?",
    a: "Landing page dapat dibuat dengan desain yang disesuaikan dengan kebutuhan project. Untuk kebutuhan UI/UX yang lebih kompleks, scope dapat didiskusikan terlebih dahulu.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah saya harus menyediakan desain?",
    a: "Tidak selalu. Client dapat memberikan referensi, materi, atau brief. Kebutuhan desain akan dibahas sebelum development.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah copywriting termasuk?",
    a: "Copywriting lengkap bukan bagian dari paket landing page dasar kecuali telah disepakati dalam scope project.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah logo termasuk?",
    a: "Tidak. Client menyediakan logo dan aset brand yang diperlukan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah foto produk termasuk?",
    a: "Tidak. Client menyediakan gambar atau aset visual yang akan digunakan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah hosting termasuk?",
    a: "Ya. Paket landing page mencakup hosting selama 1 tahun melalui infrastructure VPS VOUR.dev.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting menggunakan VPS?",
    a: "Ya. Website landing page dapat di-host pada VPS yang dikelola oleh VOUR.dev.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah setiap client mendapatkan VPS sendiri?",
    a: "Tidak. Hosting menggunakan infrastructure VOUR.dev. Project dikelola pada infrastructure yang sama dengan konfigurasi deployment yang sesuai kebutuhan.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting shared?",
    a: "Infrastruktur VOUR.dev menggunakan VPS yang dapat menjalankan beberapa project. Detail konfigurasi deployment disesuaikan dengan kebutuhan website.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting gratis selamanya?",
    a: "Tidak. Hosting yang termasuk dalam paket berlaku selama 1 tahun.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Berapa biaya hosting setelah 1 tahun?",
    a: "Biaya perpanjangan ditentukan berdasarkan layanan dan kebutuhan hosting yang digunakan. Client akan diinformasikan sebelum masa hosting berakhir.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah domain termasuk?",
    a: "Paket landing page menggunakan subdomain VOUR.dev. Domain custom milik client tidak otomatis termasuk dalam paket.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya mendapatkan domain .com?",
    a: "Tidak. Paket menggunakan subdomain VOUR.dev. Jika client memiliki domain sendiri, domain tersebut dapat digunakan sesuai kebutuhan deployment.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya bisa menggunakan domain sendiri?",
    a: "Bisa. Client dapat menggunakan domain milik sendiri setelah website siap untuk deployment ke domain tersebut.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apa contoh subdomain yang digunakan?",
    a: "Contohnya dapat berupa nama-project.vour.dev, tergantung ketersediaan dan konfigurasi.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah SSL/HTTPS tersedia?",
    a: "Ya. Website yang di-deploy melalui infrastructure VOUR.dev dapat menggunakan SSL/HTTPS.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah website langsung online?",
    a: "Website dapat di-deploy ke subdomain VOUR.dev sehingga client dapat melihat dan melakukan preview secara online.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya bisa melihat website sebelum selesai?",
    a: "Ya. Setelah versi preview tersedia, website dapat diakses secara online melalui subdomain VOUR.dev untuk proses review.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah VOUR.dev membantu deployment ke domain client?",
    a: "Ya, deployment ke domain client dapat dibantu sesuai scope dan konfigurasi yang dibutuhkan.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah source code diberikan?",
    a: "Ya. Source code landing page diberikan kepada client setelah project selesai sesuai ketentuan paket.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah saya memiliki source code website?",
    a: "Ya. Source code diberikan kepada client.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah source code boleh dikembangkan sendiri?",
    a: "Ya. Source code dapat dikembangkan kembali oleh client atau developer lain.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah source code menggunakan framework?",
    a: "Untuk paket landing page entry-level, VOUR.dev memprioritaskan HTML, Tailwind CSS, dan JavaScript agar website tetap ringan dan sederhana.",
    topic: "SOURCE CODE",
  },
  {
    q: "Kenapa tidak menggunakan Next.js?",
    a: "Landing page sederhana tidak selalu membutuhkan framework. HTML, Tailwind CSS, dan JavaScript dapat menghasilkan website yang ringan dan mudah di-deploy.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah bisa menggunakan React atau Next.js?",
    a: "Bisa untuk kebutuhan yang memang memerlukannya. Namun penggunaan framework dapat membutuhkan penyesuaian scope, waktu, dan biaya.",
    topic: "SOURCE CODE",
  },
  {
    q: "Teknologi apa yang digunakan VOUR.dev?",
    a: "Teknologi disesuaikan dengan kebutuhan project. Untuk landing page sederhana, VOUR.dev memprioritaskan HTML, Tailwind CSS, dan JavaScript.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah VOUR.dev menggunakan Next.js?",
    a: "Ya. Next.js dapat digunakan untuk project yang membutuhkan framework React dan kebutuhan yang lebih kompleks.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah VOUR.dev menggunakan React?",
    a: "Ya. React digunakan pada project yang membutuhkan arsitektur berbasis React.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah VOUR.dev menggunakan Tailwind CSS?",
    a: "Ya. Tailwind CSS digunakan untuk membangun interface yang responsive dan konsisten.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah VOUR.dev menggunakan Docker?",
    a: "Ya. Docker dapat digunakan untuk deployment dan environment yang membutuhkan containerization.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Berapa harga jasa VOUR.dev?",
    a: "Harga bergantung pada jenis layanan dan scope project. Untuk landing page, paket dasar saat ini adalah Rp1.500.000.",
    topic: "HARGA",
  },
  {
    q: "Kenapa harga landing page hanya Rp1.500.000?",
    a: "Rp1.500.000 merupakan paket entry-level dengan scope yang dibatasi agar proses pengerjaan tetap efisien. Paket mencakup 1 halaman, maksimal 5 section, 1x revisi, serta hosting dan deployment selama 1 tahun.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga Rp1.500.000 sudah termasuk hosting?",
    a: "Ya. Hosting selama 1 tahun termasuk dalam paket.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga Rp1.500.000 sudah termasuk domain?",
    a: "Paket tidak menyediakan domain custom. Client mendapatkan subdomain VOUR.dev untuk website yang di-host pada infrastructure VOUR.dev.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga sudah termasuk deployment?",
    a: "Ya. Deployment termasuk dalam paket.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga sudah termasuk source code?",
    a: "Ya. Source code diberikan setelah project selesai.",
    topic: "HARGA",
  },
  {
    q: "Apakah ada biaya tambahan?",
    a: "Permintaan di luar scope paket, seperti tambahan halaman, section, fitur khusus, atau kebutuhan teknis tertentu, dapat membutuhkan penawaran dan biaya tambahan.",
    topic: "HARGA",
  },
  {
    q: "Apakah ada biaya bulanan?",
    a: "Paket awal mencakup hosting selama 1 tahun. Setelah periode tersebut, client dapat memilih untuk memperpanjang layanan hosting berdasarkan biaya renewal yang berlaku.",
    topic: "HARGA",
  },
  {
    q: "Apakah revisi unlimited?",
    a: "Tidak. Paket landing page mencakup 1x revisi.",
    topic: "HARGA",
  },
  {
    q: "Berapa kali revisi?",
    a: "Paket landing page mencakup 1x revisi.",
    topic: "REVISI",
  },
  {
    q: "Apa yang dimaksud dengan 1x revisi?",
    a: "Satu kali revisi berarti satu sesi kumpulan perubahan yang masih berada dalam scope awal project.",
    topic: "REVISI",
  },
  {
    q: "Apakah perubahan fitur termasuk revisi?",
    a: "Tidak. Penambahan fitur, halaman, section, atau perubahan scope bukan termasuk revisi biasa dan perlu didiskusikan terlebih dahulu.",
    topic: "REVISI",
  },
  {
    q: "Bagaimana jika saya ingin mengubah seluruh desain?",
    a: "Perubahan besar yang keluar dari scope awal dapat dianggap sebagai perubahan scope dan perlu didiskusikan kembali.",
    topic: "REVISI",
  },
  {
    q: "Apa yang harus saya siapkan?",
    a: "Client sebaiknya menyediakan logo, gambar, copywriting, informasi produk/jasa, kontak, social media, dan referensi desain jika tersedia.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Apakah VOUR.dev menyediakan gambar?",
    a: "Client sebaiknya menyediakan aset visual. Penggunaan aset pihak ketiga harus dipastikan memiliki hak penggunaan yang sesuai.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Apakah VOUR.dev menyediakan copywriting?",
    a: "Copywriting lengkap tidak termasuk dalam paket dasar. Client sebaiknya menyediakan konten yang akan digunakan pada landing page.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Bagaimana jika saya belum memiliki desain?",
    a: "Client dapat memberikan brief atau referensi. Kebutuhan desain akan didiskusikan sebelum development dimulai.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Bagaimana cara memesan landing page?",
    a: "Hubungi VOUR.dev terlebih dahulu untuk mendiskusikan kebutuhan dan memastikan scope project sesuai dengan paket.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Bagaimana proses pengerjaannya?",
    a: "Prosesnya adalah diskusi kebutuhan → menentukan scope → menerima materi → development → preview online → revisi → finalisasi → deployment → source code.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Kapan pengerjaan dimulai?",
    a: "Development dimulai setelah scope disepakati dan seluruh materi yang dibutuhkan telah diterima.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Berapa lama pengerjaan?",
    a: "Untuk paket landing page dasar, estimasi pengerjaan sekitar 3–5 hari kerja setelah seluruh materi diterima.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah bisa selesai 1 hari?",
    a: "Waktu pengerjaan bergantung pada scope dan kesiapan materi. Untuk paket standar, estimasinya sekitar 3–5 hari kerja.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah bisa request deadline tertentu?",
    a: "Bisa didiskusikan terlebih dahulu. Ketersediaan dan kemungkinan percepatan bergantung pada scope dan jadwal pengerjaan.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah cocok untuk UMKM?",
    a: "Ya. Landing page cocok untuk UMKM yang ingin memiliki halaman online untuk memperkenalkan bisnis, produk, jasa, dan kontak.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah cocok untuk personal brand?",
    a: "Ya. Landing page dapat digunakan untuk memperkenalkan profil, layanan, portfolio, social media, atau produk personal brand.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah cocok untuk jualan produk?",
    a: "Ya. Landing page dapat digunakan sebagai halaman promosi produk dan diarahkan ke WhatsApp, marketplace, atau channel penjualan lainnya.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa untuk jasa?",
    a: "Ya. Landing page cocok untuk memperkenalkan layanan dan mengarahkan calon pelanggan ke WhatsApp atau contact channel.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa untuk event?",
    a: "Bisa, selama kebutuhan sesuai dengan scope landing page.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa untuk portfolio?",
    a: "Bisa. Landing page dapat digunakan sebagai portfolio satu halaman.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa integrasi WhatsApp?",
    a: "Ya. Integrasi WhatsApp termasuk dalam paket landing page.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa integrasi Instagram?",
    a: "Social media dapat ditautkan ke landing page sesuai kebutuhan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa integrasi TikTok?",
    a: "Social media dapat ditautkan ke landing page sesuai kebutuhan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan Google Maps?",
    a: "Bisa jika kebutuhan dan implementasinya sesuai dengan scope landing page.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan form?",
    a: "Form sederhana dapat didiskusikan. Form dengan backend, database, email automation, atau integrasi kompleks dapat membutuhkan scope tambahan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan payment gateway?",
    a: "Payment gateway bukan bagian dari paket landing page dasar dan membutuhkan pembahasan scope serta biaya terpisah.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa membuat login?",
    a: "Authentication/login tidak termasuk paket landing page dasar.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa membuat dashboard?",
    a: "Dashboard merupakan kebutuhan web application dan bukan bagian dari paket landing page Rp1.500.000.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menggunakan database?",
    a: "Database bukan bagian dari paket landing page dasar.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa membuat CMS?",
    a: "CMS tidak termasuk dalam paket landing page dasar.",
    topic: "FITUR",
  },
  {
    q: "Apakah SEO termasuk?",
    a: "Ya. Paket landing page mencakup SEO Basic seperti struktur heading, metadata dasar, dan optimasi dasar yang relevan.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah website pasti ranking Google?",
    a: "Tidak ada jaminan ranking. SEO dipengaruhi banyak faktor dan SEO Basic bukan jaminan posisi tertentu di Google.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah website cepat?",
    a: "Website dibuat dengan pendekatan lightweight dan responsive. Performa akhir tetap dipengaruhi oleh aset, gambar, script pihak ketiga, dan kebutuhan website.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah website mobile friendly?",
    a: "Ya. Landing page dibuat responsive untuk berbagai ukuran layar.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah maintenance termasuk?",
    a: "Maintenance dan perubahan konten setelah project selesai tidak termasuk secara otomatis dalam paket dasar.",
    topic: "MAINTENANCE",
  },
  {
    q: "Apakah saya bisa meminta perubahan setelah website selesai?",
    a: "Bisa. Perubahan setelah project selesai dapat didiskusikan sebagai pekerjaan tambahan.",
    topic: "MAINTENANCE",
  },
  {
    q: "Apakah hosting termasuk maintenance?",
    a: "Tidak. Hosting berarti website tetap tersedia di infrastructure. Perubahan desain, konten, atau fitur merupakan pekerjaan maintenance/development terpisah.",
    topic: "MAINTENANCE",
  },
  {
    q: "Siapa yang mengelola hosting?",
    a: "Infrastructure hosting dikelola oleh VOUR.dev selama periode hosting yang termasuk dalam paket.",
    topic: "MAINTENANCE",
  },
  {
    q: "Apakah website menggunakan HTTPS?",
    a: "Ya. Website yang di-deploy melalui infrastructure VOUR.dev menggunakan SSL/HTTPS sesuai konfigurasi deployment.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah website aman?",
    a: "VOUR.dev menerapkan praktik development dan deployment yang sesuai dengan kebutuhan project. Namun tidak ada sistem yang dapat dijamin 100% bebas risiko.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah data saya aman?",
    a: "Keamanan data bergantung pada jenis data dan arsitektur project. Landing page statis biasanya tidak menyimpan data sensitif secara langsung.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah saya harus membeli domain sendiri?",
    a: "Tidak untuk menggunakan subdomain VOUR.dev. Namun jika ingin menggunakan domain seperti namabisnis.com, client perlu memiliki domain tersebut.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah VOUR.dev membeli domain untuk client?",
    a: "Domain custom dapat didiskusikan secara terpisah jika dibutuhkan.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah subdomain VOUR.dev gratis?",
    a: "Subdomain VOUR.dev termasuk dalam paket hosting selama periode layanan yang berlaku.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah saya bisa mendapatkan subdomain sendiri?",
    a: "Ya. Nama subdomain dapat disesuaikan dengan ketersediaan dan aturan deployment VOUR.dev.",
    topic: "DOMAIN",
  },
  {
    q: "Siapa yang memiliki website?",
    a: "Setelah project selesai dan sesuai kesepakatan, source code diberikan kepada client.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah saya bebas menggunakan source code?",
    a: "Ya, client dapat menggunakan dan mengembangkan source code sesuai kesepakatan project.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah VOUR.dev menggunakan template?",
    a: "VOUR.dev dapat menggunakan komponen atau struktur yang telah distandardisasi untuk meningkatkan efisiensi development, tetapi landing page disesuaikan dengan scope dan kebutuhan project.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah website 100% dibuat dari nol?",
    a: "Struktur dan implementasi project dibuat sesuai kebutuhan. Komponen reusable dapat digunakan untuk menjaga efisiensi dan konsistensi development.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Saya ingin membuat landing page, apakah bisa?",
    a: "Bisa. Untuk paket landing page dasar, VOUR.dev menyediakan 1 halaman dengan maksimal 5 section, 1x revisi, hosting 1 tahun, deployment, subdomain VOUR.dev, dan source code dengan harga Rp1.500.000.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya punya budget Rp1.500.000, bisa?",
    a: "Bisa jika kebutuhan Anda sesuai dengan scope paket dasar: 1 halaman, maksimal 5 section, 1x revisi, dan fitur sederhana.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin 10 section, apakah bisa Rp1.500.000?",
    a: "Paket dasar memiliki batas maksimal 5 section. Jika membutuhkan lebih banyak section, silakan diskusikan kebutuhan tersebut untuk mendapatkan penawaran yang sesuai.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin 3 halaman, apakah bisa Rp1.500.000?",
    a: "Paket Rp1.500.000 khusus untuk 1 halaman landing page. Website dengan beberapa halaman membutuhkan scope dan penawaran berbeda.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin payment gateway, apakah bisa Rp1.500.000?",
    a: "Payment gateway tidak termasuk dalam paket landing page dasar. Kebutuhan tersebut perlu didiskusikan karena membutuhkan implementasi dan scope tambahan.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin website toko online, apakah bisa?",
    a: "VOUR.dev dapat membantu kebutuhan web yang lebih kompleks, tetapi toko online bukan bagian dari paket landing page Rp1.500.000. Silakan diskusikan kebutuhan detailnya.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin website seperti website X, bisa?",
    a: "Bisa dibahas. Kirimkan referensi website dan jelaskan bagian yang ingin dibuat. VOUR.dev akan membantu menentukan apakah kebutuhan tersebut sesuai dengan scope landing page.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Kenapa saya harus memilih VOUR.dev?",
    a: "VOUR.dev menggabungkan design, development, dan deployment dalam satu workflow. Client tidak hanya mendapatkan source code, tetapi juga mendapatkan website yang dapat langsung direview secara online.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apa bedanya VOUR.dev dengan jasa landing page lainnya?",
    a: "Salah satu nilai tambah VOUR.dev adalah website dapat langsung di-deploy dan diakses melalui subdomain VOUR.dev untuk preview, selain mendapatkan source code dan hosting selama 1 tahun sesuai paket.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah VOUR.dev hanya menjual website?",
    a: "Tidak. VOUR.dev juga memiliki layanan deployment, server, Docker, konfigurasi jaringan, serta produk digital.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah VOUR.dev murah?",
    a: "VOUR.dev memiliki paket entry-level yang terjangkau untuk landing page sederhana, dengan scope yang jelas agar kualitas dan waktu pengerjaan tetap terkontrol.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah VOUR.dev menjual template?",
    a: "Ya. VOUR.dev juga menyediakan produk digital seperti website template dan developer resources.",
    topic: "PRODUCTS",
  },
  {
    q: "Apa saja produk VOUR.dev?",
    a: "Produk dapat mencakup portfolio template, landing page template, ebook, AI workflow, dan developer resources yang tersedia pada katalog VOUR.dev.",
    topic: "PRODUCTS",
  },
  {
    q: "Apakah template berbeda dengan jasa website?",
    a: "Ya. Template merupakan produk siap pakai yang dapat digunakan atau dikustomisasi oleh pembeli, sedangkan jasa website adalah layanan development custom berdasarkan kebutuhan client.",
    topic: "PRODUCTS",
  },
  {
    q: "Saya tidak ingin membuat website dari nol, apakah ada template?",
    a: "Ya. VOUR.dev menyediakan template website yang dapat digunakan sebagai starting point.",
    topic: "PRODUCTS",
  },
  {
    q: "Bagaimana cara menghubungi VOUR.dev?",
    a: "Gunakan tombol Contact, WhatsApp, atau channel resmi yang tersedia di website VOUR.dev.",
    topic: "CONTACT",
  },
  {
    q: "Bagaimana cara memulai project?",
    a: "Jelaskan jenis website yang ingin dibuat, tujuan website, referensi jika ada, jumlah section yang dibutuhkan, dan fitur yang diinginkan. VOUR.dev kemudian dapat membantu menentukan scope yang sesuai.",
    topic: "CONTACT",
  },
  {
    q: "Informasi apa yang harus saya kirim saat chat?",
    a: "Sebaiknya kirim:",
    topic: "CONTACT",
  },
];
