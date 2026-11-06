import Image from "next/image";

/** Shape is set by `makeImage` in backend-vour-studio's `src/lib/lexical.ts`.
 * The credit line is required by the image licences. */
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
        // Older rows lack dimensions; a guessed size is worse than skipping `next/image`.
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
