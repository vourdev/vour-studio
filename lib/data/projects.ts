/**
 * TODO(vour.dev): placeholder case studies. Replace names, industries and copy
 * with real engagements, and swap the Picsum seeds for real screenshots.
 *
 * These render only when the CMS is unreachable on a cold cache.
 */

import type { RichTextContent } from "@/lib/data/posts";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  /** Card body as Lexical JSON, rendered by the shared RichText component. */
  description: RichTextContent | null;
  technology: string[];
  image: string;
};

/** Wrap a plain sentence as a single Lexical paragraph, so the static fallback
 * data feeds the same renderer the CMS content does. */
function paragraph(text: string): RichTextContent {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          textFormat: 0,
          children: [
            {
              type: "text",
              text,
              format: 0,
              style: "",
              mode: "normal",
              detail: 0,
              version: 1,
            },
          ],
        },
      ],
    },
  } as unknown as RichTextContent;
}

export const projects: Project[] = [
  {
    slug: "arunika-living",
    name: "Arunika Living",
    industry: "Retail furnitur",
    year: "2025",
    description: paragraph(
      "Calon pembeli membuka katalognya sendiri. Tim penjualan berhenti mengulang jawaban yang sama tiap hari.",
    ),
    technology: ["Web Application", "Content Management"],
    image: "https://picsum.photos/seed/vour-project-arunika/1200/800",
  },
  {
    slug: "kirana-logistik",
    name: "Kirana Logistik",
    industry: "Logistik",
    year: "2025",
    description: paragraph(
      "Laporan harian sudah siap sebelum tim masuk kerja, tanpa ada yang menyusunnya pagi itu.",
    ),
    technology: ["Dashboard", "AI Automation"],
    image: "https://picsum.photos/seed/vour-project-kirana/1200/800",
  },
  {
    slug: "sembara-coffee",
    name: "Sembara Coffee",
    industry: "Food and beverage",
    year: "2024",
    description: paragraph(
      "Pesanan grosir masuk lewat satu jalur yang tercatat, bukan tercecer di beberapa aplikasi chat.",
    ),
    technology: ["Web Application", "Automation"],
    image: "https://picsum.photos/seed/vour-project-sembara/1600/900",
  },
];
