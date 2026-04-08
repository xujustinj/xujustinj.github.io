import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { rehypePairSidenotes } from "./rehypePairSidenotes";
import { rehypeWrapPostBody } from "./rehypeWrapPostBody";

type BlogPostMdxOptions = NonNullable<MDXRemoteProps["options"]>;

/**
 * `next-mdx-remote` options for blog post MDX: GFM (sidenotes via [^…], tables,
 * etc.), KaTeX ($…$, $$…$$), smart typography, and a single `.post-body` wrapper.
 */
export const blogPostMdxCompileOptions: BlogPostMdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath, remarkSmartypants],
    rehypePlugins: [rehypeKatex, rehypeWrapPostBody, rehypePairSidenotes],
  },
};
