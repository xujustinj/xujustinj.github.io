import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { rehypePairSidenotes } from "./rehypePairSidenotes";
import { rehypeWrapPostBody } from "./rehypeWrapPostBody";
import { rehypeWrapTables } from "./rehypeWrapTables";
import { remarkSuperscript } from "./remarkSuperscript";
import type { KatexOptions } from "katex";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

type MdxCompileOptions = NonNullable<MDXRemoteProps["options"]>;

const remarkPlugins = [
  remarkGfm,
  remarkMath,
  remarkSmartypants,
  remarkSuperscript,
];

/**
 * Shared Markdown/MDX preprocessing and math rendering. Used for every compile
 * path so inline snippets (titles, TOC labels) and full pages behave the same
 * for prose features (GFM, math, smart typography, Pandoc-style superscript, KaTeX).
 */
/** Shiki themes: https://shiki.style/themes — dark blocks read better on this light layout than pale IDE themes. */
const rehypePrettyCodePlugin = [
  rehypePrettyCode,
  { theme: "github-dark", keepBackground: true },
] as const satisfies [typeof rehypePrettyCode, RehypePrettyCodeOptions];

/**
 * Custom KaTeX macros (see https://katex.org/docs/options.html#macros).
 * KaTeX preset macros cannot use optional `[]` like `\sinp[2]{x}`; use `\sinp{2}{x}`.
 */
const rehypeKatexPlugin = [
  rehypeKatex,
  {
    macros: {
      "\\flac": "\\left. {#1} \\middle/ {#2} \\right.",
      "\\pr": "\\left( {#1} \\right)",
      "\\vv": "\\left\\lvert {#1} \\right\\rvert",
      "\\abs": "\\vv{#1}",
      "\\size": "\\vv{#1}",
      "\\floor": "\\left\\lfloor {#1} \\right\\rfloor",
      "\\ceiling": "\\left\\lceil {#1} \\right\\rceil",
      "\\ceil": "\\ceiling",
      "\\prarg": "\\mathopen{} \\pr{#1} \\mathclose{}",
      "\\fnpr": "{#1}\\mathopen{} \\left( {#2} \\right) \\mathclose{}",
      "\\cosp": "\\fnpr{\\cos^{#1}}{#2}",
      "\\sinp": "\\fnpr{\\sin^{#1}}{#2}",
      "\\tanp": "\\fnpr{\\tan^{#1}}{#2}",
      "\\secp": "\\fnpr{\\sec^{#1}}{#2}",
      "\\cscp": "\\fnpr{\\csc^{#1}}{#2}",
      "\\cotp": "\\fnpr{\\cot^{#1}}{#2}",
      "\\arccosp": "\\fnpr{\\arccos}{#1}",
      "\\arcsinp": "\\fnpr{\\arcsin}{#1}",
      "\\arctanp": "\\fnpr{\\arctan}{#1}",
      "\\arcsecp": "\\fnpr{\\arcsec}{#1}",
      "\\arccscp": "\\fnpr{\\arccsc}{#1}",
      "\\arccotp": "\\fnpr{\\arccot}{#1}",
      "\\Gammap": "\\fnpr{\\Gamma}{#1}",
      "\\chromial": "\\fnpr{\\chi}{#1}",
    },
  },
] as const satisfies [typeof rehypeKatex, KatexOptions];

const rehypeBase = [rehypeKatexPlugin, rehypePrettyCodePlugin];

/**
 * Full-page / block MDX: KaTeX, `.post-body` wrapper, and sidenote pairing.
 * Use with {@link compileMdx} for article bodies and any future long-form MDX.
 */
export const documentMdxCompileOptions: MdxCompileOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins,
    rehypePlugins: [
      ...rehypeBase,
      rehypeWrapPostBody,
      rehypeWrapTables,
      rehypePairSidenotes,
    ],
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
