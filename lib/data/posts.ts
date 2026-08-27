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

export type RelatedPost = {
  id?: number | string;
  title: string;
  slug: string;
  description?: string | null;
  category?: PostCategory | string | null;
  date?: string | null;
  readingMinutes?: number | null;
  image?: string | null;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, UTC. */
  date: string;
  category: PostCategory;
  readingMinutes: number;
  image: string;
  /** Related published articles from the CMS relation field. */
  related?: RelatedPost[];
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
    related: [
      {
        id: 1,
        slug: "memilih-antara-website-dan-dashboard",
        title: "Website atau Dashboard: Panduan Menentukan Kebutuhan Digital",
        description: "Pelajari kriteria praktis sebelum berinvestasi pada pembuatan website atau dashboard operasional bisnis.",
        category: "Dev Notes",
        date: "2026-07-14T00:00:00.000Z",
        readingMinutes: 6,
        image: "https://picsum.photos/seed/vour-article-website-dashboard/1200/675",
      },
    ],
    // The Lexical JSON comes verbatim from the CMS, so the cast is honest.
    content: {
  "root": {
    "type": "root",
    "format": "",
    "indent": 0,
    "version": 1,
    "children": [
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Pertanyaan yang paling sering kami terima di sesi konsultasi awal bukan soal harga atau lama pengerjaan. Pertanyaannya lebih mendasar: sebenarnya yang dibutuhkan ini website atau dashboard?",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Keduanya sama-sama dibuka lewat browser dan sama-sama bisa terlihat modern. Tapi keduanya menyelesaikan masalah yang sama sekali berbeda, dan memesan yang salah berarti membayar untuk sesuatu yang tidak akan menyelesaikan masalah Anda.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "tag": "h2",
        "type": "heading",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Bedanya ada pada siapa yang membukanya",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Cara tercepat memisahkan keduanya adalah dengan bertanya: siapa yang akan membukanya setiap hari?",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Website",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 1,
            "version": 1
          },
          {
            "mode": "normal",
            "text": " dibuka oleh orang yang belum mengenal Anda. Tugasnya menjelaskan, meyakinkan, dan mengarahkan ke satu tindakan. Ukuran keberhasilannya adalah berapa banyak pengunjung yang akhirnya menghubungi Anda.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Dashboard",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 1,
            "version": 1
          },
          {
            "mode": "normal",
            "text": " dibuka oleh orang yang sudah bekerja bersama Anda, biasanya tim internal. Tugasnya menampilkan keadaan terkini dan memudahkan pengambilan keputusan. Ukuran keberhasilannya adalah berapa banyak waktu yang dihemat.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kalau Anda menjawab \"keduanya\", itu wajar. Tapi hampir selalu ada satu yang lebih mendesak, dan itu yang sebaiknya dikerjakan lebih dulu.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "tag": "h2",
        "type": "heading",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Tiga pertanyaan untuk menentukan urutan",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "tag": "ol",
        "type": "list",
        "start": 1,
        "indent": 0,
        "version": 1,
        "children": [
          {
            "type": "listitem",
            "value": 1,
            "checked": false,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "Apa yang sedang menghambat pemasukan?",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 1,
                "version": 1
              },
              {
                "mode": "normal",
                "text": " Kalau calon pelanggan kesulitan menemukan atau memahami apa yang Anda jual, website dulu. Kalau pesanan sudah masuk tapi tim kewalahan memprosesnya, dashboard dulu.",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ]
          },
          {
            "type": "listitem",
            "value": 2,
            "checked": false,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "Berapa banyak pekerjaan manual yang berulang setiap minggu?",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 1,
                "version": 1
              },
              {
                "mode": "normal",
                "text": " Kalau ada pekerjaan yang sama persis dilakukan berulang kali, itu tanda paling jelas bahwa yang Anda butuhkan adalah sistem internal, bukan halaman promosi.",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ]
          },
          {
            "type": "listitem",
            "value": 3,
            "checked": false,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "Data Anda sekarang ada di mana?",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 1,
                "version": 1
              },
              {
                "mode": "normal",
                "text": " Kalau semuanya masih di beberapa spreadsheet terpisah, dashboard akan memberi dampak lebih cepat daripada halaman baru yang cantik.",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ]
          }
        ],
        "listType": "number",
        "direction": null
      },
      {
        "tag": "h2",
        "type": "heading",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kesalahan yang paling mahal",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kesalahan yang paling sering kami temui bukan memilih yang salah, melainkan mengerjakan keduanya sekaligus di awal dengan anggaran untuk satu.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Hasilnya dua produk setengah jadi. Website-nya belum cukup meyakinkan untuk mendatangkan pelanggan baru, dashboard-nya belum cukup lengkap untuk dipercaya tim. Keduanya lalu ditinggalkan.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Lebih baik menyelesaikan satu sampai benar-benar dipakai, lalu menambah yang kedua di atas fondasi yang sudah terbukti jalan.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "tag": "h2",
        "type": "heading",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kalau ternyata jawabannya otomasi",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Ada kasus ketiga yang sering terlewat. Kadang yang dibutuhkan bukan tampilan baru sama sekali, melainkan penghubung antara alat-alat yang sudah Anda pakai.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kalau tim Anda menghabiskan waktu memindahkan data dari satu aplikasi ke aplikasi lain secara manual, membuat dashboard baru hanya menambah satu tempat lagi untuk dibuka. Yang lebih menyelesaikan masalah adalah ",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          },
          {
            "type": "link",
            "fields": {
              "url": "/solutions#ai-automation",
              "newTab": false,
              "linkType": "custom"
            },
            "format": "",
            "indent": 0,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "otomasi alur kerjanya",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ],
            "direction": null
          },
          {
            "mode": "normal",
            "text": ", sehingga datanya berpindah sendiri.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "tag": "h2",
        "type": "heading",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Langkah berikutnya",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "Kalau Anda masih ragu setelah membaca ini, jawabannya biasanya ketahuan dalam percakapan lima belas menit. Kami tidak menagih untuk sesi itu, dan hasilnya bukan penawaran, melainkan urutan pengerjaan yang masuk akal untuk keadaan Anda sekarang.",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      },
      {
        "type": "paragraph",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "type": "link",
            "fields": {
              "url": "/contact",
              "newTab": false,
              "linkType": "custom"
            },
            "format": "",
            "indent": 0,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "Diskusikan kebutuhan project Anda",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ],
            "direction": null
          },
          {
            "mode": "normal",
            "text": " atau lihat dulu ",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          },
          {
            "type": "link",
            "fields": {
              "url": "/solutions",
              "newTab": false,
              "linkType": "custom"
            },
            "format": "",
            "indent": 0,
            "version": 1,
            "children": [
              {
                "mode": "normal",
                "text": "apa saja yang kami tangani",
                "type": "text",
                "style": "",
                "detail": 0,
                "format": 0,
                "version": 1
              }
            ],
            "direction": null
          },
          {
            "mode": "normal",
            "text": ".",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": null,
        "textStyle": "",
        "textFormat": 0
      }
    ],
    "direction": "ltr"
  }
} as unknown as RichTextContent,
  },
];
