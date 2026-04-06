/**
 * Shared layout for blog posts: TOC (left) and sidenote margin (right) use the
 * same width so the article measure sits in a symmetric frame.
 */
export const BLOG_RAIL_WIDTH = "200px";
export const POST_LAYOUT_GAP = "12px";

/** Outer cap for TOC + gap + article (42rem). Centered as one unit on the post page. */
export const POST_ARTICLE_SHELL_MAX_PLAIN = `calc(${BLOG_RAIL_WIDTH} + ${POST_LAYOUT_GAP} + 42rem)`;

/** Same when the article column includes sidenotes (42rem + gap + rail). */
export const POST_ARTICLE_SHELL_MAX_SIDENOTES = `calc(${BLOG_RAIL_WIDTH} + ${POST_LAYOUT_GAP} + 42rem + ${POST_LAYOUT_GAP} + ${BLOG_RAIL_WIDTH})`;
