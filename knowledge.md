# Project knowledge

Vour Studio — marketing site for an AI-Powered Product Engineering Studio. Next.js 16 (App Router, React Server Components, React Compiler) + TypeScript strict + Tailwind CSS v4. All visitor-facing copy is **Indonesian (id-ID)**; code/comments are English. Auth, admin, and payments are deliberately NOT built. Single source of truth for devs: `README.md` (very detailed) and `AGENTS.md`.

## Quickstart
- Setup: `npm install` — no env vars needed; everything degrades gracefully (see Gotchas). Note: README references `.env.example`, but that file does **not** exist; every env var is optional anyway.
- Dev: `npm run dev` (Turbopack, http://localhost:3000)
- Test: none configured (no test runner in repo)
- Typecheck: `npm run typecheck` (`tsc --noEmit`) | Lint: `npm run lint` (ESLint) | Build: `npm run build`
- DB: `npm run db:generate` / `db:migrate` / `db:studio` (Drizzle Kit, Turso dialect)

## Architecture
- `app/` — pages: `/` homepage (composes 10 sections), `solutions|products|projects|about|contact`, `resources` + `resources/[slug]` (MDX articles), `actions/lead.ts` (contact form server action), `sitemap.ts robots.ts not-found.tsx`, `layout.tsx` (fonts, theme, noscript reveal fallback). SEO metadata lives in `lib/seo.ts`.
- `components/` — `layout/` (nav, footer, theme toggle, Lenis provider), `sections/` (one file per homepage section), `motion/` (Reveal, KineticHeading, WaveMatrix, MagneticButton, Marquee, AnimatedNumber), `ui/` (Radix primitives + CVA: button, accordion, field, container), `forms/lead-form.tsx`, `products/product-browser.tsx`.
- `content/resources/*.mdx` — MDX articles (git-based CMS, no frontmatter; metadata is an exported object).
- `db/` — Drizzle schema + client (Turso/libSQL). Two tables: `leads`, `newsletter_subscribers`. No admin UI by design.
- `emails/lead-notification.ts` — one transactional template, inline-styled HTML (React Email not used — the package is deprecated).
- `lib/` — `site.ts` (brand, nav, CTA labels, contact placeholders), `content.ts` (post index + `postSlugs`), `seo.ts`, `utils.ts`, `data/` (projects, faq, products, services — many `TODO(Vour)` placeholders).
- Data flow: contact form → `app/actions/lead.ts` → stores to Turso (if creds set) AND sends Resend email, independently (one failing doesn't lose the other).

## Conventions
- Formatting/linting: ESLint 9 + `eslint-config-next`; run `npm run lint` and `npm run typecheck` before finishing.
- **CTA labels are never hardcoded** — import from `lib/site.ts`: `PRIMARY_CTA` "Mulai Project" → `/contact`, `PRODUCTS_CTA` "Lihat Produk" → `/products`, `PROJECTS_CTA` "Lihat Project" → `/projects`, `RESOURCES_CTA` "Lihat Blog" → `/resources` (code wins over the README's "Lihat Tulisan"), `SERVICE_CTA` "Pelajari" → `/solutions#<slug>`. One label per intent, site-wide.
- Technology is never a selling point in visitor copy — only in `/solutions` (technical buyer page).
- Design tokens live in `app/globals.css` (Tailwind v4, NO `tailwind.config.js`; dark mode via `@custom-variant dark`). Locked: one accent cyan `#39d5f6` (README's "acid lime #cde87a" is outdated — the code is authoritative), cool zinc neutrals (never #000/#fff), two radii only (`rounded-surface` 12px panels, `rounded-control` 8px buttons/inputs), Geist Sans + Geist Mono via `next/font` (mono for hero H1s, numbers, labels only).
- Motion: GSAP + Lenis are dynamic-imported (not in initial bundle) and GSAP is restricted strictly to `components/sections/workflow.tsx` (never share a tree with Motion). Every animation collapses under `prefers-reduced-motion`. Scroll reveals use `<Reveal>` (`components/motion/reveal.tsx`) with server-rendered `opacity: 0` + a noscript rule in `app/layout.tsx` so no-JS never shows a blank page.
- MDX gotchas: `@next/mdx` has no frontmatter — export a `metadata: PostMeta` object; register the slug in `postSlugs` in `lib/content.ts` (newest first). Remark/rehype plugins are configured **by name** in `next.config.ts` (JS functions can't cross the Turbopack Rust boundary).
- Things to avoid: hardcoded CTA copy, second accent color, decorative dots/markers (accent markers only carry meaning: check icons, workflow nodes), changing locked design tokens (must change everywhere).

## Gotchas
- `app/actions/lead.ts` must always degrade gracefully: no `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN` → `getDb()` returns null, log a warning, visitor still sees success; same for Resend (`RESEND_API_KEY`/`RESEND_FROM`). Never error out the user flow.
- Next 16 has breaking changes vs training data — read `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md).
- `docs/PRD.md` and root `PRD.md` are out of date on infrastructure (say Supabase/Prisma/Docker/VPS; actual stack is Turso/Drizzle/Vercel).
- Placeholder content everywhere: trust-bar stats, product prices, project case studies, images (`picsum.photos`), contact details — all marked `TODO(Vour)`. Products render "Segera hadir" (no detail pages).
