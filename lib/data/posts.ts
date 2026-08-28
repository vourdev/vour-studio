import type { SerializedEditorState } from "lexical";

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

export const fallbackPosts: Post[] = [
  {
    slug: "memilih-antara-website-dan-dashboard",
    title: "Website atau dashboard? Cara memutuskan yang Anda butuhkan lebih dulu",
    description: "Banyak bisnis memesan yang salah karena keduanya terlihat mirip. Ini cara memisahkannya dalam beberapa pertanyaan sederhana.",
    date: "2026-07-14T00:00:00.000Z",
    category: "Dev Notes",
    readingMinutes: 6,
    image: "https://picsum.photos/seed/vour-article-website-dashboard/1200/675",
    // The Lexical JSON comes verbatim from the CMS, so the cast is honest.
    content: {
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
            direction: null,
            textFormat: 0,
            textStyle: "",
            children: [
              {
                type: "text",
                text: "Sebagian besar klien datang kepada kami dengan kalimat yang sama: \"Kami butuh website baru.\" Setelah berdiskusi setengah jam, seringkali ternyata yang mereka butuhkan adalah dashboard operasional. Atau sebaliknya.",
                format: 0,
                detail: 0,
                mode: "normal",
                style: "",
                version: 1,
              },
            ],
          },
        ],
      },
    } as unknown as RichTextContent,
  },
];
