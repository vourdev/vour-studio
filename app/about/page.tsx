import { CompassIcon, RocketIcon } from "@phosphor-icons/react/ssr";

import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Vour adalah AI-Powered Product Engineering Studio. Kami membangun website, dashboard, dan workflow AI yang benar-benar dipakai, bukan sekadar diserahkan.",
  path: "/about",
});

const stats = [
  { value: "30+", label: "Production Apps", desc: "Berjalan di production klien" },
  { value: "8 Thn", label: "Pengalaman Gabungan", desc: "Membangun produk digital nyata" },
  { value: "2 Mgg", label: "Fase MVP Rilis", desc: "Kick-off hingga versi awal" },
  { value: "100%", label: "Kepemilikan Kode", desc: "Klien pemilik penuh aset" },
];

/** Sourced from VOUR_AI_INSTRUCTIONS.md, not invented. */
const values = [
  {
    title: "Tidak ada pekerjaan yang terbuang",
    body: "Setiap project meninggalkan sesuatu yang bisa dipakai lagi: komponen, dokumentasi, atau pola kerja. Itu sebabnya project berikutnya berjalan lebih cepat.",
  },
  {
    title: "Masalah dulu, solusi kemudian",
    body: "Kami tidak menawarkan apa pun sebelum paham masalahnya. Sering kali yang dibutuhkan lebih kecil dari yang diperkirakan di awal.",
  },
  {
    title: "Tidak bersaing lewat harga termurah",
    body: "Yang kami jaga adalah kualitas, dokumentasi, performa, dan kemudahan dipelihara. Itu yang menentukan biaya sebenarnya sebuah produk digital.",
  },
  {
    title: "AI dipakai untuk menyelesaikan masalah nyata",
    body: "Bukan karena sedang ramai dibicarakan. Kalau sebuah pekerjaan lebih baik dikerjakan manusia, kami katakan sejak awal.",
  },
];

/** Roles from VOUR_AI_INSTRUCTIONS.md. */
const team = [
  {
    role: "Product Engineer",
    initials: "PE",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    body: "Penanganan frontend, backend, arsitektur database, dan pengembangan fitur produk.",
  },
  {
    role: "DevOps & Systems",
    initials: "DO",
    skills: ["Docker", "CI/CD", "Cloud Server", "Nginx"],
    body: "Manajemen server, deployment otomatis, sertifikat keamanan, dan monitoring infrastruktur.",
  },
  {
    role: "UI/UX & Systems",
    initials: "UX",
    skills: ["Figma", "Design System", "Prototyping", "User Flow"],
    body: "Perancangan antarmuka pengguna, visual branding, design system, dan riset pengalaman pengguna.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Studio Overview Hero Section */}
      <Section className="pt-32 pb-8">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Tentang Studio
            </p>
            <h1 className="mt-3 max-w-[26ch] leading-[1.16] font-mono text-[1.8rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
              Kami membangun produk digital yang benar-benar dipakai
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted md:text-base">
              Vour adalah AI-Powered Product Engineering Studio. Kami bekerja dengan bisnis dan developer untuk membangun website, dashboard internal, dan workflow AI, serta menyediakan template dan starter kit teruji.
            </p>
          </Reveal>

          {/* Studio Key Stats Grid */}
          <Reveal delay={0.2} className="mt-12">
            <div className="grid grid-cols-2 gap-4 rounded-surface border border-border bg-bg-subtle p-6 md:grid-cols-4 md:gap-6">
              {stats.map((s, idx) => (
                <div key={idx} className="space-y-1 border-r border-border/40 pr-4 last:border-r-0">
                  <p className="font-mono text-2xl font-bold tracking-tight text-accent-text md:text-3xl">
                    {s.value}
                  </p>
                  <p className="font-mono text-xs font-semibold text-text">{s.label}</p>
                  <p className="text-[0.7rem] text-text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission & Vision Bento Cards */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-9 transition-colors hover:border-border-strong">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                    <RocketIcon weight="light" className="size-5" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                    Misi Studio
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    Mendorong Kualitas Produk Digital
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Membantu developer dan bisnis membangun produk digital yang lebih baik dan bertahan lama, lewat template premium, workflow AI, otomasi, dan pengembangan web modern yang bersih.
                  </p>
                </div>
                <div className="mt-6 border-t border-border/60 pt-4 font-mono text-[0.7rem] text-text-faint">
                  FOCUS: QUALITY & RELIABILITY
                </div>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-surface border border-border bg-bg-subtle p-7 md:p-9 transition-colors hover:border-border-strong">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text mb-4">
                    <CompassIcon weight="light" className="size-5" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                    Visi Studio
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    Brand Terpercaya Developer Indonesia
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Menjadi salah satu brand developer paling dipercaya di Indonesia untuk kebutuhan template produk, starter kit terstruktur, workflow AI, dan developer tools berkualitas tinggi.
                  </p>
                </div>
                <div className="mt-6 border-t border-border/60 pt-4 font-mono text-[0.7rem] text-text-faint">
                  GOAL: TRUSTED DEVELOPER TOOLKIT
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Studio Principles Section */}
      <Section className="pt-0">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              Prinsip Pengerjaan
            </p>
            <h2 className="mt-3 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Cara kami bekerja & mengambil keputusan
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={value.title} index={i}>
                  <div className="group flex h-full gap-4 rounded-surface border border-border bg-bg-subtle p-6 transition-colors hover:border-border-strong md:p-7">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs font-semibold text-text-faint group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg transition-all">
                      {num}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{value.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {value.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Team & Capability Cards Section */}
      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              Struktur Studio
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Tim langsung tanpa perantara
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-text-muted">
              Vour dijalankan sebagai tim kecil yang gesit. Setiap project ditangani langsung oleh engineer yang menulis kodenya tanpa perantara.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.role} as="div" index={i}>
                <div className="group flex h-full flex-col overflow-hidden rounded-surface border border-border bg-bg p-6 transition-all hover:border-border-strong">
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-full border border-border bg-bg-subtle font-mono text-base font-bold text-accent-text group-hover:border-accent group-hover:bg-accent/15 transition-colors">
                      {member.initials}
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.65rem] font-medium text-accent-text">
                      {member.role}
                    </span>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-text-muted">
                    {member.body}
                  </p>

                  <div className="mt-auto pt-6">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-text-faint mb-2">
                      Keahlian Utama:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[0.6rem] text-text-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}


