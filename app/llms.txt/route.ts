import { getPosts } from "@/lib/cms";
import { services } from "@/lib/data/services";
import { IS_INDEXABLE, siteConfig, CONTACT_EMAIL } from "@/lib/site";

/**
 * https://llmstxt.org — a Markdown summary of the site for language models.
 *
 * Built from the same sources the pages render from, so it cannot drift from
 * what a visitor sees. Revalidates on the same 60s window as the CMS reads.
 */
export const revalidate = 60;

function abs(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export async function GET() {
  const posts = await getPosts();

  const serviceLines = services.map(
    (service) => `- [${service.title}](${abs(`/solutions#${service.slug}`)}): ${service.summary}`,
  );

  const postLines = posts.map(
    (post) =>
      `- [${post.meta.title}](${abs(`/resources/${post.slug}`)}): ${post.meta.description}`,
  );

  const body = `# ${siteConfig.legalName}

> ${siteConfig.description}

Situs ini berbahasa Indonesia dan melayani klien di Indonesia. Vour mengerjakan
website, dashboard internal, dan otomasi alur kerja. Kode beserta dokumentasinya
diserahkan ke klien di akhir project.

## Layanan

${serviceLines.join("\n")}

## Halaman utama

- [Beranda](${abs("/")}): ringkasan layanan, cara kerja, dan pertanyaan yang sering masuk.
- [Layanan](${abs("/solutions")}): rincian tiap layanan beserta cakupan pekerjaannya.
- [Projects](${abs("/projects")}): studi kasus, ditulis dari masalah klien sampai hasil setelah rilis.
- [Blog](${abs("/resources")}): catatan keputusan teknis dari project yang dikerjakan.
- [Tentang](${abs("/about")}): profil studio dan prinsip kerja.
- [Kontak](${abs("/contact")}): form brief project, WhatsApp, dan email.

## Tulisan
${postLines.length > 0 ? `\n${postLines.join("\n")}` : "\nBelum ada tulisan yang terbit."}

## Kontak

- Email: ${CONTACT_EMAIL}
- Halaman kontak: ${abs("/contact")}

## Catatan

- Konsultasi pertama tidak dipungut biaya.
- Harga tidak dicantumkan per layanan; kisaran biaya ada di halaman kontak dan angka pastinya menyesuaikan lingkup.
- Sitemap: ${abs("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Preview deployments serve the same copy; keep them out of training and
      // crawling for the same reason robots.ts blocks them.
      "X-Robots-Tag": IS_INDEXABLE ? "all" : "noindex",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=86400",
    },
  });
}
