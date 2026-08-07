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
  - `RESOURCES_CTA` ("Lihat Tulisan") -> `/resources`
  - `SERVICE_CTA` ("Pelajari") -> `/solutions#<slug>`

### MDX Blog Posts
- `@next/mdx` lacks frontmatter. Define and export `metadata: PostMeta` object in `content/resources/<slug>.mdx`.
- Register the new slug in the `postSlugs` array in `lib/content.ts` (newest first).

### Database & Resend Email Actions
- All env variables are optional. `getDb()` returns `null` if credentials (`TURSO_DATABASE_URL`) are absent.
- The contact form server action (`app/actions/lead.ts`) must degrade gracefully. Turso/Resend failures should be caught and logged (warning/error log) rather than erroring out the user flow.

- **One Accent**: Cyan/Turquoise `#39d5f6` (`--accent`). Background: Deep Black `#0a0a0a`. Primary: White `#ffffff`. Style: Flat, clean, developer tools aesthetic (Vercel, Linear, Raycast, Warp).
- **Display Font**: Monospace (Geist Mono) for H1 hero, numbers, and labels only. Sans (Geist Sans) for section headings/body.
- **Radii**: Card/panels: `rounded-surface` (12px), buttons/inputs: `rounded-control` (8px).
- Tailwind CSS v4 styles are configured directly in `app/globals.css` (no `tailwind.config.js`).

### Animation & Motion
- GSAP and Lenis are dynamic-imported to keep bundle size light. GSAP is restricted strictly to `components/sections/workflow.tsx`.
- All animations must collapse/reset if `prefers-reduced-motion` is active.
- For scroll reveals, use the `<Reveal>` helper (`components/motion/reveal.tsx`) which uses `data-reveal`. A `<noscript>` CSS rule in `app/layout.tsx` overrides `opacity: 0` for non-JS environments.
