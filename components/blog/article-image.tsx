import Image from "next/image";

/**
 * Image inside an article body.
 *
 * The generator writes these nodes; see `src/lib/lexical.ts` in
 * `backend-vour-studio` for the shape. Pictures come from Wikimedia Commons,
 * Openverse and Unsplash, and several of those licences require attribution,
 * so the credit line is part of the component rather than optional decoration.
 */
export type ArticleImageNode = {
  src?: string;
  altText?: string;
  caption?: string;
  credit?: string | null;
  creditUrl?: string | null;
  license?: string | null;
  width?: number | null;
  height?: number | null;
};

export function ArticleImage({ node }: { node: ArticleImageNode }) {
  const src = node.src?.trim();
  if (!src) return null;

  const alt = node.altText?.trim() || "";
  const caption = node.caption?.trim();
  const credit = node.credit?.trim();
  const license = node.license?.trim();
  const hasDimensions = Boolean(node.width && node.height);

  return (
    <figure className="article-figure">
      {hasDimensions ? (
        <Image
          src={src}
          alt={alt}
          width={node.width as number}
          height={node.height as number}
          sizes="(max-width: 48rem) 100vw, 42rem"
          className="h-auto w-full rounded-surface border border-border bg-bg-subtle"
        />
      ) : (
        // Dimensions are only missing on rows written before the search started
        // recording them. Without them `next/image` cannot reserve the box, and
        // a wrong guess is worse than no optimisation.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-surface border border-border bg-bg-subtle"
        />
      )}

      {(caption || credit) && (
        <figcaption>
          {caption}
          {credit && (
            <span className="article-figure-credit">
              {caption ? " · " : ""}
              {node.creditUrl ? (
                <a href={node.creditUrl} target="_blank" rel="noopener noreferrer nofollow">
                  {credit}
                </a>
              ) : (
                credit
              )}
              {license ? ` (${license})` : ""}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
