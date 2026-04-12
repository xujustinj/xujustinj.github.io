import Link from "next/link";
import styled from "styled-components";
import { sidenoteProseStyles } from "./sidenoteProseStyles";
import { adapt } from "../../styles/Adaptive";
import { Colour, primary } from "../../styles/Colours";

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
    & > p:last-child {
      margin-bottom: 0;
    }

    figure {
      margin: 0 0 1em 0;
      text-align: center;
    }

    figure img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      height: auto;
    }

    figcaption {
      margin-top: 0.5em;
      ${adapt({
        mobile: `font-size: 10.5pt;`,
        desktop: `font-size: 11pt;`,
      })}
      line-height: 1.45;
      color: ${Colour({ v: "medium" })};
      text-align: center;
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
  }

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
`;

export const PostDate = styled.p<{ $bottom?: string }>`
  margin: 0 0 ${(p) => p.$bottom ?? "24px"} 0;
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
export const PostRepost = styled.p<{ $compactBottom?: boolean }>`
  margin: 0 0 ${(p) => (p.$compactBottom ? "8px" : "24px")} 0;
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

export const TodoBanner = styled.p`
  margin: 0 0 24px 0;
  padding: 12px 16px;
  border-left: 4px solid ${primary};
  background: ${Colour({ h: "blue", s: "faded", v: "lightest" })};
  ${adapt({
    mobile: `font-size: 11pt;`,
    desktop: `font-size: 12pt;`,
  })}
  line-height: 1.45;
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
