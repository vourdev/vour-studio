# PROMPT: Build Website VOUR

Gunakan prompt ini di Claude Code, Cursor, atau AI coding tool lain untuk membangun website VOUR dari nol.

---

## 1. Konteks Bisnis (WAJIB dipahami sebelum coding)

VOUR adalah **AI-Powered Product Engineering Studio** — BUKAN freelancer, BUKAN cheap web developer, BUKAN software house tradisional, BUKAN digital agency biasa.

**Target audience utama:** Developer, Startup, UMKM, Agency (sekunder: student, tech enthusiast).

**Positioning yang harus terasa di seluruh website:**
- Pengunjung harus tahu VOUR menerima jasa (web/dashboard/AI automation) dalam < 5 detik.
- Pengunjung harus paham VOUR bukan freelancer/software house biasa dalam < 10 detik.
- Yang dijual adalah **solusi**, bukan teknologi. Next.js/Docker/React tidak boleh jadi selling point di copy — itu hanya alat.

**Tone of voice:** Professional, friendly, helpful, technical, straightforward. Hindari bahasa marketing yang berlebihan.

**Brand feel:** Professional, Modern, Premium, Reliable, Minimal, Technical, Developer-focused.

---

## 2. Tech Stack (SUDAH DIPUTUSKAN — jangan ganti tanpa alasan kuat)

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Hosting | Vercel |
| Database | Turso (libSQL) — hanya untuk leads/contact form & newsletter subscriber |
| ORM | Drizzle ORM (bukan Prisma — dukungan native libSQL lebih baik) |
| Konten Blog/Resources | MDX langsung di repo (git-based, bukan CMS eksternal) |
| Email notifikasi | Resend + React Email |
| File/aset storage | Vercel Blob (tahap awal; migrasi ke Cloudflare R2 kalau traffic/volume aset naik) |
| Animasi | Motion (Framer Motion) + GSAP & ScrollTrigger + Lenis (smooth scroll) |
| Komponen animasi | Magic UI sebagai basis utama; cherry-pick 1–2 komponen dari Aceternity UI dan React Bits untuk "wow moment" spesifik saja |
| Analytics | Vercel Web Analytics |

**Eksplisit TIDAK dibangun saat ini:** Auth/login, admin panel/dashboard, payment gateway. Contact form hanya kirim notifikasi via Resend + simpan log di Turso — tanpa UI admin untuk membacanya.

---

## 3. Prinsip Desain & Animasi (guardrail penting)

- Modern, minimal, premium, developer-first, readable, konsisten.
- Banyak white space, fokus ke konten, CTA jelas.
- **Hindari:** animasi berlebihan, hero yang ramai, warna terlalu banyak, istilah teknis berlebihan di copy.
- Animasi harus **purposeful**, bukan dekoratif: scroll reveal halus, micro-interaction yang menegaskan hierarki informasi, satu "wow moment" di hero — bukan efek berbeda di setiap section.
- Wajib: `prefers-reduced-motion` support, lazy-load komponen animasi per section (dynamic import) supaya bundle awal tetap ringan.
- Optimasi wajib: `next/image`, `next/font`, semantic HTML, accessible (ARIA where needed).

---

## 4. Struktur Website

```
Home
├── Hero
├── Trust Bar
├── Apa yang Bisa Kami Bantu? (bukan "Solutions" — terlalu generik)
├── Mengapa Memilih VOUR?
├── Featured Products
├── Selected Projects
├── Workflow
├── Resources (blog)
├── FAQ
├── CTA
└── Footer

Menu utama: Solutions, Products, Projects, Resources, About, Contact
```

---

## 5. Spesifikasi Konten per Section

### Hero
- Headline: "Jasa Pembuatan Website, Dashboard, dan AI Automation untuk Bisnis Modern."
  (Alternatif: "Bangun Website Profesional dan Workflow AI yang Membantu Bisnis Berkembang.")
- Subheadline: "VOUR adalah AI-Powered Product Engineering Studio yang membantu bisnis membangun website profesional, dashboard internal, workflow AI, serta menyediakan template dan starter kit untuk developer."
- CTA Primary: "Mulai Project" | CTA Secondary: "Lihat Produk"
- Visual: mockup website/dashboard/AI workflow/mobile view — satu "wow moment" animasi di sini boleh lebih ekspresif (kandidat: Aceternity spotlight/aurora atau React Bits background), tapi tetap satu elemen saja, jangan ramai.

