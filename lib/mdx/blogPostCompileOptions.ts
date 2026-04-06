import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import { rehypePairSidenotes } from "./rehypePairSidenotes";
import { rehypeWrapPostBody } from "./rehypeWrapPostBody";

type BlogPostMdxOptions = NonNullable<MDXRemoteProps["options"]>;

/**
 * `next-mdx-remote` options for blog post MDX: GFM (sidenotes via [^…], tables,
 * etc.), smart typography, and a single `.post-body` wrapper for layout.
 */
export const blogPostMdxCompileOptions: BlogPostMdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [rehypeWrapPostBody, rehypePairSidenotes],
  },
};
