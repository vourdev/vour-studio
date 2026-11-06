/**
 * Allow-list sanitizer for model-written SVG: anything not named here is removed, so unknown input fails closed.
 * Copy of `src/lib/svg-sanitize.ts` in backend-vour-studio. Keep them in step: the allow-lists are the contract.
 */

/** Shapes, structure, text and gradients. No `<image>`, `<use>`, `<a>`,
 *  `<foreignObject>`, `<script>`, `<style>`, `<animate*>`. */
const ALLOWED_TAGS = new Set([
  'svg', 'g', 'defs', 'title', 'desc',
  'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan',
  'marker', 'clipPath', 'mask',
  'linearGradient', 'radialGradient', 'stop',
])

/** Geometry, presentation and accessibility only. No event handlers, no hrefs. */
const ALLOWED_ATTRS = new Set([
  'viewBox', 'xmlns', 'width', 'height', 'preserveAspectRatio', 'role', 'aria-labelledby', 'aria-label', 'id',
  'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'd', 'points',
  'dx', 'dy', 'transform', 'clip-path', 'mask', 'offset',
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity',
  'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset',
  'opacity', 'font-family', 'font-size', 'font-weight', 'font-style',
  'text-anchor', 'dominant-baseline', 'letter-spacing',
  'marker-end', 'marker-start', 'marker-mid',
  'markerWidth', 'markerHeight', 'refX', 'refY', 'orient', 'markerUnits',
  'gradientUnits', 'gradientTransform', 'stop-color', 'stop-opacity',
  'clipPathUnits', 'maskUnits',
])

/** A diagram past this is not a diagram; it is a traced photograph. */
const MAX_BYTES = 40_000

/** Only same-document `url(#id)` survives; `url(http...)` and `javascript:` do not. */
function safeAttrValue(name: string, value: string): string | null {
  const lowered = value.toLowerCase()
  if (lowered.includes('javascript:') || lowered.includes('data:text') || lowered.includes('<script')) return null
  if (lowered.includes('url(') && !/url\(\s*['"]?#/.test(lowered)) return null
  if (name === 'xmlns' && value !== 'http://www.w3.org/2000/svg') return null
  return value
}

export interface SanitizedSvg {
  svg: string
  /** Removed tag and attribute names, for the log. */
  stripped: string[]
}

/**
 * Walks the markup once, keeping allowed elements and dropping disallowed ones
 * together with everything inside them.
 *
 * An earlier version did this with a regex per element. It could not work: the
 * first match is the outermost `<svg>...</svg>`, which is allowed, so the
 * engine returned the whole document unchanged and never looked inside it. A
 * `<style>@import url(...)</style>` lost its tags and left the CSS behind as
 * loose text.
 */
export function sanitizeSvg(input: string): SanitizedSvg | null {
  const raw = input.trim()
  if (!raw.startsWith('<svg') || !raw.endsWith('</svg>')) return null
  if (raw.length > MAX_BYTES) return null

  const stripped: string[] = []
  const source = raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '')
    .replace(/<\?[\s\S]*?\?>/g, '')

  const out: string[] = []
  /** Tag whose subtree is being discarded, and how deep we are inside it. */
  let skipping: { tag: string; depth: number } | null = null

  const TOKEN = /<\/?([a-zA-Z][\w:-]*)((?:\s+[^\s=/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g
  let cursor = 0
  let token: RegExpExecArray | null

  while ((token = TOKEN.exec(source)) !== null) {
    const [full, tag, attrText, selfClose] = token as unknown as [string, string, string, string]
    const isClose = full.startsWith('</')
    const text = source.slice(cursor, token.index)
    cursor = token.index + full.length

    if (!skipping && text) out.push(text)

    if (skipping) {
      if (tag === skipping.tag) {
        if (isClose) {
          skipping.depth -= 1
          if (skipping.depth === 0) skipping = null
        } else if (!selfClose) {
          skipping.depth += 1
        }
      }
      continue
    }

    if (!ALLOWED_TAGS.has(tag)) {
      stripped.push(`<${tag}>`)
      // A self-closing or orphaned closing tag has no subtree to discard.
      if (!isClose && !selfClose) skipping = { tag, depth: 1 }
      continue
    }

    if (isClose) {
      out.push(`</${tag}>`)
      continue
    }

    const kept: string[] = []
    const attrPattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
    let attr: RegExpExecArray | null
    while ((attr = attrPattern.exec(attrText)) !== null) {
      const name = attr[1]
      const value = attr[2] ?? attr[3] ?? attr[4] ?? ''
      if (!ALLOWED_ATTRS.has(name)) {
        stripped.push(name)
        continue
      }
      const safe = safeAttrValue(name, value)
      if (safe === null) {
        stripped.push(name)
        continue
      }
      kept.push(`${name}="${safe.replace(/"/g, '&quot;')}"`)
    }

    out.push(`<${tag}${kept.length ? ' ' : ''}${kept.join(' ')}${selfClose ? '/' : ''}>`)
  }

  if (!skipping) out.push(source.slice(cursor))

  const trimmed = out.join('').trim()
  if (!trimmed.startsWith('<svg') || !trimmed.endsWith('</svg>')) return null

  return { svg: trimmed, stripped: [...new Set(stripped)] }
}
