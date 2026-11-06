/**
 * Offline snapshot of the CMS `projects` collection, shown only when the CMS is unreachable
 * on a cold cache. Edit in the admin; re-snapshot here when the list changes.
 */

import type { RichTextContent } from "@/lib/data/posts";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  description: RichTextContent | null;
  technology: string[];
  image: string;
};

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
    slug: "albaiks-jahe-merah",
    name: "ALBAIKS JAHE MERAH",
    industry: "Herbal",
    year: "2026",
    description: paragraph(
      "Katalog produk dulu dikirim satu per satu lewat chat. Sekarang calon pembeli membukanya sendiri, dan tim penjualan berhenti mengulang jawaban yang sama.",
    ),
    technology: ["Next.js", "Tailwind CSS"],
    image:
      "https://vour-studio-admin.vercel.app/api/media/file/1788320643738_Screenshot_2026-08-31_at_11.16.22_AM.png",
  },
];
