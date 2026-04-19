import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogAuthor = {
  name: string;
  url?: string;
};

export type BlogFrontmatter = {
  title: string;
  /** ISO YYYY-MM-DD. Sort key for the blog index only — never shown in the UI. */
  date: string;
  /** When set, UI shows “Reposted …” with this date instead of `original-date`. */
  repostDate?: string;
  authors?: BlogAuthor[];
  excerpt?: string;
  /**
   * Optional. From `original-url` / `original`. When set, the syndication line
   * links `original-publication` to this URL.
   */
  originalUrl?: string;
  /** ISO date shown in the UI when there is no `repost-date` (and not duplicated when the syndication line already includes it). */
  originalDate?: string;
  /** Venue / issue line. Required with `original-date` for syndication. From `original-publication`. */
  originalPublication?: string;
} & (
  | {}
  | {
      /** Optional display name for a multi-part series (from `series`). */
      series: string;
      /** Part index within the series (from `series-number`). Not necessarily a number. */
      seriesNumber: string;
      /** Optional slug (no extension) of the previous post in a series. */
      previous?: string;
      /** Optional slug (no extension) of the next post in a series. */
      next?: string;
    }
);

export type BlogIndexItem = BlogFrontmatter & {
  slug: string;
};

/** Resolved target for series prev/next links (includes the neighbor post’s part index when set). */
export type BlogNeighborNav = {
  slug: string;
  title: string;
  seriesNumber: string;
};

type RawFrontmatter = Record<string, unknown>;

function pickString(
  obj: RawFrontmatter,
  ...keys: string[]
): string | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) {
      return v;
    }
  }
  return undefined;
}

function parseAuthors(data: RawFrontmatter): BlogAuthor[] | undefined {
  const raw = data.authors ?? data.author;
  if (raw === undefined) return undefined;
  if (typeof raw === "string") {
    const name = raw.trim();
    return name.length > 0 ? [{ name }] : undefined;
  }
  if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) {
    const o = raw as RawFrontmatter;
    const name = pickString(o, "name");
    if (name === undefined) return undefined;
    return [{ name, url: pickString(o, "url") }];
  }
  if (!Array.isArray(raw)) return undefined;
  const out: BlogAuthor[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const name = item.trim();
      if (name.length > 0) out.push({ name });
      continue;
    }
    if (typeof item === "object" && item !== null) {
      const o = item as RawFrontmatter;
      const name = pickString(o, "name");
      if (name !== undefined) {
        out.push({
          name,
          url: pickString(o, "url"),
        });
      }
    }
  }
  return out.length > 0 ? out : undefined;
}

function normalizeBlogFrontmatter(
  data: RawFrontmatter,
  slugForErrors: string,
): BlogFrontmatter {
  const title = pickString(data, "title");
  if (title === undefined) {
    throw new Error(`Blog post ${slugForErrors} missing title in frontmatter`);
  }

  const date = pickString(data, "date");
  if (date === undefined) {
    throw new Error(`Blog post ${slugForErrors} missing date (YYYY-MM-DD)`);
  }

  const repostDate = pickString(data, "repost-date", "repostDate");
  const authors = parseAuthors(data);

  const originalUrl = pickString(
    data,
    "original",
    "original-url",
    "originalUrl",
  );
  const originalDate = pickString(data, "original-date", "originalDate");
  const originalPublication = pickString(
    data,
    "original-publication",
    "originalPublication",
  );

  const series = pickString(data, "series");
  const seriesData =
    series !== undefined
      ? {
          series,
          previous: pickString(data, "previous"),
          next: pickString(data, "next"),
          seriesNumber: pickString(data, "series-number", "seriesNumber"),
        }
      : {};

  return {
    title,
    date,
    repostDate,
    authors,
    excerpt: pickString(data, "excerpt"),
    originalUrl,
    originalDate,
    originalPublication,
    ...seriesData,
  };
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    throw new Error(`Missing blog directory: ${BLOG_DIR}`);
  }
}

export function getAllBlogSlugs(): string[] {
  ensureBlogDir();
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.(mdx|md)$/, ""));
}

function readBlogFile(slug: string): { filePath: string; raw: string } {
  ensureBlogDir();

  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing blog post: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, raw };
}

export function getBlogIndex(): BlogIndexItem[] {
  const slugs = getAllBlogSlugs();
  const items = slugs.map((slug) => {
    const { raw } = readBlogFile(slug);
    const { data } = matter(raw);
    const fm = normalizeBlogFrontmatter(data as RawFrontmatter, slug);
    return {
      slug,
      ...fm,
    };
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogSourceBySlug(slug: string): {
  frontmatter: BlogFrontmatter;
  content: string;
} {
  const { raw } = readBlogFile(slug);
  const { data, content } = matter(raw);
  const fm = normalizeBlogFrontmatter(data as RawFrontmatter, slug);
  return {
    frontmatter: fm,
    content,
  };
}

/**
 * Resolves a neighbor slug from frontmatter to title + slug for prev/next navigation.
 * Returns undefined if the slug is missing or the post does not exist.
 */
export function resolveBlogNeighbor(
  slug: string | undefined,
): BlogNeighborNav | undefined {
  if (slug === undefined) return undefined;
  const trimmed = slug.trim();
  if (trimmed.length === 0) return undefined;
  try {
    const post = getBlogSourceBySlug(trimmed);
    const fm = post.frontmatter;
    if (!("seriesNumber" in fm)) {
      throw new Error(
        `Blog post ${trimmed} missing series number in frontmatter`,
      );
    }
    return {
      slug: trimmed,
      title: fm.title,
      seriesNumber: fm.seriesNumber,
    };
  } catch {
    return undefined;
  }
}
