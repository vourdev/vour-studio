# AI Chat Assistant — Design

Date: 2026-09-02
Status: Approved

## Purpose

Let visitors ask what vour.dev is and what it does, and get an answer grounded in
a fixed knowledge base. Read-only concierge: it answers questions, it never
takes an order, quotes outside the price list, or writes anywhere.

## Scope

In scope:
- Sitewide chat bubble, every page.
- Answers grounded in the vour.dev knowledge base.
- Graceful degradation to a WhatsApp handoff whenever the model is unavailable.

Out of scope (deliberately):
- Conversation persistence. History lives in React state and dies on reload.
- Markdown rendering, tool calls, function calling.
- Live CMS injection into the prompt.
- Analytics on chat content.

## Runtime

OmniRoute gateway, OpenAI-compatible.

- Base URL: `https://omniroute.vour.dev/v1`
- Model: `ai-assistant` (a combo; currently resolves to `claude-sonnet-4.5`)
- Auth: `OMNIROUTE_API_KEY`, server-side only, never in a file or a client bundle.

Two verified behaviours the implementation must respect:

1. The combo **always** responds with SSE, whether or not `stream` is set.
2. Upstream errors can arrive as **HTTP 200 with an `error` object inside the
   stream**. Checking `response.ok` alone is not enough; a naive client renders
   an empty bubble. Both the route and the client parse for in-stream errors.

## Files

| File | Role |
|---|---|
| `lib/chat/knowledge.ts` | Knowledge base const + `buildSystemPrompt()` |
| `app/api/chat/route.ts` | POST proxy to OmniRoute, pipes SSE through |
| `components/chat/chat-widget.tsx` | Client island: bubble, panel, stream reader |
| `app/layout.tsx` | Mounts the widget once (edit) |

No new dependencies. `zod` and `motion` are already installed.

## Data flow

1. Client POSTs `{ messages: [{ role, content }] }` to `/api/chat`.
2. Route validates the body with zod and applies the guards below.
3. Route prepends the system prompt built from the knowledge base.
4. Route calls OmniRoute with the API key.
5. Route pipes the SSE body straight to the client.
6. Client reads the stream, parses `data:` lines, appends `delta.content`.

The system prompt is built server-side on every request. `buildSystemPrompt()`
is the seam where live CMS data could later be injected without reshaping
anything else.

## Guards

The endpoint is public and each call spends money, so:

- zod: at most 10 messages, at most 1000 characters each.
- `max_tokens: 600` per reply.
- Same-origin check: the `origin` header must match `SITE_URL`.
- Rate limit: in-memory `Map<ip, { count, resetAt }>`, 15 requests per 10 minutes.

The rate limit is per instance, not global. Fluid Compute reuses instances but
gives no guarantee, so a determined caller can exceed the limit by spreading
requests across instances. Accepted: this repo has no database by design, and
adding storage for a marketing widget costs more than the abuse it prevents.

## Error handling

Three failure modes:

- `OMNIROUTE_API_KEY` missing — route returns 503.
- Upstream returns non-200.
- Upstream returns 200 with an `error` object inside the SSE stream.

All three produce one visitor-facing result: the assistant says it is
unavailable and offers a WhatsApp link built with `whatsappLink()`. The failure
is logged server-side. Nothing throws in the render path, matching how
`lib/cms.ts` and `app/actions/lead.ts` already degrade.

## Knowledge base

The knowledge base is a TypeScript const, authored in Indonesian, covering
identity, services, pricing, hosting, ownership, ordering, and the response
rules. Its most important content is its constraints, not its catalogue.

Behavioural rules carried into the system prompt:

- Never invent a price. Anything outside the published list routes to WhatsApp.
- Never promise a deadline, a ranking, or a guarantee.
- Never claim affiliation with v0.dev or Vercel.
- Avoid "dijamin", "100% aman", "unlimited".
- Answer in Indonesian, professionally and concisely.
- Route to a human whenever the question exceeds what is written here.

### Pricing

The landing page package is **Rp1.500.000**. This matches the `website` floor in
`lib/data/estimator.ts` (`base.min = 1_500_000`), so the chat and `/estimate`
agree. An earlier draft of the knowledge base said Rp500.000; that figure is
superseded and must not appear anywhere.

## UI

Bubble fixed bottom-right, on every page. Panel uses `rounded-surface`,
`border-border`, and the cyan accent for the send control — the site's existing
tokens, no new ones.

- Three starter questions, so the panel is never an empty box.
- Plain text output with `whitespace-pre-wrap`. No markdown renderer.
- Motion collapses under `prefers-reduced-motion` via `useReducedMotion`.
- The widget is dynamically imported: nothing above the fold depends on it.

## Testing

- `npm run lint`, `npm run typecheck`, `npm run build`.
- Manual: ask a question the knowledge base answers; ask one it does not, and
  confirm the WhatsApp handoff; ask for a price outside the list, and confirm no
  number is invented.
- Failure path: unset `OMNIROUTE_API_KEY` and confirm the fallback renders.
