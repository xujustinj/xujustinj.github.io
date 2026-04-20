import Link from "next/link";
import styled from "styled-components";
import { sidenoteProseStyles } from "./sidenoteProseStyles";
import { adapt } from "@styles/Adaptive";
import { POST_ARTICLE_SHELL_MAX_ARTICLE_ONLY } from "@styles/blogLayout";
import { Colour } from "@styles/Colours";

export const Prose = styled.div`
  max-width: min(42rem, 100%);
  margin: 0 auto;
  ${adapt({
    mobile: `font-size: 12pt; line-height: 1.55;`,
    desktop: `font-size: 14pt; line-height: 1.6;`,
  })}

  ${sidenoteProseStyles}

  p {
    margin: 0 0 1em 0;
  }

  hr {
    margin: 1.75em 0;
    border: 0;
    border-top: 1px solid ${Colour({ v: "lighter" })};
  }

  /* GFM blockquotes: inset + left rule; nesting stacks another vertical bar. */
  blockquote {
    margin: 0 0 1em 0;
    padding: 0 0 0 1rem;
    border-left: 3px solid ${Colour({ v: "medium" })};
    font-style: normal;
  }

  blockquote blockquote {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  /* Only the last top-level paragraph in the MDX body, not paragraphs inside sidenote rows. */
  .post-body {
    & > p:last-child,
    & > hr:last-child {
      margin-bottom: 0;
    }

    /* GFM tables: narrow tables centered; wide tables scroll (rehypeWrapTables). */
    .post-body-table-wrap {
      display: flex;
      overflow-x: auto;
      margin: 0 0 1em 0;
      -webkit-overflow-scrolling: touch;
    }

    .post-body-table-wrap table {
      flex-shrink: 0;
      margin-inline: auto;
    }

    table {
      border-collapse: collapse;
      margin: 0 0 1em 0;
    }

    th,
    td {
      border: 1px solid ${Colour({ v: "lighter" })};
      padding: 0.45em 0.75em;
    }

    th {
      background: ${Colour({ h: "blue", s: "faded", v: "lightest" })};
    }

    figure {
      margin: 0 0 1em 0;
      text-align: center;
    }

    /* rehype-pretty-code: dark Shiki theme + figure spacing; avoid double margin vs global pre. */
    figure[data-rehype-pretty-code-figure] {
      text-align: left;
    }

    figure[data-rehype-pretty-code-figure] pre {
      margin: 0;
      /* Horizontal: no padding-right on pre — it does not add to scrollWidth; end gap lives on the inner code element. */
      padding: 12px 0 12px 16px;
      border: 1px solid hsla(210, 12%, 28%, 0.45);
      box-shadow: 0 1px 2px hsla(210, 20%, 10%, 0.12);
      /*
       * Custom scrollbars: do not set scrollbar-width / scrollbar-color here — in
       * Chromium (incl. Cursor’s Simple Browser) those override ::-webkit-scrollbar-*,
       * which brings back OS-style scrollbars with arrow buttons.
       */
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      &::-webkit-scrollbar-button {
        display: none;
        width: 0;
        min-width: 0;
        height: 0;
        min-height: 0;
      }

      &::-webkit-scrollbar-button:horizontal:start:decrement,
      &::-webkit-scrollbar-button:horizontal:end:increment,
      &::-webkit-scrollbar-button:vertical:start:decrement,
      &::-webkit-scrollbar-button:vertical:end:increment {
        display: none;
        width: 0;
        height: 0;
      }

      &::-webkit-scrollbar-track {
        background: hsl(215, 13%, 14%);
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: hsl(215, 11%, 38%);
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: hsl(215, 11%, 48%);
      }

      &::-webkit-scrollbar-corner {
        background: hsl(215, 13%, 14%);
      }
    }

    /*
     * Shiki uses display:grid on code; without width: max-content the grid stays
     * only as wide as the pre, so long lines overflow inside code and padding-right
     * does not extend scrollWidth. min-width:100% keeps short blocks full-width.
     */
    figure[data-rehype-pretty-code-figure] pre code {
      width: max-content;
      min-width: 100%;
      box-sizing: border-box;
      padding-inline-end: 1.25em;
    }

    /* Order-independent spacing: caption above or below via flex gap (not margin-top on figcaption). */
    figure:has(figcaption) {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.25em;
    }

    /* Non-caption blocks often carry prose margins; gap handles spacing inside the figure. */
    figure:has(figcaption) > :not(figcaption) {
      margin: 0;
      min-width: 0;
    }

    figure img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      height: auto;
    }

    /* Intrinsic-width media: stay centered; wrappers for embeds stay full-width (stretch). */
    figure:has(figcaption) > img {
      align-self: center;
    }

    figcaption {
      margin: 0;
      ${adapt({
        mobile: `font-size: 10.5pt;`,
        desktop: `font-size: 11pt;`,
      })}
      line-height: 1.45;
      color: ${Colour({ v: "medium" })};
      text-align: center;

      /* MDX often wraps caption text in a paragraph; global prose p margins would sit under the caption and read as a huge gap before the media when the caption is first. */
      p {
        margin: 0;
      }

      p + p {
        margin-top: 0.35em;
      }
    }
  }

  h2,
  h3 {
    margin: 1.6em 0 0.5em 0;
    line-height: 1.2;
    scroll-margin-top: 80px;
  }

  h2 {
    ${adapt({
      mobile: `font-size: 16pt;`,
      desktop: `font-size: 18pt;`,
    })}
    font-weight: 700;
  }

  h3 {
    ${adapt({
      mobile: `font-size: 13pt;`,
      desktop: `font-size: 14pt;`,
    })}
    font-weight: 700;
  }

  ul,
  ol {
    margin: 0 0 1em 1.25em;
    padding: 0;
  }

  li {
    margin: 0.25em 0;
  }

  code {
    font-family: var(--font-ibm-plex-mono), monospace;
    font-size: 0.95em;
    font-weight: 400;
  }

  /* Plain / non-Shiki pre (rare): tinted panel. Shiki blocks use theme background via inline style. */
  pre {
    margin: 0 0 1em 0;
    padding: 12px 16px;
    overflow: auto;
    border-radius: 12px;
    background: ${Colour({ h: "blue", s: "faded", v: "lightest" })};
  }

  pre code {
    font-size: 0.9em;
  }

  a {
    color: inherit;
    text-decoration-thickness: 1px;
  }
`;

