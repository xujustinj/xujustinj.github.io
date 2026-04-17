import {
  createElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Heading } from "./markdownHeadings";
import { documentMdxCompileOptions } from "./mdxCompileOptions";
import { mdxComponents } from "./mdxComponents";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingTag = (typeof HEADING_TAGS)[number];

function headingComponentsWithIds(bodyHeadings: Heading[]) {
  let bodyHeadingIndex = 0;

  const out: Partial<
    Record<HeadingTag, (props: ComponentPropsWithoutRef<HeadingTag>) => ReactElement>
  > = {};

  for (let i = 0; i < HEADING_TAGS.length; i++) {
    const tag = HEADING_TAGS[i];
    const level = (i + 1) as Heading["level"];
    out[tag] = ({ children, ...rest }) => {
      const h = bodyHeadings[bodyHeadingIndex];
      if (h?.level === level) {
        bodyHeadingIndex++;
        return createElement(tag, { ...rest, id: h.id }, children);
      }
      return createElement(tag, rest, children);
    };
  }

  return out as Record<
    HeadingTag,
    (props: ComponentPropsWithoutRef<HeadingTag>) => ReactElement
  >;
}

/**
 * Renders MDX using the shared document pipeline ({@link documentMdxCompileOptions})
 * and injects stable heading `id`s for `h1`–`h6` when `bodyHeadings` is non-empty.
 *
 * **Why headings are overridden when `bodyHeadings` has entries:** The table of
 * contents is built by scanning the raw markdown (`extractHeadings`) to compute
 * stable `id`s (slugify, duplicates). MDX does not add those same ids to
 * rendered headings, so we inject `id={h.id}` in document order to match the TOC
 * and sidenote anchors. We must not call `makeHeadingId` again during render or
 * the slug counter would diverge from `extractHeadings`.
 */
export async function compileMdx(source: string, bodyHeadings: Heading[]) {
  if (bodyHeadings.length === 0) {
    return compileMDX({
      source,
      options: documentMdxCompileOptions,
      components: mdxComponents,
    });
  }

  return compileMDX({
    source,
    options: documentMdxCompileOptions,
    components: {
      ...mdxComponents,
      ...headingComponentsWithIds(bodyHeadings),
    },
  });
}
