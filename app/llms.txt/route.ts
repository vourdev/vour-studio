import { getPosts } from "@/lib/cms";
import { faqs } from "@/lib/data/faq";
import { services } from "@/lib/data/services";
import { IS_INDEXABLE, siteConfig, CONTACT_EMAIL, SERVICE_AREA } from "@/lib/site";

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

  const serviceBlocks = services.map((service) => {
    const status = service.status === "soon" ? " (belum tersedia)" : "";
    const offerings = service.offerings
      .map((offering) => `  - ${offering.name}: ${offering.description}`)
      .join("\n");

    return `### ${service.title}${status}\n\n${service.answer}\n\nCakupan:\n${offerings}\n\nHalaman: ${abs(`/solutions#${service.slug}`)}`;
  });

  const faqBlocks = faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`);

  const postLines = posts.map(
    (post) =>
      `- [${post.meta.title}](${abs(`/blog/${post.slug}`)}): ${post.meta.description}`,
  );

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

vour.dev adalah studio digital kecil yang berbasis di ${SERVICE_AREA}, terdiri
dari fullstack developer, UI/UX designer, dan DevOps engineer. Situs ini
berbahasa Indonesia dan melayani klien di ${SERVICE_AREA}. Source code beserta
dokumentasinya diserahkan ke klien di akhir project.

## Layanan

${serviceBlocks.join("\n\n")}

## Halaman utama

- [Beranda](${abs("/")}): ringkasan layanan, cara kerja, dan pertanyaan yang sering masuk.
- [Layanan](${abs("/solutions")}): rincian tiap layanan beserta cakupan pekerjaannya.
- [Produk](${abs("/products")}): template website, portfolio, landing page, dan developer resources.
- [Estimasi Biaya](${abs("/estimate")}): estimator untuk menghitung kisaran biaya project.
- [Projects](${abs("/projects")}): studi kasus, ditulis dari masalah klien sampai hasil setelah rilis.
- [Blog](${abs("/blog")}): catatan keputusan teknis dari project yang dikerjakan.
- [Tentang](${abs("/about")}): profil studio, cara kerja, teknologi, dan FAQ lengkap.
- [Kontak](${abs("/contact")}): form brief project, WhatsApp, dan email.

## Pertanyaan yang sering diajukan

${faqBlocks.join("\n\n")}

## Tulisan
${postLines.length > 0 ? `\n${postLines.join("\n")}` : "\nBelum ada tulisan yang terbit."}

## Kontak

- Email: ${CONTACT_EMAIL}
- Halaman kontak: ${abs("/contact")}

## Catatan

- Konsultasi pertama tidak dipungut biaya.
- Harga tidak dicantumkan per layanan. Kisaran biaya dihitung lewat estimator di ${abs("/estimate")}, dan angka pastinya ditulis di proposal setelah lingkup disepakati.
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
