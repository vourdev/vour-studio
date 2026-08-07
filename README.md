# Vour Platform

Marketing site for Vour, an AI-Powered Product Engineering Studio. Built from
[`docs/PRD.md`](docs/PRD.md) and [`docs/vour-website-build-prompt.md`](docs/vour-website-build-prompt.md).

All visitor-facing copy is Indonesian.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

The site runs with **no environment variables set**. Everything renders; the
contact form degrades to a WhatsApp fallback and logs a warning instead of
failing.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate a Drizzle migration from `db/schema.ts` |
| `npm run db:migrate` | Apply migrations to Turso |
| `npm run db:studio` | Drizzle Studio |

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components, React Compiler) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, tokens in `app/globals.css` |
| Components | Radix primitives + CVA in `components/ui/`, shadcn-style owned code |
| Animation | Motion (`motion/react`), GSAP ScrollTrigger, Lenis |
| Icons | Phosphor (`@phosphor-icons/react/ssr`), Simple Icons for the tech marquee |
| Content | MDX in `content/resources/`, git-based, no external CMS |
| Database | Turso (libSQL) via Drizzle ORM, leads and newsletter only |
| Email | Resend |
| Analytics | Vercel Web Analytics |

Not built, deliberately: auth, admin panel, payment gateway.

---

## Environment variables

Every variable is optional. See [`.env.example`](.env.example) for the full list.

| Variable | Unset behaviour |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs and sitemap use the placeholder domain in `lib/site.ts` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp links point at a placeholder number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email falls back to a placeholder |
| `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` | Leads are **not** stored; a warning is logged, the visitor still gets a success state |
| `RESEND_API_KEY` / `RESEND_FROM` | No notification email is sent; a warning is logged |
| `LEAD_NOTIFICATION_EMAIL` | Falls back to `NEXT_PUBLIC_CONTACT_EMAIL` |

Storage and notification are attempted independently: a Resend outage cannot
lose the database row, and a Turso outage cannot swallow the email.

### Setting up Turso

```bash
turso db create vour
turso db show vour --url          # -> TURSO_DATABASE_URL
turso db tokens create vour       # -> TURSO_AUTH_TOKEN
npm run db:generate
npm run db:migrate
```

Two tables, defined in `db/schema.ts`: `leads` and `newsletter_subscribers`.
There is no admin UI for reading them by design; notifications go to email.

---

## Project structure

```
app/
  page.tsx                    homepage, composes the 10 sections
  solutions|products|projects|about|contact/
  resources/                  MDX index
  resources/[slug]/           MDX article renderer
  actions/lead.ts             server action for the contact form
  sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
components/
  layout/                     nav, footer, theme toggle, Lenis provider
  motion/                     reveal, kinetic heading, wave matrix, magnetic button, marquee
  sections/                   one file per homepage section
  ui/                         button, accordion, field, container
  forms/ products/
content/resources/            MDX articles
db/                           Drizzle schema + client
emails/                       transactional email template
lib/                          site config, SEO helpers, content index, data
```

---

## Design system

Locked decisions, enforced across every page. Changing any of these means
changing it everywhere.

- **One accent**: acid lime `#cde87a`, saturation held at ~71% (the design
  system caps accents at 80%). No second accent colour appears anywhere. As
  text on light backgrounds it darkens to `#4d6b0a` for WCAG AA.
- **Display type is monospace.** The hero and every marketing page H1 are set
  in Geist Mono; section headings and article titles stay sans, because a long
  title in monospace is harder to read than it is characterful.
- **Neutrals**: cool zinc. Never `#000000`, never `#ffffff`.
- **Two radii**: `rounded-surface` (12px) for panels, `rounded-control` (8px) for
  buttons and inputs.
- **Type**: Geist + Geist Mono via `next/font`. Mono carries numbers and labels.
- **One CTA label per intent.** Every link that goes to the same place uses the
  same words, so a visitor never wonders whether two differently-worded buttons
  lead somewhere different. The labels live in `lib/site.ts` and are never
  written inline:

  | Constant | Label | Destination |
  |---|---|---|
  | `PRIMARY_CTA` | Mulai Project | `/contact` |
  | `PRODUCTS_CTA` | Lihat Produk | `/products` |
  | `PROJECTS_CTA` | Lihat Project | `/projects` |
  | `RESOURCES_CTA` | Lihat Tulisan | `/resources` |
  | `SERVICE_CTA` | Pelajari | `/solutions#<slug>` |

  WhatsApp is presented as a channel, never as a second competing CTA.
- **Eyebrows are rationed**: at most one small uppercase label per three
  sections. The homepage has ten sections and exactly three (hero, Selected
  Projects, FAQ). Card-level category labels are metadata, not eyebrows.
