import { compileMDX } from "next-mdx-remote/rsc";
import styled from "styled-components";
import { inlineMdxCompileOptions } from "@lib/mdx/mdxCompileOptions";

type Props = {
  /** Inline markdown (e.g. *italic*, **bold**). */
  source: string;
};

/** Matches body prose: KaTeX ~1.21em is tall next to IBM Plex; normalize inline math. */
const InlineMdRoot = styled.span`
  .katex {
    font-size: 1em;
  }
`;

/**
 * Renders a short inline markdown string (no block elements) for titles and TOC.
 * Uses the same remark/KaTeX pipeline as full MDX ({@link inlineMdxCompileOptions}).
 */
export async function InlineMarkdown({ source }: Props) {
  const trimmed = source.trim();
  if (!trimmed) {
    return null;
  }

  const { content } = await compileMDX({
    source: trimmed,
    options: inlineMdxCompileOptions,
    components: {
      p: ({ children }) => <span>{children}</span>,
    },
  });

  return <InlineMdRoot>{content}</InlineMdRoot>;
}
