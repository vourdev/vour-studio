import { sanitizeSvg } from "@/lib/blog/svg-sanitize";

/** Inlined so `currentColor` strokes inherit the text colour. Sanitized again here:
 * older rows predate the generator's sanitizer, and this is where markup becomes HTML. */
export type ArticleDiagramNode = {
  code?: string;
  caption?: string;
};

export function ArticleDiagram({ node }: { node: ArticleDiagramNode }) {
  const cleaned = node.code ? sanitizeSvg(node.code) : null;
  if (!cleaned) return null;

  const caption = node.caption?.trim();

  return (
    <figure className="article-figure article-diagram">
      <div
        className="article-diagram-canvas"
        // Sanitized above by an allow-list of shapes, text and gradients.
        dangerouslySetInnerHTML={{ __html: cleaned.svg }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
