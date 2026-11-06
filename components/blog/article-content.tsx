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

const LINK_CLASS =
  "text-accent-text underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent";

/** Internal links use `<Link>`; external links open in a new tab with `rel="noopener"`. */
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

/** Plain text: the parent CodeBlock handles styling. */
function renderCodeHighlight({ node }: JSXConverterArgs) {
  const textNode = node as { text?: string };
  return <>{textNode.text || ""}</>;
}

/** Lexical has no image node. Must match `makeImage` in backend-vour-studio's
 * `src/lib/lexical.ts` and the admin editor's ImageNode. */
function renderImage({ node }: JSXConverterArgs) {
  return <ArticleImage node={node as ArticleImageNode} />;
}

/** Same three-way contract as `image`: generator, admin editor, this converter. */
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
    // disableContainer keeps the prose `> :first-child` reset working.
    <div className="article-prose">
      <RichText data={content} converters={converters} disableContainer />
    </div>
  );
}
