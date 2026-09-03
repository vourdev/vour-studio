import type { SerializedEditorState } from "lexical";

import { snapshotPosts } from "./posts.generated";

/**
 * Static fallback for blog posts, used only when the admin CMS is unreachable —
 * mirrors the fallback pattern for products and projects.
 *
 * The `content` field is the exact Lexical JSON the CMS stored at seed time,
 * so the fallback renders through the same RichText component as CMS content.
 * This is an OFFLINE SNAPSHOT, not a source of truth: edit articles in the
 * admin panel, never here (the snapshot only drifts visibly when the CMS is
 * down).
 */
export type PostCategory = "Tutorial" | "Case Study" | "Dev Notes";

/** Lexical editor state as stored by Payload's richText field. */
export type RichTextContent = SerializedEditorState;

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, UTC. */
  date: string;
  category: PostCategory;
  readingMinutes: number;
  image: string;
  /** Lexical JSON body, rendered by the shared RichText component. */
  content: RichTextContent;
};

/** Metadata for listings; the article body (`content`) and `slug` live on the
 * full `Post` or in the `{ slug, meta }` wrapper returned by `getPosts()`. */
export type PostMeta = Omit<Post, "slug" | "content">;

/**
 * The floor beneath the snapshot.
 *
 * Not a real article from the CMS: an evergreen introduction to VOUR.dev
 * that lives in the code, so a clone that has never run `snapshot:blog`
 * still renders a blog rather than an empty page. Under normal conditions
 * the snapshot has content and this is never shown.
 *
 * It replaced a copy of one July article, which until Sep 2026 was the only
 * thing /blog could serve during an outage.
 */
const seedPosts: Post[] = [
  {
    "slug": "siapa-itu-vour-dev",
    "title": "Siapa itu VOUR.dev?",
    "description": "Studio digital independen dari Indonesia: website, aplikasi web, deployment dan infrastruktur, plus VOUR Insights sebagai medianya.",
    "date": "2026-09-03T00:00:00.000Z",
    "category": "Dev Notes",
    "readingMinutes": 2,
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=675&q=80",
    "content": {
      "root": {
        "type": "root",
        "format": "",
        "indent": 0,
        "version": 1,
        "direction": "ltr",
        "children": [
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "VOUR.dev adalah studio digital independen berbasis di Indonesia. Kami membantu bisnis dan individu membangun website, aplikasi web, serta menangani kebutuhan deployment dan infrastruktur digital.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "Selain layanan, kami mengembangkan sejumlah digital product dan menjalankan ",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              },
              {
                "type": "text",
                "text": "VOUR Insights",
                "format": 1,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              },
              {
                "type": "text",
                "text": " — media tempat kami membagikan pengetahuan, panduan, dan informasi terbaru seputar teknologi dan software development.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "heading",
            "tag": "h2",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "children": [
              {
                "type": "text",
                "text": "Yang kami kerjakan",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "list",
            "listType": "bullet",
            "start": 1,
            "tag": "ul",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "children": [
              {
                "type": "listitem",
                "value": 1,
                "format": "",
                "indent": 0,
                "version": 1,
                "direction": "ltr",
                "children": [
                  {
                    "type": "text",
                    "text": "Website dan landing page",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ]
              },
              {
                "type": "listitem",
                "value": 2,
                "format": "",
                "indent": 0,
                "version": 1,
                "direction": "ltr",
                "children": [
                  {
                    "type": "text",
                    "text": "Aplikasi web",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ]
              },
              {
                "type": "listitem",
                "value": 3,
                "format": "",
                "indent": 0,
                "version": 1,
                "direction": "ltr",
                "children": [
                  {
                    "type": "text",
                    "text": "Deployment, VPS, dan Docker",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ]
              },
              {
                "type": "listitem",
                "value": 4,
                "format": "",
                "indent": 0,
                "version": 1,
                "direction": "ltr",
                "children": [
                  {
                    "type": "text",
                    "text": "Infrastruktur dan operasional",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ]
              },
              {
                "type": "listitem",
                "value": 5,
                "format": "",
                "indent": 0,
                "version": 1,
                "direction": "ltr",
                "children": [
                  {
                    "type": "text",
                    "text": "Digital product dan tooling untuk developer",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ]
              }
            ]
          },
          {
            "type": "heading",
            "tag": "h2",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "children": [
              {
                "type": "text",
                "text": "Tentang VOUR Insights",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "VOUR Insights membahas web development, frontend, backend, DevOps, infrastruktur, AI, developer tools, dan keamanan.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "Kami menulis dengan cara yang sama seperti kami bekerja: praktis, teknis, dan berdasarkan bukti. Untuk setiap perubahan teknologi, yang kami jawab adalah apa yang berubah, kenapa itu penting, siapa yang terdampak, apakah perlu migrasi, dan apakah ada implikasi keamanan.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "heading",
            "tag": "h2",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "children": [
              {
                "type": "text",
                "text": "Catatan tentang halaman ini",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "Artikel ini tersimpan langsung di dalam kode situs, bukan di CMS. Ia adalah lantai dasar dari salinan offline blog: kalau server, database, atau API sedang tidak bisa dihubungi ",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              },
              {
                "type": "text",
                "text": "dan",
                "format": 1,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              },
              {
                "type": "text",
                "text": " salinan offline belum pernah dibuat, halaman inilah yang tetap tampil.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "Dalam keadaan normal Anda tidak akan melihatnya di daftar artikel.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "heading",
            "tag": "h2",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "children": [
              {
                "type": "text",
                "text": "Independensi merek",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          },
          {
            "type": "paragraph",
            "format": "",
            "indent": 0,
            "version": 1,
            "direction": "ltr",
            "textFormat": 0,
            "textStyle": "",
            "children": [
              {
                "type": "text",
                "text": "VOUR.dev adalah merek independen dan tidak berafiliasi dengan Vercel, v0.dev, maupun v0.app.",
                "format": 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
              }
            ]
          }
        ]
      }
    }
  } as unknown as Post,
];

/**
 * What /blog serves when the CMS cannot be reached.
 *
 * `snapshotPosts` is generated by `npm run snapshot:blog` and committed, so the
 * static build carries every published article and needs nothing from
 * api-studio, the VPS or the database at runtime.
 *
 * The seed article is appended rather than used only as a substitute. As a
 * substitute it was unreachable: the snapshot is never empty in practice, so
 * the one page guaranteed to exist during an outage 404'd during one. Appending
 * it keeps that guarantee real.
 *
 * Deduplicated by slug so that publishing the same article to the CMS later
 * takes precedence over this copy instead of showing twice.
 */
const bySlug = new Map<string, Post>();
for (const post of [...snapshotPosts, ...seedPosts]) {
  if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
}

export const fallbackPosts: Post[] = [...bySlug.values()].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