export const PostTitle = styled.h1`
  scroll-margin-top: 80px;
  && {
    margin: 0 0 8px 0;
  }
  ${adapt({
    mobile: `font-size: 22pt;`,
    desktop: `font-size: 28pt;`,
  })}
  font-weight: 700;
  line-height: 1.15;
`;

export const PostDate = styled.p`
  margin: 0 0 24px 0;
  font-size: 11pt;
  color: ${Colour({ v: "medium" })};
`;

/** Byline above the date when `authors` is set. */
export const PostAuthors = styled.p`
  margin: 0 0 8px 0;
  font-size: 11pt;
  color: ${Colour({ v: "medium" })};
  line-height: 1.45;

  a {
    color: inherit;
    text-decoration-thickness: 1px;
  }
`;

/** Shown when `repost-date` is set (this site’s copy date). */
export const PostRepost = styled.p`
  margin: 0 0 24px 0;
  font-size: 11pt;
  color: ${Colour({ v: "medium" })};
`;

/** One line under the date when `original` is set in frontmatter. */
export const PostSyndication = styled.p`
  margin: 0 0 24px 0;
  font-size: 11pt;
  color: ${Colour({ v: "medium" })};
  line-height: 1.45;

  a {
    color: inherit;
    text-decoration-thickness: 1px;
  }
`;

/** Same measure as a post with no TOC/sidenotes (`PostArticleShell` + `Prose`). */
export const BlogIndexShell = styled.div`
  max-width: min(${POST_ARTICLE_SHELL_MAX_ARTICLE_ONLY}, 100%);
  margin-left: auto;
  margin-right: auto;
`;

/** Page title above the blog index list (`PostTitle`-sized). */
export const BlogIndexHeading = styled.h1`
  margin: 0 0 1.25rem 0;
  ${adapt({
    mobile: `font-size: 22pt;`,
    desktop: `font-size: 28pt;`,
  })}
  font-weight: 700;
  line-height: 1.15;
`;

export const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const PostListItem = styled.li`
  border-bottom: 1px solid ${Colour({ v: "lighter" })};
  padding: 16px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  ${adapt({
    mobile: `font-size: 14pt;`,
    desktop: `font-size: 16pt;`,
  })}

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

export const PostExcerpt = styled.p`
  margin: 8px 0 0 0;
  font-size: 11pt;
  color: ${Colour({ v: "dark" })};
  line-height: 1.45;
`;

export const PostMetaLine = styled.p`
  margin: 4px 0 0 0;
  font-size: 10pt;
  color: ${Colour({ v: "medium" })};
`;
