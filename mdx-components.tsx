import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Prose styling for every MDX article. Required at the project root for
 * `@next/mdx` to work with the App Router.
 */
const components: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-12 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => <h3 className="mt-9 text-lg font-medium" {...props} />,
  p: (props) => (
    <p className="mt-5 max-w-[68ch] leading-relaxed text-text-muted" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 max-w-[68ch] list-disc space-y-2 pl-5 text-text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 max-w-[68ch] list-decimal space-y-2 pl-5 text-text-muted" {...props} />
  ),
  strong: (props) => <strong className="font-medium text-text" {...props} />,
  a: ({ href = "", children, ...props }) => {
    const internal = href.startsWith("/");
    const className =
      "text-accent-text underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent";
    return internal ? (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: (props) => (
    <blockquote
      className="mt-6 max-w-[68ch] border-l-2 border-accent pl-5 text-text-muted italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-control bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.875em] text-text"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-surface border border-border bg-bg-subtle p-5 font-mono text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
