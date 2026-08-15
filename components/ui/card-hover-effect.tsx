"use client";

import { LeafIcon, LightbulbIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: LeafIcon,
    title: "Tidak ada pekerjaan yang terbuang",
    description: "Setiap baris kode dan setup infrastruktur terdokumentasi dengan baik, memudahkan proses hand-over atau penambahan fitur di masa depan.",
  },
  {
    icon: LightbulbIcon,
    title: "Masalah dulu, solusi kemudian",
    description: "Kami tidak merekomendasikan teknologi sebelum benar-benar memahami masalah operasional bisnis Anda. Sederhana sering kali lebih baik.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Bukan bersaing di harga termurah",
    description: "Ketelitian arsitektur keamanan, kecepatan loading, dan kebersihan kode menjadi fokus utama yang menentukan efisiensi biaya jangka panjang.",
  },
];

export function CardHoverEffect({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {values.map((item) => {
        const Icon = item.icon;
        return (
          <article
            key={item.title}
            className="group relative flex h-full flex-col gap-4 rounded-surface border border-border bg-surface-solid/35 p-6 hover:border-accent/40 hover:bg-bg-subtle transition-all duration-300"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-bg text-accent-text group-hover:border-accent/40 group-hover:bg-surface-solid transition-all duration-300">
              <Icon weight="duotone" className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-text transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default CardHoverEffect;
