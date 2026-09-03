import Link from "next/link";
import type { SerializedLexicalNode } from "lexical";
import {
  defaultJSXConverters,
  RichText,
  type JSXConverterArgs,
  type JSXConverters,
} from "@payloadcms/richtext-lexical/react";

import { ArticleDiagram, type ArticleDiagramNode } from "@/components/blog/article-diagram";
import { ArticleImage, type ArticleImageNode } from "@/components/blog/article-image";
import { CodeBlock } from "@/components/blog/code-block";
import type { RichTextContent } from "@/lib/data/posts";

/** Same link styling the old MDX renderer applied. */
const LINK_CLASS =
  "text-accent-text underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent";

/**
 * Article body renderer for CMS posts. Payload's Lexical JSON is rendered with
 * the official `RichText` component; the `.article-prose` styles in
 * `app/globals.css` carry the design-token styling the old MDX renderer
 * applied per element.
 *
 * Links mirror the previous MDX behavior: internal URLs use Next `<Link>`
 * (SPA navigation), external URLs open in a new tab with `rel="noopener"`.
 */
function renderLink({ node, nodesToJSX, converters }: JSXConverterArgs) {
  const linkNode = node as {
    fields?: { url?: string };
    /** Shape the blog generator wrote before Sep 2026. */
    url?: string;
    children?: SerializedLexicalNode[];
  };
  const href = linkNode.fields?.url ?? linkNode.url ?? "#";
  const children = nodesToJSX({ nodes: linkNode.children ?? [], converters });
  return href.startsWith("/") ? (
    <Link href={href} className={LINK_CLASS}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {children}
    </a>
  );
}

/**
 * Custom converter for `code` blocks (fenced code blocks from Markdown).
 * Renders an interactive CodeBlock component with Copy button & language header.
 */
function renderCodeBlock({ node }: JSXConverterArgs) {
  const codeNode = node as {
    language?: string;
    children?: Array<{ text?: string; type?: string }>;
  };
  const lang = codeNode.language || "";
  const codeText =
    codeNode.children?.map((child) => child.text || "").join("\n") || "";

  return <CodeBlock code={codeText} language={lang} />;
}

/**
 * Custom converter for `code-highlight` nodes (children of code blocks).
 * Renders as plain text since the parent CodeBlock handles styling.
 */
function renderCodeHighlight({ node }: JSXConverterArgs) {
  const textNode = node as { text?: string };
  return <>{textNode.text || ""}</>;
}

/**
 * Images in the article body. Lexical has no image node of its own, so this
 * matches what `backend-vour-studio` writes -- see `makeImage` in its
 * `src/lib/lexical.ts`.
 */
function renderImage({ node }: JSXConverterArgs) {
  return <ArticleImage node={node as ArticleImageNode} />;
}

/**
 * Diagrams the model drew for the article. Same three-way agreement as `image`:
 * generator writes it, admin editor keeps it, this renders it.
 */
function renderDiagram({ node }: JSXConverterArgs) {
  return <ArticleDiagram node={node as ArticleDiagramNode} />;
}

const converters: JSXConverters = {
  ...defaultJSXConverters,
  image: renderImage,
  svg: renderDiagram,
  link: renderLink,
  autolink: renderLink,
  code: renderCodeBlock,
  "code-highlight": renderCodeHighlight,
};

export function ArticleContent({ content }: { content: RichTextContent }) {
  return (
    // disableContainer: RichText would otherwise wrap the body in its own div,
    // which would break the `> :first-child` reset in the prose styles.
    <div className="article-prose">
      <RichText data={content} converters={converters} disableContainer />
    </div>
  );
}
