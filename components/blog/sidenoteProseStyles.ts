import { css } from "styled-components";
import {
  BLOG_RAIL_WIDTH,
  POST_LAYOUT_GAP,
} from "../../styles/blogLayout";
import { MOBILE_MAX_WIDTH_PX } from "../../styles/Adaptive";
import { Colour } from "../../styles/Colours";

/** Margin sidenotes for viewports wider than mobile (same threshold as `adapt`). */
const SIDENOTE_DESKTOP_MIN_PX = MOBILE_MAX_WIDTH_PX + 1;

/** GFM footnotes → `.sidenote-row`; unpaired defs stay in `section.footnotes`. */
export const sidenoteProseStyles = css`
  .post-body {
    display: block;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: ${SIDENOTE_DESKTOP_MIN_PX}px) {
    &:has(.post-body .sidenote-row),
    &:has(.post-body section.footnotes) {
      max-width: min(42rem, 100%);
    }

    /* Body measure: exclude lists/blockquote so marker margins stay correct. */
    &:has(.post-body .sidenote-row)
      .post-body
      > :not(.sidenote-row):not(ul):not(ol):not(blockquote) {
      max-width: 42rem;
      margin-left: 0;
      margin-right: auto;
      width: 100%;
    }

    &:has(.post-body .sidenote-row) .post-body :is(ul, ol) {
      box-sizing: border-box;
      max-width: min(42rem, 100%);
      min-width: 0;
      margin-right: auto;
      overflow-wrap: break-word;
    }

    &:has(.post-body .sidenote-row) .post-body :is(ul, ol) li {
      min-width: 0;
      overflow-wrap: break-word;
    }

    .sidenote-row {
      position: relative;
      display: block;
      width: 100%;
      max-width: 42rem;
      margin-left: 0;
      margin-right: auto;
      box-sizing: border-box;
    }

    .sidenote-anchor {
      position: relative;
      max-width: 42rem;
      width: 100%;
    }

    .sidenote-main {
      width: 100%;
      max-width: 42rem;
    }

    .sidenote-margin {
      position: absolute;
      left: 100%;
      top: 0;
      margin-left: ${POST_LAYOUT_GAP};
      width: ${BLOG_RAIL_WIDTH};
      box-sizing: border-box;
      padding-left: 12px;
      border-left: 1px solid ${Colour({ v: "lighter" })};
      font-size: 10pt;
      line-height: 1.45;
      color: ${Colour({ v: "medium" })};
    }

    .sidenote-margin .sidenote + .sidenote {
      margin-top: 0.75em;
    }

    .sidenote {
      display: flex;
      gap: 0.35em;
      align-items: flex-start;
    }

    .sidenote-ref {
      flex-shrink: 0;
      font-weight: 700;
      line-height: 1.45;
    }
  }

  .post-body section.footnotes {
    margin: 0;
    padding: 0;
  }

  .post-body section.footnotes ol {
    margin: 0;
    padding: 0;
    list-style-position: outside;
    padding-left: 1.1em;
  }

  .post-body section.footnotes li {
    margin: 0 0 0.75em 0;
  }

  .post-body section.footnotes li:last-child {
    margin-bottom: 0;
  }

  .post-body section.footnotes p {
    margin: 0;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    .sidenote-row {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      width: 100%;
      max-width: 42rem;
    }

    .sidenote-anchor {
      width: 100%;
      max-width: 42rem;
    }

    .sidenote-margin {
      position: static;
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      padding-left: 12px;
      border-left: 1px solid ${Colour({ v: "lighter" })};
      font-size: 10pt;
      line-height: 1.45;
      color: ${Colour({ v: "medium" })};
    }

    .sidenote {
      display: flex;
      gap: 0.35em;
      align-items: flex-start;
    }

    .sidenote-ref {
      flex-shrink: 0;
      font-weight: 700;
      line-height: 1.45;
    }

    .post-body section.footnotes {
      margin-top: 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid ${Colour({ v: "lighter" })};
      font-size: 10pt;
      line-height: 1.45;
      color: ${Colour({ v: "medium" })};
    }
  }

  sup {
    font-size: 0.7em;
    line-height: 0;
    vertical-align: super;
  }

  .post-body sup a {
    text-decoration: none;
  }

  .post-body sup a:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;
