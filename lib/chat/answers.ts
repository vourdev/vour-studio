/**
 * Answers are returned verbatim; the assistant never generates text.
 * `topic` widens a match when the question shares a topic word. Prices must agree with `lib/data/estimator.ts`.
 */
export type Answer = { q: string; a: string; topic: string };

export const answers: Answer[] = [
  {
    q: "Apa itu vour.dev?",
    a: "vour.dev adalah studio digital independen berbasis di Indonesia yang membantu bisnis membangun website, aplikasi web, dan kebutuhan deployment serta infrastruktur digital. vour.dev juga menyediakan produk digital seperti website template, ebook, AI workflow, dan developer resources.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "vour.dev itu perusahaan apa?",
    a: "vour.dev adalah studio digital yang mengerjakan pembuatan website, deployment, dan infrastruktur, serta menjual produk digital.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "vour.dev bergerak di bidang apa?",
    a: "vour.dev mengerjakan pembuatan website, aplikasi web, deployment, server, Docker, dan konfigurasi jaringan. Selain itu, vour.dev menjual produk digital.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "vour.dev berlokasi di mana?",
    a: "vour.dev berbasis di Indonesia.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Siapa saja yang ada di vour.dev?",
    a: "vour.dev dibangun oleh tim kecil yang terdiri dari Fullstack Developer, UI/UX Designer, dan DevOps Engineer.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah vour.dev agency?",
    a: "Lebih tepat disebut studio kecil. Desain, pembuatan, dan pemasangan ke server dikerjakan satu tim yang sama.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah vour.dev sama dengan v0.dev?",
    a: "Tidak. vour.dev adalah studio digital independen berbasis di Indonesia dan tidak berafiliasi dengan v0.dev, v0.app, maupun Vercel.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apakah vour.dev milik Vercel?",
    a: "Tidak. vour.dev tidak dimiliki atau berafiliasi dengan Vercel.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apa hubungan vour.dev dengan v0.dev?",
    a: "Tidak ada hubungan kepemilikan atau afiliasi. vour.dev dan v0.dev adalah dua pihak yang berbeda.",
    topic: "IDENTITAS VOUR.dev",
  },
  {
    q: "Apa saja layanan vour.dev?",
    a: "vour.dev mengerjakan pembuatan website (landing page, company profile, website portfolio), web application, deployment, konfigurasi server, Docker, dan konfigurasi jaringan.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat website?",
    a: "Ya. vour.dev melayani pembuatan website custom sesuai kebutuhan bisnis, produk, jasa, UMKM, personal brand, maupun kebutuhan lainnya.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat landing page?",
    a: "Ya. Landing page merupakan salah satu layanan utama vour.dev.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat company profile?",
    a: "Ya. vour.dev dapat membantu membuat website company profile sesuai kebutuhan bisnis.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat portfolio website?",
    a: "Ya. vour.dev dapat membuat website portfolio untuk individu, profesional, maupun bisnis.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat website untuk UMKM?",
    a: "Ya. vour.dev dapat membantu UMKM membuat landing page maupun website bisnis sesuai kebutuhan.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev membuat web application?",
    a: "Ya. vour.dev dapat mengembangkan web application dan dashboard sesuai lingkup dan kebutuhan project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev menyediakan deployment?",
    a: "Ya. vour.dev dapat membantu proses deployment website dan aplikasi ke environment production.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev menyediakan konfigurasi server?",
    a: "Ya. vour.dev menyediakan layanan konfigurasi server sesuai kebutuhan project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev menyediakan Docker?",
    a: "Ya. vour.dev dapat membantu konfigurasi dan deployment menggunakan Docker jika dibutuhkan oleh project.",
    topic: "LAYANAN VOUR.dev",
  },
  {
    q: "Apakah vour.dev menyediakan konfigurasi jaringan?",
    a: "Ya. vour.dev juga menyediakan layanan konfigurasi jaringan sesuai kebutuhan.",
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
    q: "Berapa harga landing page vour.dev?",
    a: "Paket landing page vour.dev saat ini mulai dari Rp1.500.000.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apa yang didapat dari paket landing page Rp1.500.000?",
    a: "Paket mencakup 1 halaman landing page, maksimal 5 section, desain custom yang rapi di HP maupun desktop, SEO dasar, integrasi WhatsApp atau media sosial, hosting VPS vour.dev selama 1 tahun, subdomain vour.dev, SSL, 1x revisi, deployment, dan source code.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah landing page dibuat custom?",
    a: "Ya. Landing page disusun dari kebutuhan dan materi Anda, bukan dari template siap pakai.",
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
    a: "Kebutuhan di luar lingkup paket dapat didiskusikan terlebih dahulu dan dapat membutuhkan penyesuaian biaya serta waktu pengerjaan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah bisa membuat landing page dengan desain dari Figma?",
    a: "Bisa. Anda dapat memberikan desain atau referensi sebagai acuan. Detail pengerjaan disesuaikan dengan lingkup project.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah vour.dev menyediakan desain?",
    a: "Landing page dapat dibuat dengan desain yang disesuaikan dengan kebutuhan project. Untuk kebutuhan UI/UX yang lebih kompleks, lingkup dapat didiskusikan terlebih dahulu.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah saya harus menyediakan desain?",
    a: "Tidak selalu. Anda dapat memberikan referensi, materi, atau brief. Kebutuhan desain akan dibahas sebelum pengerjaan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah copywriting termasuk?",
    a: "Copywriting lengkap bukan bagian dari paket landing page dasar kecuali telah disepakati dalam lingkup project.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah logo termasuk?",
    a: "Tidak. Anda menyediakan logo dan aset brand yang diperlukan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah foto produk termasuk?",
    a: "Tidak. Anda menyediakan gambar atau aset visual yang akan digunakan.",
    topic: "LANDING PAGE",
  },
  {
    q: "Apakah hosting termasuk?",
    a: "Ya. Paket landing page mencakup hosting selama 1 tahun melalui infrastruktur VPS vour.dev.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting menggunakan VPS?",
    a: "Ya. Website landing page dapat di-host pada VPS yang dikelola oleh vour.dev.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah setiap client mendapatkan VPS sendiri?",
    a: "Tidak. Hosting menggunakan infrastruktur vour.dev. Project dikelola pada infrastruktur yang sama dengan konfigurasi deployment yang sesuai kebutuhan.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting shared?",
    a: "Infrastruktur vour.dev menggunakan VPS yang dapat menjalankan beberapa project. Detail konfigurasi deployment disesuaikan dengan kebutuhan website.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah hosting gratis selamanya?",
    a: "Tidak. Hosting yang termasuk dalam paket berlaku selama 1 tahun.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Berapa biaya hosting setelah 1 tahun?",
    a: "Biaya perpanjangan ditentukan dari layanan dan kebutuhan hosting yang dipakai. Kami kabari Anda sebelum masa hosting berakhir.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah domain termasuk?",
    a: "Paket landing page menggunakan subdomain vour.dev. Domain custom milik Anda tidak otomatis termasuk dalam paket.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya mendapatkan domain .com?",
    a: "Tidak. Paket menggunakan subdomain vour.dev. Jika Anda memiliki domain sendiri, domain tersebut dapat digunakan sesuai kebutuhan deployment.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya bisa menggunakan domain sendiri?",
    a: "Bisa. Anda dapat menggunakan domain milik sendiri setelah website siap untuk deployment ke domain tersebut.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apa contoh subdomain yang digunakan?",
    a: "Contohnya dapat berupa nama-project.vour.dev, tergantung ketersediaan dan konfigurasi.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah SSL/HTTPS tersedia?",
    a: "Ya. Website yang di-deploy melalui infrastruktur vour.dev dapat menggunakan SSL/HTTPS.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah website langsung online?",
    a: "Website dapat di-deploy ke subdomain vour.dev sehingga Anda dapat melihat dan melakukan preview secara online.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah saya bisa melihat website sebelum selesai?",
    a: "Ya. Setelah versi preview tersedia, website dapat diakses secara online melalui subdomain vour.dev untuk proses review.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah vour.dev membantu deployment ke domain client?",
    a: "Ya, deployment ke domain Anda dapat dibantu sesuai lingkup dan konfigurasi yang dibutuhkan.",
    topic: "HOSTING & DEPLOYMENT",
  },
  {
    q: "Apakah source code diberikan?",
    a: "Ya. Source code landing page diberikan kepada Anda setelah project selesai sesuai ketentuan paket.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah saya memiliki source code website?",
    a: "Ya. Source code diberikan kepada Anda.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah source code boleh dikembangkan sendiri?",
    a: "Ya. Source code dapat dikembangkan kembali oleh Anda atau developer lain.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah source code menggunakan framework?",
    a: "Untuk paket landing page dasar, vour.dev mengutamakan HTML, Tailwind CSS, dan JavaScript agar website tetap ringan dan sederhana.",
    topic: "SOURCE CODE",
  },
  {
    q: "Kenapa tidak menggunakan Next.js?",
    a: "Landing page sederhana tidak selalu membutuhkan framework. HTML, Tailwind CSS, dan JavaScript dapat menghasilkan website yang ringan dan mudah di-deploy.",
    topic: "SOURCE CODE",
  },
  {
    q: "Apakah bisa menggunakan React atau Next.js?",
    a: "Bisa untuk kebutuhan yang memang memerlukannya. Namun penggunaan framework dapat membutuhkan penyesuaian lingkup, waktu, dan biaya.",
    topic: "SOURCE CODE",
  },
  {
    q: "Teknologi apa yang digunakan vour.dev?",
    a: "Teknologi disesuaikan dengan kebutuhan project. Untuk landing page sederhana, vour.dev memprioritaskan HTML, Tailwind CSS, dan JavaScript.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah vour.dev menggunakan Next.js?",
    a: "Ya. Next.js dapat digunakan untuk project yang membutuhkan framework React dan kebutuhan yang lebih kompleks.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah vour.dev menggunakan React?",
    a: "Ya. React digunakan pada project yang membutuhkan arsitektur berbasis React.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah vour.dev menggunakan Tailwind CSS?",
    a: "Ya. Tailwind CSS kami pakai untuk menata tampilan supaya rapi di semua ukuran layar dan konsisten antar-halaman.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Apakah vour.dev menggunakan Docker?",
    a: "Ya. Docker kami pakai untuk deployment kalau aplikasinya perlu dibungkus jadi container.",
    topic: "TEKNOLOGI",
  },
  {
    q: "Berapa harga jasa vour.dev?",
    a: "Harga bergantung pada jenis layanan dan lingkup project. Untuk landing page, paket dasar saat ini adalah Rp1.500.000.",
    topic: "HARGA",
  },
  {
    q: "Kenapa harga landing page hanya Rp1.500.000?",
    a: "Rp1.500.000 adalah paket dasar dengan lingkup yang sengaja dibatasi: 1 halaman, maksimal 5 section, 1x revisi, serta hosting dan deployment selama 1 tahun.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga Rp1.500.000 sudah termasuk hosting?",
    a: "Ya. Hosting selama 1 tahun termasuk dalam paket.",
    topic: "HARGA",
  },
  {
    q: "Apakah harga Rp1.500.000 sudah termasuk domain?",
    a: "Paket tidak menyediakan domain custom. Anda mendapatkan subdomain vour.dev untuk website yang di-host pada infrastruktur vour.dev.",
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
    a: "Permintaan di luar lingkup paket, seperti tambahan halaman, section, fitur khusus, atau kebutuhan teknis tertentu, dapat membutuhkan penawaran dan biaya tambahan.",
    topic: "HARGA",
  },
  {
    q: "Apakah ada biaya bulanan?",
    a: "Paket awal mencakup hosting selama 1 tahun. Setelah itu, Anda bisa memilih memperpanjang hosting dengan biaya perpanjangan yang berlaku.",
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
    a: "Satu kali revisi berarti satu sesi kumpulan perubahan yang masih berada dalam lingkup awal project.",
    topic: "REVISI",
  },
  {
    q: "Apakah perubahan fitur termasuk revisi?",
    a: "Tidak. Penambahan fitur, halaman, section, atau perubahan lingkup bukan termasuk revisi biasa dan perlu didiskusikan terlebih dahulu.",
    topic: "REVISI",
  },
  {
    q: "Bagaimana jika saya ingin mengubah seluruh desain?",
    a: "Perubahan besar yang keluar dari lingkup awal dapat dianggap sebagai perubahan lingkup dan perlu didiskusikan kembali.",
    topic: "REVISI",
  },
  {
    q: "Apa yang harus saya siapkan?",
    a: "Sebaiknya Anda menyiapkan logo, gambar, teks, informasi produk/jasa, kontak, akun media sosial, dan referensi desain jika ada.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Apakah vour.dev menyediakan gambar?",
    a: "Sebaiknya Anda yang menyediakan aset visual. Kalau memakai aset pihak ketiga, pastikan Anda punya hak untuk memakainya.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Apakah vour.dev menyediakan copywriting?",
    a: "Copywriting lengkap tidak termasuk dalam paket dasar. Sebaiknya Anda menyiapkan teks yang akan dipakai di landing page.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Bagaimana jika saya belum memiliki desain?",
    a: "Anda dapat memberikan brief atau referensi. Kebutuhan desain akan didiskusikan sebelum pengerjaan dimulai.",
    topic: "CLIENT MATERIAL",
  },
  {
    q: "Bagaimana cara memesan landing page?",
    a: "Hubungi vour.dev terlebih dahulu untuk mendiskusikan kebutuhan dan memastikan lingkup project sesuai dengan paket.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Bagaimana proses pengerjaannya?",
    a: "Prosesnya: diskusi kebutuhan → menentukan lingkup → menerima materi → pengerjaan → preview online → revisi → finalisasi → deployment → serah terima source code.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Kapan pengerjaan dimulai?",
    a: "Pengerjaan dimulai setelah lingkup disepakati dan seluruh materi yang dibutuhkan telah diterima.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Berapa lama pengerjaan?",
    a: "Untuk paket landing page dasar, estimasi pengerjaan sekitar 3–5 hari kerja setelah seluruh materi diterima.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah bisa selesai 1 hari?",
    a: "Waktu pengerjaan bergantung pada lingkup dan kesiapan materi. Untuk paket standar, estimasinya sekitar 3–5 hari kerja.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah bisa request deadline tertentu?",
    a: "Bisa didiskusikan terlebih dahulu. Ketersediaan dan kemungkinan percepatan bergantung pada lingkup dan jadwal pengerjaan.",
    topic: "PROSES PEMESANAN",
  },
  {
    q: "Apakah cocok untuk UMKM?",
    a: "Ya. Landing page cocok untuk UMKM yang ingin memiliki halaman online untuk memperkenalkan bisnis, produk, jasa, dan kontak.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah cocok untuk personal brand?",
    a: "Ya. Landing page dapat digunakan untuk memperkenalkan profil, layanan, portfolio, media sosial, atau produk personal brand.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah cocok untuk jualan produk?",
    a: "Ya. Landing page dapat digunakan sebagai halaman promosi produk dan diarahkan ke WhatsApp, marketplace, atau kanal penjualan lainnya.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa untuk jasa?",
    a: "Ya. Landing page cocok untuk memperkenalkan layanan dan mengarahkan calon pelanggan ke WhatsApp atau kontak lainnya.",
    topic: "LANDING PAGE USE CASE",
  },
  {
    q: "Apakah bisa untuk event?",
    a: "Bisa, selama kebutuhan sesuai dengan lingkup landing page.",
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
    a: "Akun media sosial dapat ditautkan ke landing page sesuai kebutuhan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa integrasi TikTok?",
    a: "Akun media sosial dapat ditautkan ke landing page sesuai kebutuhan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan Google Maps?",
    a: "Bisa jika kebutuhan dan implementasinya sesuai dengan lingkup landing page.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan form?",
    a: "Form sederhana dapat didiskusikan. Form dengan backend, database, email automation, atau integrasi kompleks dapat membutuhkan lingkup tambahan.",
    topic: "FITUR",
  },
  {
    q: "Apakah bisa menambahkan payment gateway?",
    a: "Payment gateway bukan bagian dari paket landing page dasar dan membutuhkan pembahasan lingkup serta biaya terpisah.",
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
    a: "Ya. Paket landing page mencakup SEO dasar seperti struktur heading, metadata dasar, dan optimasi dasar yang relevan.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah website pasti ranking Google?",
    a: "Tidak ada jaminan ranking. SEO dipengaruhi banyak faktor dan SEO dasar bukan jaminan posisi tertentu di Google.",
    topic: "SEO & PERFORMANCE",
  },
  {
    q: "Apakah website cepat?",
    a: "Website dibuat seringan mungkin dan rapi di semua ukuran layar. Kecepatan akhirnya tetap dipengaruhi oleh aset, gambar, script pihak ketiga, dan kebutuhan website.",
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
    a: "Tidak. Hosting berarti website tetap bisa diakses. Perubahan desain, konten, atau fitur adalah pekerjaan pemeliharaan atau pengembangan terpisah.",
    topic: "MAINTENANCE",
  },
  {
    q: "Siapa yang mengelola hosting?",
    a: "Server hosting dikelola oleh vour.dev selama periode hosting yang termasuk dalam paket.",
    topic: "MAINTENANCE",
  },
  {
    q: "Apakah website menggunakan HTTPS?",
    a: "Ya. Website yang di-deploy melalui infrastruktur vour.dev menggunakan SSL/HTTPS sesuai konfigurasi deployment.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah website aman?",
    a: "Pengamanan disesuaikan dengan kebutuhan project, dari cara kode ditulis sampai cara website dipasang di server. Tetapi tidak ada sistem yang bisa dijamin 100% bebas risiko.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah data saya aman?",
    a: "Keamanan data bergantung pada jenis data dan arsitektur project. Landing page statis biasanya tidak menyimpan data sensitif secara langsung.",
    topic: "KEAMANAN",
  },
  {
    q: "Apakah saya harus membeli domain sendiri?",
    a: "Tidak untuk menggunakan subdomain vour.dev. Namun jika ingin menggunakan domain seperti namabisnis.com, Anda perlu memiliki domain tersebut.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah vour.dev membeli domain untuk client?",
    a: "Domain custom dapat didiskusikan secara terpisah jika dibutuhkan.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah subdomain vour.dev gratis?",
    a: "Subdomain vour.dev termasuk dalam paket hosting selama periode layanan yang berlaku.",
    topic: "DOMAIN",
  },
  {
    q: "Apakah saya bisa mendapatkan subdomain sendiri?",
    a: "Ya. Nama subdomain dapat disesuaikan dengan ketersediaan dan aturan deployment vour.dev.",
    topic: "DOMAIN",
  },
  {
    q: "Siapa yang memiliki website?",
    a: "Setelah project selesai dan sesuai kesepakatan, source code diberikan kepada Anda.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah saya bebas menggunakan source code?",
    a: "Ya, Anda dapat menggunakan dan mengembangkan source code sesuai kesepakatan project.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah vour.dev menggunakan template?",
    a: "vour.dev bisa memakai komponen atau struktur yang sudah dibakukan supaya pengerjaan lebih cepat, tetapi landing page tetap disesuaikan dengan lingkup dan kebutuhan project.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Apakah website 100% dibuat dari nol?",
    a: "Struktur project dibuat sesuai kebutuhan. Komponen yang bisa dipakai ulang membantu pengerjaan lebih cepat dan tampilannya konsisten.",
    topic: "SOURCE CODE & OWNERSHIP",
  },
  {
    q: "Saya ingin membuat landing page, apakah bisa?",
    a: "Bisa. Untuk paket landing page dasar, vour.dev menyediakan 1 halaman dengan maksimal 5 section, 1x revisi, hosting 1 tahun, deployment, subdomain vour.dev, dan source code dengan harga Rp1.500.000.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya punya budget Rp1.500.000, bisa?",
    a: "Bisa jika kebutuhan Anda sesuai dengan lingkup paket dasar: 1 halaman, maksimal 5 section, 1x revisi, dan fitur sederhana.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin 10 section, apakah bisa Rp1.500.000?",
    a: "Paket dasar memiliki batas maksimal 5 section. Jika membutuhkan lebih banyak section, silakan diskusikan kebutuhan tersebut untuk mendapatkan penawaran yang sesuai.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin 3 halaman, apakah bisa Rp1.500.000?",
    a: "Paket Rp1.500.000 khusus untuk 1 halaman landing page. Website dengan beberapa halaman membutuhkan lingkup dan penawaran berbeda.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin payment gateway, apakah bisa Rp1.500.000?",
    a: "Payment gateway tidak termasuk dalam paket landing page dasar. Kebutuhan tersebut perlu didiskusikan karena membutuhkan implementasi dan lingkup tambahan.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin website toko online, apakah bisa?",
    a: "vour.dev dapat membantu kebutuhan web yang lebih kompleks, tetapi toko online bukan bagian dari paket landing page Rp1.500.000. Silakan diskusikan kebutuhan detailnya.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Saya ingin website seperti website X, bisa?",
    a: "Bisa dibahas. Kirimkan referensi website dan jelaskan bagian yang ingin dibuat. vour.dev akan membantu menentukan apakah kebutuhan tersebut sesuai dengan lingkup landing page.",
    topic: "WHATSAPP LEAD QUALIFICATION",
  },
  {
    q: "Kenapa saya harus memilih vour.dev?",
    a: "Desain, pembuatan, dan deployment dikerjakan satu tim yang sama. Selain source code, Anda mendapat website yang sudah online dan bisa langsung Anda periksa.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apa bedanya vour.dev dengan jasa landing page lainnya?",
    a: "Website Anda langsung di-deploy ke subdomain vour.dev, jadi bisa dicek online sebelum selesai. Source code dan hosting selama 1 tahun juga sudah termasuk dalam paket.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah vour.dev hanya menjual website?",
    a: "Tidak. vour.dev juga memiliki layanan deployment, server, Docker, konfigurasi jaringan, serta produk digital.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah vour.dev murah?",
    a: "Untuk landing page sederhana ada paket dasar Rp1.500.000. Lingkupnya dibatasi dengan jelas supaya kualitas dan waktu pengerjaannya terjaga.",
    topic: "OBJECTION HANDLING",
  },
  {
    q: "Apakah vour.dev menjual template?",
    a: "Ya. vour.dev juga menyediakan produk digital seperti website template dan developer resources.",
    topic: "PRODUCTS",
  },
  {
    q: "Apa saja produk vour.dev?",
    a: "Produknya antara lain template portfolio, template landing page, ebook, AI workflow, dan developer resources. Daftar lengkapnya ada di halaman Produk.",
    topic: "PRODUCTS",
  },
  {
    q: "Apakah template berbeda dengan jasa website?",
    a: "Ya. Template adalah produk siap pakai yang bisa langsung dipakai atau diubah oleh pembeli, sedangkan jasa website berarti website dibuat khusus dari kebutuhan Anda.",
    topic: "PRODUCTS",
  },
  {
    q: "Saya tidak ingin membuat website dari nol, apakah ada template?",
    a: "Ya. vour.dev menyediakan template website yang bisa dipakai sebagai titik awal.",
    topic: "PRODUCTS",
  },
  {
    q: "Bagaimana cara menghubungi vour.dev?",
    a: "Lewat halaman Kontak, WhatsApp, atau email yang tercantum di website vour.dev.",
    topic: "CONTACT",
  },
  {
    q: "Bagaimana cara memulai project?",
    a: "Jelaskan jenis website yang ingin dibuat, tujuan website, referensi jika ada, jumlah section yang dibutuhkan, dan fitur yang diinginkan. vour.dev kemudian dapat membantu menentukan lingkup yang sesuai.",
    topic: "CONTACT",
  },
  {
    q: "Informasi apa yang harus saya kirim saat chat?",
    a: "Jelaskan jenis website yang ingin dibuat, tujuannya, referensi jika ada, dan fitur yang diinginkan. Dari situ kami bantu menentukan lingkup yang sesuai.",
    topic: "CONTACT",
  },
];
