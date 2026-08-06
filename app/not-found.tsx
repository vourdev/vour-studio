import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Section className="pt-32">
      <Container className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
          404
        </p>
        <h1 className="mt-5 font-mono text-[1.6rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
          Halaman ini tidak ditemukan
        </h1>
        <p className="mt-5 leading-relaxed text-text-muted">
          Tautannya mungkin sudah berubah atau salah ketik. Coba mulai dari beranda,
          atau lihat langsung apa saja yang kami tangani.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Kembali ke beranda</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/solutions">Lihat layanan</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
