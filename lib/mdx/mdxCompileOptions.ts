import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { rehypePairSidenotes } from "./rehypePairSidenotes";
import { rehypeWrapPostBody } from "./rehypeWrapPostBody";
import { remarkSuperscript } from "./remarkSuperscript";

type MdxCompileOptions = NonNullable<MDXRemoteProps["options"]>;

const remarkPlugins = [remarkGfm, remarkMath, remarkSmartypants, remarkSuperscript];

/**
 * Shared Markdown/MDX preprocessing and math rendering. Used for every compile
 * path so inline snippets (titles, TOC labels) and full pages behave the same
 * for prose features (GFM, math, smart typography, Pandoc-style superscript, KaTeX).
 */
const rehypeBase = [rehypeKatex];

/**
 * Full-page / block MDX: KaTeX, `.post-body` wrapper, and sidenote pairing.
 * Use with {@link compileMdx} for article bodies and any future long-form MDX.
 */
export const documentMdxCompileOptions: MdxCompileOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins,
    rehypePlugins: [...rehypeBase, rehypeWrapPostBody, rehypePairSidenotes],
  },
};

/**
 * Short inline MDX (e.g. titles): same remark pipeline and KaTeX as
 * documents, but **no** `.post-body` wrapper or sidenote pairing — those need a
 * block root and would break inside headings.
 */
export const inlineMdxCompileOptions: MdxCompileOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins,
    rehypePlugins: rehypeBase,
  },
};