- **No decorative dots.** Accent-coloured markers appear only where they carry
  meaning: a check icon on "what you get" lists, and the workflow nodes that
  light as the scroll passes them.
- **Grids match their content count.** The Resources preview and the Products
  browser pick their column count from the number of items, so a single article
  or four products never render beside empty cells.

### Copy rule

Technology is never a selling point in visitor-facing copy. Sections describe the
problem solved, not the stack used. Technical scope appears in exactly one place,
`/solutions`, where a technical buyer has explicitly asked for it.

### Motion

Every animation on the site is motivated, and every one collapses under
`prefers-reduced-motion`.

| Where | What | Why it exists |
|---|---|---|
| Hero | Wave matrix + word-stagger headline | Opening sweep gives the page arrival; the stagger walks the eye through the value proposition |
| Hero | Wave matrix reacts to the cursor | Feedback: the lattice shows where the pointer went |
| Trust bar | Logo marquee | Breadth. The only marquee on the site |
| Sections | Scroll reveal | Hierarchy, arrival order |
| Workflow | Scrubbed SVG path | The drawing IS the six-step process |
| Primary CTA | Magnetic hover | Feedback |
| FAQ | Accordion height | State transition |

GSAP is confined to `components/sections/workflow.tsx` and never shares a tree
with Motion. Both GSAP and Lenis are imported lazily inside effects, so neither
is in the initial bundle. `components/layout/lenis-provider.tsx` wires Lenis to
ScrollTrigger; without that handshake, scrubbed animation lags behind the scroll
position.

Scroll reveals are server-rendered with `opacity: 0` and revealed on hydration.
A `<noscript>` rule in `app/layout.tsx` forces `[data-reveal]` visible, so with
JS disabled the failure mode is "no animation" rather than "no page".

### Verified, not assumed

Checked in a real headless Chrome against the production build: the wave matrix
paints and changes between frames, the headline stagger completes, the workflow
path scrubs and its nodes light, and the marquee runs. Under
`prefers-reduced-motion` all four collapse to their end state with nothing
hidden. The hero field is measured rather than eyeballed: peak coverage stays
around 1% and coverage behind the headline and subhead stays under 2%, so the
animation never competes with the copy. Lighthouse (desktop) on `/`,
`/products`, `/contact`, `/solutions` and an article: **performance 100,
accessibility 100, SEO 100**, LCP 0.6s, CLS 0.

Best practices scores 96 because `/_vercel/insights/script.js` 404s locally.
That script is injected by the Vercel platform and only exists once deployed.

---

## Adding a blog post

1. Create `content/resources/<slug>.mdx`.
2. Export a `metadata` object at the top (see the existing post for the shape).
   `@next/mdx` has no frontmatter support, so metadata is a real export.
3. Add the slug to `postSlugs` in `lib/content.ts`.

The index, sitemap, static params and per-post `generateMetadata` all follow
automatically. Link every article back to a relevant service or product via the
`related` field.

**Turbopack note**: remark and rehype plugins are configured by *name* in
`next.config.ts`, not by import. JS functions cannot cross the Rust boundary.

---

## Deploying to Vercel

```bash
npx vercel link
npx vercel env add TURSO_DATABASE_URL production   # repeat per variable
npx vercel --prod
```

Or connect the repo in the Vercel dashboard; the defaults for a Next.js project
are correct. Add the environment variables under Project Settings before the
first production deploy if you want the contact form live on day one, otherwise
add them later without a code change.

---

## Known gaps

These are deliberate and need real input from Vour before launch.

- **Placeholder content**: trust-bar statistics, product prices, project case
  studies, FAQ answers and team profiles. All marked `TODO(Vour)` in code.
- **Placeholder images**: project thumbnails and article covers use
  `picsum.photos` seeds. Every slot is marked with a `TODO(Vour)` comment naming
  the dimensions needed.
- **Placeholder contact details**: WhatsApp number, email and social URLs in
  `lib/site.ts`.
- **No product detail pages**. `PRD.md` specifies them, but no real product
  exists yet, so cards render a "Segera hadir" state instead of linking to a
  hollow page.
- **`docs/PRD.md` is out of date** on infrastructure. It specifies Supabase,
  Prisma, Docker and VPS; the newer build prompt specifies Turso, Drizzle and
  Vercel, which is what is implemented. Worth reconciling the document.
- **React Email not used.** `@react-email/components` is published as deprecated
  ("Package no longer supported"), so the one transactional template is
  inline-styled HTML in `emails/lead-notification.ts` instead. All interpolated
  values are escaped.
