import { stripInlineMarkdown } from "@lib/markdownPlain";

/** Document-order heading from markdown `#` … `######` lines. */
export type Heading = { id: string; text: string; level: 1 | 2 | 3 | 4 | 5 | 6 };

function slugifyHeading(text: string): string {
  return stripInlineMarkdown(text)
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Scans markdown `#` … `######` lines (outside fenced code) so TOC ids match
 * the slug rules used when rendering headings.
 */
export function extractHeadings(
  source: string,
  seen: Map<string, number>,
): Heading[] {
  const headings: Heading[] = [];

  const lines = source.split(/\r?\n/);
  let inFence = false;

  for (const line of lines) {
    const fence = line.match(/^\s*```/);
    if (fence) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length as Heading["level"];
    const text = m[2].replace(/\s+#*\s*$/, "").trim();
    if (text.length === 0) continue;

    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;

    headings.push({ id, text, level });
  }

  return headings;
}

export function makeHeadingId(text: string, seen: Map<string, number>): string {
  const base = slugifyHeading(text);
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}