### Trust Bar
Placeholder statistik (isi angka riil nanti): "xx+ Projects", "xx+ Templates", "xx+ Happy Clients", atau baris "Modern Technology · Fast Development · Production Ready · Documentation Included".

### Apa yang Bisa Kami Bantu? (4 card)
1. 🌐 Website Development — Landing Page, Company Profile, Web Application, hingga Dashboard yang modern dan responsive. CTA: "Pelajari"
2. 🤖 AI Automation — Workflow AI, n8n Automation, Internal Tools, dan Business Automation untuk meningkatkan produktivitas. CTA: "Pelajari"
3. ☁ Infrastructure & Deployment — Docker, VPS, CI/CD, SSL, Reverse Proxy, Monitoring, dan Deployment Production. CTA: "Pelajari"
4. 🛍 Premium Digital Products — Template, Starter Kit, Component Library, AI Workflow, dan Developer Toolkit. CTA: "Lihat Produk"

### Mengapa Memilih VOUR? (4 card, tanpa CTA)
AI-Powered Development · Modern Tech Stack · Clean Architecture · Documentation — masing-masing 1 kalimat penjelasan singkat.

### Featured Products
Grid card: Preview, Feature, Tech Stack, Price, CTA. Placeholder dulu: Portfolio Template, Landing Page Template, Dashboard Template, Starter Kit.

### Selected Projects
Card portfolio: Thumbnail, Nama Project, Industri, Challenge, Solution, Technology, CTA. Tampilkan hasil yang dicapai, bukan sekadar screenshot.

### Workflow (6 step, gunakan step-connector visual)
Consultation → Planning → Development → Testing → Deployment → Support.

### Resources
Grid/list blog card dari MDX — kategori awal disarankan: Tutorial, Case Study, Dev Notes. Semua konten harus internal-link ke Products/Services terkait.

### FAQ (accordion)
Apakah menerima revisi? · Berapa lama pengerjaan? · Apakah bisa meeting online? · Bagaimana sistem pembayaran? · Apakah menerima project dari luar kota? · Apakah source code diberikan?
(Jawaban belum final — isi placeholder yang jujur, bukan copy generik.)

### CTA (penutup sebelum footer)
Headline: "Punya Ide Produk Digital?" | Subheadline: "Diskusikan kebutuhan project Anda bersama VOUR." | CTA: "Mulai Project" / "Hubungi WhatsApp"

### Footer
Menu: Solutions, Products, Projects, Resources, About, Contact.
Social: GitHub, LinkedIn, Instagram, TikTok.
Contact: WhatsApp, Email.

---

## 6. Copywriting Rules (WAJIB diikuti saat generate copy apa pun)

❌ Jangan sebut teknologi sebagai selling point: "Kami menggunakan Next.js / Docker / React."
✅ Bicara manfaat: "Website modern dengan performa tinggi dan mudah dikembangkan." / "Deployment yang stabil dan mudah dipelihara." / "Antarmuka modern yang cepat dan responsif."

Pengunjung tidak membeli teknologi — mereka membeli solusi. Jelaskan masalah yang diselesaikan, bukan stack yang dipakai.

---

## 7. Skema Data (Turso via Drizzle)

Buat minimal 2 tabel:
- `leads` — id, name, email, whatsapp, message, source_page, created_at
- `newsletter_subscribers` — id, email, subscribed_at

Setiap submit form leads → simpan ke Turso DAN trigger email notifikasi ke internal VOUR via Resend (bukan ke user admin dashboard).

---

## 8. Deliverable yang Diharapkan

1. Next.js project scaffold lengkap dengan struktur folder rapi (`app/`, `components/`, `content/` untuk MDX, `db/` untuk schema Drizzle).
2. Semua section homepage di atas, responsive (mobile-first), accessible.
3. Halaman blog/Resources berbasis MDX dengan minimal 1 contoh post.
4. Contact form terhubung ke Turso + Resend.
5. Dokumentasi singkat (`README.md`) cara menjalankan project & deploy ke Vercel.
6. Tidak ada fitur auth/payment/admin — keep scope minimal sesuai fokus saat ini: membangun traffic.
