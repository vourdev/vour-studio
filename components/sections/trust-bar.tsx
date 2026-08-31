import {
  CodeIcon,
  CloudArrowUpIcon,
  DeviceMobileIcon,
  FileTextIcon,
} from "@phosphor-icons/react/ssr";

import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Answers "apa yang saya dapat kalau kerja sama vour.dev?" in four lines,
 * directly under the hero. Every item is a commitment about the deliverable,
 * not a count of past work.
 */
const facts = [
  {
    icon: CodeIcon,
    label: "Source Code Diserahkan",
    description:
      "Seluruh kode dan dokumentasinya menjadi milik Anda di akhir project. Pengembangan berikutnya tidak harus lewat kami.",
  },
  {
    icon: CloudArrowUpIcon,
    label: "Deployment Termasuk",
    description:
      "Website dipasang sampai bisa diakses publik: konfigurasi server, domain, sertifikat HTTPS, dan pemantauan dasar.",
  },
  {
    icon: DeviceMobileIcon,
    label: "Rapi di Semua Layar",
    description:
      "Tampilan diuji dari layar HP sampai monitor lebar, termasuk pada koneksi seluler yang lambat.",
  },
  {
    icon: FileTextIcon,
    label: "Lingkup Ditulis di Awal",
    description:
      "Halaman, fitur, jadwal, dan biaya disepakati sebelum pengerjaan dimulai, jadi tidak ada tambahan di tengah jalan.",
  },
];

export function TrustBar() {
  return (
    <Section className="border-b border-border bg-bg/50">
      <Container>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-surface overflow-hidden bg-bg-subtle">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={cn(
                  "flex flex-col p-6 md:p-7 justify-between",
                  i > 0 ? "border-t border-border" : "",
                  "md:border-t-0",
                  i >= 2 ? "md:border-t md:border-border" : "",
                  i % 2 === 1 ? "md:border-l md:border-border" : "",
                  "lg:border-t-0 lg:border-l-0",
                  i > 0 ? "lg:border-l lg:border-border" : ""
                )}
              >
                <div>
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-bg text-accent-text">
                    <fact.icon weight="light" className="size-5" />
                  </span>
                  <div className="mt-4 font-mono text-xs font-semibold uppercase tracking-wider text-accent-text">
                    {fact.label}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
