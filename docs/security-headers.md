# Security headers

Set in `next.config.ts` under `headers()`, applied to every path.

| Header | Value | Why |
| --- | --- | --- |
| `X-Content-Type-Options` | `nosniff` | Stops the browser from re-guessing a response's type. |
| `X-Frame-Options` | `DENY` | The site is never embedded, so clickjacking has no legitimate use case here. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Full URL stays in-origin; other sites see the origin only. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | No page asks for these. Denying them up front means a third-party script cannot either. |

`Strict-Transport-Security` is already set by Vercel (`max-age=63072000`) and is
not duplicated here.

## Content-Security-Policy: not shipped yet

A CSP is deliberately absent. It is the one header here that can break the site
silently, and this app has an unusually wide surface to cover:

- `@splinetool/runtime` (hero background) instantiates **WebAssembly**
  (`'wasm-unsafe-eval'`), spawns **workers** from blob URLs (`worker-src blob:`),
  loads the scene from `prod.spline.design`, and its bundles reference
  `unpkg.com` plus several other `*.spline.design` origins.
- The Spline layer only mounts on viewports ≥1024px with motion enabled, so a
  policy that blocks it fails in a slice of traffic that is easy to miss in
  local testing.
- Vercel Analytics is same-origin (`/_vercel/insights/*`), and `next/font`
  self-hosts, so those two need nothing beyond `'self'`.

Two viable routes, both requiring verification before enforcement:

1. **Static-compatible CSP** (`next.config.ts` → `headers()`), with
   `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'`. Keeps every page
   static/ISR. Lighthouse's `csp-xss` audit will call this "not effective
   against XSS" because of `'unsafe-inline'` — that audit is informational and
   does not affect the Best Practices score.
2. **Nonce-based CSP** via `proxy.ts`. Strictly better protection, but per the
   Next.js 16 docs it forces every page into dynamic rendering: static
   optimisation and ISR are disabled and pages stop being CDN-cacheable. This
   site is entirely static/ISR today, so that is a real cost.

Do not ship `Content-Security-Policy-Report-Only` without a `report-uri`
endpoint. Violations would land in the Chrome Issues panel, which Lighthouse
reads for its scored `inspector-issues` audit — it would lower the Best
Practices score while providing no protection.

## Running Lighthouse

Run it in an incognito window with extensions disabled. Extensions inject
content scripts into the page and their code is attributed to the site, which
produces phantom findings — a browser extension using the deprecated Shared
Storage API, for example, surfaces as a deprecated-API warning against
`contentscript.js`.
