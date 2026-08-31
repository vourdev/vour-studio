# Search Intent Matrix

The map from a question a person (or an assistant) asks to the page that
answers it. Add a row before you add a page: if no row needs it, the page has
no reason to exist.

Brand is always written **vour.dev**, everywhere, in every surface. The
canonical one-sentence definition lives in `siteConfig.description`
(`lib/site.ts`) and is reused verbatim by metadata, JSON-LD, `llms.txt`, the
About page hero and the footer.

## Live coverage

| Query | Intent | Target page | Where it is answered |
|---|---|---|---|
| Apa itu vour.dev | Brand | `/about` | H1 + first paragraph |
| vour.dev layanan apa | Brand / commercial | `/solutions` | H1 + intro paragraph |
| vour.dev cocok untuk siapa | Brand | `/about` | "Siapa yang cocok menggunakan vour.dev?" |
| vour.dev beroperasi di mana | Brand | `/about#faq` | Brand FAQ |
| Jasa pembuatan website | Commercial | `/solutions#website-development` | Service section |
| Jasa landing page | Commercial | `/solutions#website-development` | Offering: Landing Page |
| Jasa company profile | Commercial | `/solutions#website-development` | Offering: Company Profile |
| Jasa website portfolio | Commercial | `/solutions#website-development` | Offering: Website Portfolio |
| Jasa web application / dashboard | Commercial | `/solutions#web-application` | Service section |
| Jasa deployment website | Commercial | `/solutions#deployment-infrastructure` | Offering: Deployment |
| Jasa konfigurasi server / VPS | Commercial | `/solutions#deployment-infrastructure` | Offering: Server Configuration |
| Jasa setup Docker | Commercial | `/solutions#deployment-infrastructure` | Offering: Docker |
| Jasa konfigurasi jaringan | Commercial | `/solutions#deployment-infrastructure` | Offering: Network Configuration |
| Berapa biaya membuat website | Commercial | `/estimate` | H1 + estimator + FAQ |
| Biaya website UMKM | Commercial | `/estimate` | FAQ: "Berapa biaya membuat website untuk UMKM?" |
| Apa yang membuat biaya website naik | Informational | `/estimate` | FAQ |
| Template website / Next.js template | Commercial | `/products` | H1 + product grid |
| Apa itu website template | Informational | `/products` | FAQ |
| Apakah template bisa dikustomisasi | Informational | `/products` | FAQ |
| Template vs bikin dari nol | Informational | `/products` | FAQ |
| Apakah vour.dev memberikan source code | Trust | `/about#faq`, home FAQ | Brand FAQ + trust bar |
| Teknologi apa yang digunakan | Trust / technical | `/about` | "Teknologi apa yang digunakan vour.dev?" |
| Berapa lama pengerjaan website | Commercial | `/about#faq`, home FAQ | Brand FAQ |
| Bagaimana cara memulai project | Transactional | `/contact` | H1 + first paragraph |
| Domain dan hosting termasuk? | Commercial | `/about#faq` | Brand FAQ |

## Gaps — not yet covered

These have real search intent and no page yet. Each one belongs in Insights
(`/blog`) as a single article answering a single question, not as a thin
programmatic page.

### Cluster 1 — Website Development

- Landing page vs company profile: apa bedanya dan kapan dipakai?
- Apakah UMKM perlu website atau cukup media sosial?
- Website custom vs template: mana yang cocok untuk bisnis Anda?
- Apa saja yang dibutuhkan sebelum membuat website?
- Berapa halaman yang ideal untuk company profile?

### Cluster 2 — Deployment & Infrastructure

- Apa itu deployment website dan kenapa dibutuhkan?
- Apa perbedaan hosting dan VPS?
- Apa fungsi Docker untuk website?
- Apa itu CI/CD dan kapan bisnis membutuhkannya?
- Kapan bisnis perlu pindah dari shared hosting ke VPS?

### Cluster 3 — Digital Products

- Portfolio template untuk developer: apa yang perlu ada di dalamnya?
- Landing page template untuk bisnis: kapan cukup, kapan tidak?
- Kenapa memakai starter kit untuk project baru?

### Comparison pages (only if written fairly)

`vour.dev vs freelancer`, `vour.dev vs agency`, `vour.dev vs website builder`,
`vour.dev vs v0.dev`. Rules, non-negotiable:

- State what each option is for. Do not rank them.
- No unsupported superlative: not "lebih cepat", "lebih aman", "lebih baik".
- Never attack a competitor or misrepresent their product.
- Only use verified, current information about third-party products.
- The conclusion is a fit recommendation, never "vour.dev menang".

## Rules that constrain every new page

1. One page, one primary search intent.
2. The first paragraph answers the question. No "di era digital seperti
   sekarang" openings.
3. Every claim must be true today. No invented testimonials, client counts,
   years of operation, awards, or performance metrics — see `AGENTS.md` and the
   `needsOwnerReview` flags in `lib/data/faq.ts`.
4. Structured data describes only what is visibly rendered on the same page.
   `faqJsonLd()` is always built from the same array the page maps over.
5. Every informational page ends with the next step: `/estimate` for cost
   questions, `/solutions` for scope questions, `/products` for template
   questions, `/contact` to start.
6. Descriptive anchor text. "Lihat layanan pembuatan landing page", never
   "klik di sini".

## Where the answers live in code

| Content | Source of truth |
|---|---|
| Brand name, description, tagline, area served | `lib/site.ts` (`siteConfig`, `SERVICE_AREA`) |
| Services and their offerings | `lib/data/services.ts` |
| Brand FAQ | `lib/data/faq.ts` |
| Cost FAQ | `app/estimate/page.tsx` (`estimateFaqs`) |
| Template/product FAQ | `app/products/page.tsx` (`productFaqs`) |
| Structured data builders | `lib/seo.ts` |
| Machine-readable site summary | `app/llms.txt/route.ts` |

Adding a service anywhere other than `lib/data/services.ts` is a bug: the home
showcase, `/solutions`, `/about`, `llms.txt`, `Organization.makesOffer` and the
`Service` graph all read from it.
