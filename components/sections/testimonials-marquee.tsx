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
    body: "Pengalaman kerja sama dengan Vour sangat memuaskan. Website kami selesai lebih cepat dari deadline, dan hasil akhirnya melebihi ekspektasi.",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Sarah Wijaya",
    username: "Operations Manager",
    company: "LogistikPro",
    body: "Dashboard internal yang dibangun Vour membantu tim kami mengelola operasional dengan lebih efisien. Strukturnya rapi dan mudah dikembangkan.",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Budi Santoso",
    username: "CTO",
    company: "EduTech Asia",
    body: "Tim Vour sangat responsif dan profesional. Mereka tidak hanya mengerjakan apa yang diminta, tapi juga memberikan saran teknis yang valuable.",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Dewi Lestari",
    username: "Product Manager",
    company: "FinanceApp",
    body: "Dokumentasi lengkap dan pendampingan pasca-launch sangat membantu tim internal kami untuk maintain website sendiri. Highly recommended!",
    profile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Agus Pratama",
    username: "CEO",
    company: "RetailHub",
    body: "Kualitas kode yang rapi dan performa loading yang cepat membuat website kami mendapat feedback positif dari user. Worth every penny.",
    profile: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Linda Kusuma",
    username: "Tech Lead",
    company: "CloudSolutions",
    body: "Setup infrastructure dan CI/CD yang dikerjakan Vour membuat deployment jadi jauh lebih smooth. No more manual deployment headaches.",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Andi Setiawan",
    username: "Director",
    company: "MediaKreasi",
    body: "Dari konsultasi awal sampai rilis, prosesnya transparan dan terstruktur. Update progress rutin membuat kami selalu tahu posisi project.",
    profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Maya Putri",
    username: "Engineering Manager",
    company: "DataCorp",
    body: "Template yang kami beli dari Vour sangat membantu mempercepat development internal tools kami. Clean code dan well-documented.",
    profile: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Rudi Hermawan",
    username: "Co-Founder",
    company: "StartupHub",
    body: "Partner yang tepat untuk bisnis yang butuh solusi teknis berkualitas. Vour understand both technical and business requirements.",
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
              Testimoni dari klien kami
            </h2>
            <p className="text-center text-sm text-text-muted md:text-base">
              Pengalaman kerja sama dari berbagai bisnis yang telah mempercayakan project mereka kepada Vour.
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
