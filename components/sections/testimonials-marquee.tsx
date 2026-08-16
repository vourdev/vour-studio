import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-utils/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";

const reviews = [
  {
    name: "Ahmad Rizki",
    username: "Founder",
    company: "TechStart Indonesia",
    body: "Website kami selesai sepuluh hari sebelum tenggat, dan revisi terakhir dikerjakan di hari yang sama saat kami minta.",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Sarah Wijaya",
    username: "Operations Manager",
    company: "LogistikPro",
    body: "Laporan harian yang dulu disusun manual sekarang sudah jadi sebelum kami masuk kantor.",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Budi Santoso",
    username: "CTO",
    company: "EduTech Asia",
    body: "Beberapa kali mereka menolak permintaan kami dan menjelaskan alasannya. Belakangan terbukti benar.",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Dewi Lestari",
    username: "Product Manager",
    company: "FinanceApp",
    body: "Seminggu setelah serah terima, tim kami sudah bisa mengubah isi halaman sendiri cuma bermodal dokumentasinya.",
    profile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Agus Pratama",
    username: "CEO",
    company: "RetailHub",
    body: "Halaman produk terbuka jauh lebih cepat dari versi lama. Keluhan soal loading berhenti masuk.",
    profile: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Linda Kusuma",
    username: "Tech Lead",
    company: "CloudSolutions",
    body: "Rilis yang dulu makan waktu setengah hari sekarang selesai sambil kami rapat.",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Andi Setiawan",
    username: "Director",
    company: "MediaKreasi",
    body: "Tiap Jumat ada catatan progress. Kami tidak pernah harus menanyakan kabar project.",
    profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Maya Putri",
    username: "Engineering Manager",
    company: "DataCorp",
    body: "Starter kit-nya memangkas sekitar dua minggu setup di internal tools kami.",
    profile: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Rudi Hermawan",
    username: "Co-Founder",
    company: "StartupHub",
    body: "Mereka menanyakan kenapa fiturnya kami minta, bukan cuma mencatat apa yang diminta.",
    profile: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  profile,
  name,
  username,
  company,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  company: string;
  body: string;
}) => {
  return (
    <Card className="relative h-full w-80 cursor-pointer overflow-hidden border-border bg-bg-subtle shadow-none p-4 transition-colors hover:border-accent/40">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <Image
            className="rounded-full border border-border"
            width={40}
            height={40}
            alt={`${name}'s profile picture`}
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-text">{name}</p>
            <p className="text-xs text-text-faint">
              {username} · {company}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{body}</p>
      </CardContent>
    </Card>
  );
};

export function TestimonialsMarquee() {
  return (
    <Section className="relative border-t border-border">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Kata klien setelah project selesai
            </h2>
            <p className="text-center text-sm text-text-muted md:text-base">
              Beberapa catatan dari bisnis yang pernah bekerja dengan kami.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg"></div>
        </div>
      </Container>
    </Section>
  );
}

export default TestimonialsMarquee;
