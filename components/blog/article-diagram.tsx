import { sanitizeSvg } from "@/lib/blog/svg-sanitize";

/**
 * Diagram inside an article body.
 *
 * The generator asks the model to draw the thing the section explains, because
 * for most of what this blog writes about no photograph exists: there is no
 * picture of the Vercel AI SDK, and a stock laptop beside a section on
 * streaming helps nobody.
 *
 * The markup is inlined rather than loaded as an image so it inherits the
 * page's text colour -- the diagrams are drawn with `currentColor`, which is
 * what lets one drawing read correctly against this site's near-black ground.
 *
 * It is sanitized again here even though the generator sanitized before
 * storing. Rows written before that pass existed are still in the table, and
 * this is the boundary where markup becomes HTML.
 */
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
        // Sanitized directly above by an allow-list that keeps shapes, text and
        // gradients and drops everything else, contents included.
        dangerouslySetInnerHTML={{ __html: cleaned.svg }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
