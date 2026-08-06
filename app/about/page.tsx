import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "VOUR adalah AI-Powered Product Engineering Studio. Kami membangun website, dashboard, dan workflow AI yang benar-benar dipakai, bukan sekadar diserahkan.",
  path: "/about",
});

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

/** Roles from VOUR_AI_INSTRUCTIONS.md. TODO(VOUR): add names and photos. */
const team = [
  {
    role: "Product Engineer",
    body: "Frontend, backend, arsitektur, database, dan pengembangan produk.",
  },
  {
    role: "DevOps",
    body: "Server, deployment, pipeline rilis, dan monitoring.",
  },
  {
    role: "UI/UX",
    body: "Design system, riset pengalaman pengguna, branding, dan visual.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <Container>
          <h1 className="max-w-[22ch] text-3xl font-semibold leading-tight tracking-tight text-balance md:text-[2.75rem]">
            Kami membangun produk digital yang benar-benar dipakai
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-text-muted">
            VOUR adalah AI-Powered Product Engineering Studio. Kami bekerja dengan
            bisnis dan developer untuk membangun website, dashboard internal, dan
            workflow AI, serta menyediakan template dan starter kit.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 border-y border-border py-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Misi
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">
              Membantu developer dan bisnis membangun produk digital yang lebih baik,
              lewat template premium, workflow AI, otomasi, dan pengembangan web
              modern.
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
              Visi
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">
              Menjadi salah satu brand developer paling dipercaya di Indonesia untuk
              template, starter kit, workflow AI, dan developer tools.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Cara kami bekerja
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} index={i}>
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-subtle">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Tim</h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-text-muted">
            VOUR dijalankan sebagai tim kecil, dan setiap project ditangani langsung
            oleh orang yang mengerjakannya. Tidak ada lapisan perantara antara Anda
            dan yang menulis kodenya.
          </p>

          {/* Three roles, three cells. TODO(VOUR): add names and photos (400x400). */}
          <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.role} as="li" index={i}>
                <h3 className="font-mono text-sm tracking-tight">{member.role}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                  {member.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
