import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";

type Props = {
  /** Inline markdown (e.g. *italic*, **bold**). */
  source: string;
};

/**
 * Renders a short inline markdown string (no block elements) for titles and TOC.
 */
export async function InlineMarkdown({ source }: Props) {
  const trimmed = source.trim();
  if (!trimmed) {
    return null;
  }

  const { content } = await compileMDX({
    source: trimmed,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkSmartypants],
        rehypePlugins: [rehypeKatex],
      },
    },
    components: {
      p: ({ children }) => <span>{children}</span>,
    },
  });

  return <span className="inline-md">{content}</span>;
}
