<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verification Commands
Before completing tasks, verify with:
- Linting: `npm run lint`
- Typechecking: `npm run typecheck`
- Production build: `npm run build`

## Architecture & Conventions

### Language & Copy
- Visitor-facing copy: **Indonesian (`id-ID`)** strictly. Technology (e.g., Next.js, React) must never be a selling point in copy. Copy must focus on solutions/problems solved. Exception: `/solutions` where technical specs are allowed.
- Code/Comments: **English**. No developer-facing comments unless asked.

### CTA Labels
- Never hardcode CTA text. Always import from `lib/site.ts`:
  - `PRIMARY_CTA` ("Mulai Project") -> `/contact`
  - `PRODUCTS_CTA` ("Lihat Produk") -> `/products`
  - `PROJECTS_CTA` ("Lihat Project") -> `/projects`
  - `BLOG_CTA` / `RESOURCES_CTA` ("Lihat Blog") -> `/blog`
  - `SERVICE_CTA` ("Pelajari") -> `/solutions#<slug>`

### Blog Posts (CMS)
- Blog content lives in the admin CMS `posts` collection (Lexical rich text, draft/publish). Anonymous `read` only exposes `_status: 'published'`, so drafts never leak.
- `lib/cms.ts` provides `getPosts()` (listings, `{ slug, meta }` shape) and `getPost(slug)` (full body). No MDX, no `lib/content.ts` — those were removed.
- Article bodies are Lexical JSON: render with `components/blog/article-content.tsx` (`RichText` from `@payloadcms/richtext-lexical/react`) inside the `.article-prose` container styled in `app/globals.css`.
- The article route (`app/blog/[slug]/page.tsx`) uses `dynamicParams = true` so newly published posts render on demand with ISR.

### Lead Forwarding (no local database)
- This repo has **no database, ORM, or email code**. Storage + notification live in the sibling project `vour-studio-admin` (Payload CMS + Postgres).
- The contact form server action (`app/actions/lead.ts`) validates with zod, then forwards the lead to `POST <LEAD_API_URL>/api/leads` with header `x-api-key: LEAD_API_KEY`.
- Must degrade gracefully: missing `LEAD_API_URL`/`LEAD_API_KEY` or admin API errors are logged (warning/error) and the visitor still gets a success state. Never error out the user flow.

### CMS Content Reads
- `lib/cms.ts` is the only read path into the admin CMS (`GET <CMS_API_URL>/api/products`, `/api/projects`, `/api/posts`, `/api/globals/site-settings` with direct `cache: "no-store"`). `CMS_API_URL` falls back to `LEAD_API_URL`, then `http://localhost:3000`.
- Must degrade gracefully: `getProducts()` / `getProjects()` / `getPosts()` / `getSiteSettings()` return the static placeholder data from `lib/data/*` only when CMS is unreachable, and log a warning. Never throw in the render path.
- Server components call the `get*()` fetchers and pass the result down as props. Client components must **not** import `lib/cms.ts` (it reads `process.env` and `fetch`s); they receive data via props.

- **One Accent**: Cyan/Turquoise `#39d5f6` (`--accent`). Background: Deep Black `#0a0a0a`. Primary: White `#ffffff`. Style: Flat, clean, developer tools aesthetic (Vercel, Linear, Raycast, Warp).
- **Fonts**: Plus Jakarta Sans (`--font-sans`) for body and headings; JetBrains Mono (`--font-mono`) for years, figures, stack labels, and code only. Headings use the `font-display` utility, never `font-mono` -- monospace at display size is hard to read and Indonesian copy runs long. `--font-display` currently points at the body family; change it there, not at the call sites.
- **Radii**: Card/panels: `rounded-surface` (12px), buttons/inputs: `rounded-control` (8px).
- Tailwind CSS v4 styles are configured directly in `app/globals.css` (no `tailwind.config.js`).

### Animation & Motion
- GSAP and Lenis are dynamic-imported to keep bundle size light. GSAP is restricted strictly to `components/sections/workflow.tsx`.
- All animations must collapse/reset if `prefers-reduced-motion` is active.
- For scroll reveals, use the `<Reveal>` helper (`components/motion/reveal.tsx`) which uses `data-reveal`. A `<noscript>` CSS rule in `app/layout.tsx` overrides `opacity: 0` for non-JS environments.
