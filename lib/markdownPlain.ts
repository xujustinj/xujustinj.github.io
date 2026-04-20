/**
 * Strip common inline markdown for plain-text slugs and metadata titles.
 * Not a full parser; sufficient for typical titles and heading lines.
 */
export function stripInlineMarkdown(source: string): string {
  let t = source;
  t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
  t = t.replace(/\*([^*]+)\*/g, "$1");
  t = t.replace(/__([^_]+)__/g, "$1");
  t = t.replace(/_([^_]+)_/g, "$1");
  t = t.replace(/`([^`]+)`/g, "$1");
  t = t.replace(/\$([^$]+)\$/g, "$1");
  return t;
}
