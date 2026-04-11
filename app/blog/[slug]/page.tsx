import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styled, { css } from "styled-components";
import { AuthorsLine } from "../../../components/blog/AuthorsLine";
import { PublicationMetaInline } from "../../../components/blog/PublicationMeta";
import {
  PostAuthors,
  PostDate,
  PostRepost,
  PostSyndication,
  PostTitle,
  Prose,
} from "../../../components/blog/BlogProse";
import {
  type TocItem,
  TableOfContents,
} from "../../../components/blog/TableOfContents";
import { Section } from "../../../components/Section";
import { compileMDX } from "next-mdx-remote/rsc";
import { InlineMarkdown } from "../../../components/blog/InlineMarkdown";
import { getAllBlogSlugs, getBlogSourceBySlug } from "../../../lib/blog";
import { blogPostMdxCompileOptions } from "../../../lib/mdx";
import { stripInlineMarkdown } from "../../../lib/markdownPlain";
import { adapt, MOBILE_BREAKPOINT } from "../../../styles/Adaptive";
import {
  BLOG_RAIL_WIDTH,
  POST_ARTICLE_SHELL_MAX_ARTICLE_ONLY,
  POST_ARTICLE_SHELL_MAX_PLAIN,
  POST_ARTICLE_SHELL_MAX_SIDENOTES,
  POST_ARTICLE_SHELL_MAX_SIDENOTES_NO_TOC,
  POST_LAYOUT_GAP,
} from "../../../styles/blogLayout";
import { bgLight } from "../../../styles/Colours";

const PostArticleShell = styled.div<{ $hasToc: boolean }>`
  ${adapt({
    mobile: `
      display: block;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
      .post-sidenote-gutter {
        display: none;
      }
    `,
    desktop: `
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      gap: ${POST_LAYOUT_GAP};
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      .post-sidenote-gutter {
        display: none;
      }
      &:has(.post-body .sidenote-row) .post-sidenote-gutter,
      &:has(.post-body section.footnotes) .post-sidenote-gutter {
        display: block;
        flex: 0 0 ${BLOG_RAIL_WIDTH};
        width: ${BLOG_RAIL_WIDTH};
        min-width: 0;
        box-sizing: border-box;
      }
    `,
  })}

  ${({ $hasToc }) => css`
    @media (min-width: ${MOBILE_BREAKPOINT}) {
      max-width: min(
        ${$hasToc ? POST_ARTICLE_SHELL_MAX_PLAIN : POST_ARTICLE_SHELL_MAX_ARTICLE_ONLY},
        100%
      );

      &:has(.post-body .sidenote-row),
      &:has(.post-body section.footnotes) {
        max-width: min(
          ${$hasToc
            ? POST_ARTICLE_SHELL_MAX_SIDENOTES
            : POST_ARTICLE_SHELL_MAX_SIDENOTES_NO_TOC},
          100%
        );
      }
    }
  `}
`;

const PostProse = styled(Prose)`
  ${adapt({
    mobile: ``,
    desktop: `
      flex: 0 1 auto;
      min-width: 0;
      margin-left: 0;
      margin-right: 0;
    `,
  })}
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  font-size: 11pt;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

const BackLabel = styled.span`
  ${adapt({
    mobile: `font-size: 11pt;`,
    desktop: `font-size: 12pt;`,
  })}
`;

type Heading = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string): string {
  return stripInlineMarkdown(text)
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(
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

    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
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

function makeHeadingId(
  text: string,
  seen: Map<string, number>,
): string {
  const base = slugifyHeading(text);
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = getBlogSourceBySlug(slug);
  } catch {
    return { title: "Not found" };
  }
  const fm = post.frontmatter;
  const authorsMeta =
    fm.authors?.map((a) =>
      a.url !== undefined ? { name: a.name, url: a.url } : { name: a.name },
    ) ?? undefined;

  return {
    title: stripInlineMarkdown(fm.title),
    description: fm.excerpt,
    ...(authorsMeta !== undefined ? { authors: authorsMeta } : {}),
    openGraph: {
      type: "article",
      ...(fm.repostDate !== undefined || fm.originalDate !== undefined
        ? { publishedTime: fm.repostDate ?? fm.originalDate }
        : {}),
      ...(fm.authors !== undefined && fm.authors.length > 0
        ? { authors: fm.authors.map((a) => a.name) }
        : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getBlogSourceBySlug(slug);
  } catch {
    notFound();
  }

  const headingIds = new Map<string, number>();
  const titleId = makeHeadingId(post.frontmatter.title, headingIds);
  const bodyHeadings = extractHeadings(post.content, headingIds);
  const showToc = bodyHeadings.length > 0;
  const toc: TocItem[] = showToc
    ? [
        {
          id: titleId,
          level: 1,
          label: <InlineMarkdown source={post.frontmatter.title} />,
        },
        ...bodyHeadings.map((h) => ({
          id: h.id,
          level: h.level,
          label: <InlineMarkdown source={h.text} />,
        })),
      ]
    : [];

  // IDs must come only from `extractHeadings` + title above. Calling
  // `makeHeadingId` again during MDX render would re-increment the slug map
  // and produce different ids than the TOC (e.g. `foo` vs `foo-2`).
  let bodyHeadingIndex = 0;

  const { content } = await compileMDX({
    source: post.content,
    options: blogPostMdxCompileOptions,
    components: {
      h2: ({ children, ...rest }) => {
        const h = bodyHeadings[bodyHeadingIndex];
        if (h?.level === 2) {
          bodyHeadingIndex++;
          return (
            <h2 {...rest} id={h.id}>
              {children}
            </h2>
          );
        }
        return <h2 {...rest}>{children}</h2>;
      },
      h3: ({ children, ...rest }) => {
        const h = bodyHeadings[bodyHeadingIndex];
        if (h?.level === 3) {
          bodyHeadingIndex++;
          return (
            <h3 {...rest} id={h.id}>
              {children}
            </h3>
          );
        }
        return <h3 {...rest}>{children}</h3>;
      },
    },
  });

  const fm = post.frontmatter;
  const hasSyndication = Boolean(fm.originalDate && fm.originalPublication);
  const hasRepost = Boolean(fm.repostDate);

  return (
    <Section $foreground="black" $background={bgLight} id="post">
      <PostArticleShell $hasToc={showToc}>
        {showToc ? <TableOfContents items={toc} /> : null}
        <PostProse>
          <BackLink href="/blog">
            <BackLabel>← Blog</BackLabel>
          </BackLink>
          <PostTitle id={titleId}>
            <InlineMarkdown source={post.frontmatter.title} />
          </PostTitle>
          {fm.authors !== undefined && fm.authors.length > 0 && (
            <PostAuthors>
              By <AuthorsLine authors={fm.authors} />
            </PostAuthors>
          )}
          {!hasRepost && !hasSyndication && fm.originalDate !== undefined && (
            <PostDate>
              <PublicationMetaInline fm={fm} />
            </PostDate>
          )}
          {hasRepost && !hasSyndication && (
            <PostRepost>
              <PublicationMetaInline fm={fm} />
            </PostRepost>
          )}
          {hasSyndication && (
            <PostSyndication>
              <PublicationMetaInline fm={fm} />
            </PostSyndication>
          )}
          {content}
        </PostProse>
        <div
          className="post-sidenote-gutter"
          aria-hidden="true"
        />
      </PostArticleShell>
    </Section>
  );
}
