import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styled, { css } from "styled-components";
import { AuthorsLine } from "@components/blog/AuthorsLine";
import { PublicationMetaInline } from "@components/blog/PublicationMeta";
import {
  PostAuthors,
  PostDate,
  PostRepost,
  PostSyndication,
  PostTitle,
  Prose,
} from "@components/blog/BlogProse";
import { PostSeriesNavBar } from "@components/blog/PostSeriesNavBar";
import {
  type TocItem,
  TableOfContents,
} from "@components/blog/TableOfContents";
import { Section } from "@components/Section";
import { InlineMarkdown } from "@components/blog/InlineMarkdown";
import {
  getAllBlogSlugs,
  getBlogSourceBySlug,
  resolveBlogNeighbor,
} from "@lib/blog";
import { compileMdx, extractHeadings, makeHeadingId } from "@lib/mdx";
import { stripInlineMarkdown } from "@lib/markdownPlain";
import { adapt, MOBILE_BREAKPOINT } from "@styles/Adaptive";
import {
  BLOG_RAIL_WIDTH,
  POST_ARTICLE_SHELL_MAX_ARTICLE_ONLY,
  POST_ARTICLE_SHELL_MAX_PLAIN,
  POST_ARTICLE_SHELL_MAX_SIDENOTES,
  POST_ARTICLE_SHELL_MAX_SIDENOTES_NO_TOC,
  POST_LAYOUT_GAP,
} from "@styles/blogLayout";
import { bgLight } from "@styles/Colours";

const PostSidenoteGutter = styled.div.attrs({
  "aria-hidden": true,
})``;

const PostArticleShell = styled.div<{ $hasToc: boolean }>`
  ${adapt({
    mobile: `
      display: block;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
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
    `,
  })}

  ${PostSidenoteGutter} {
    display: none;
  }

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    &:has(.post-body .sidenote-row) ${PostSidenoteGutter},
    &:has(.post-body section.footnotes) ${PostSidenoteGutter} {
      display: block;
      flex: 0 0 ${BLOG_RAIL_WIDTH};
      width: ${BLOG_RAIL_WIDTH};
      min-width: 0;
      box-sizing: border-box;
    }
  }

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

  const { content } = await compileMdx(post.content, bodyHeadings);

  const fm = post.frontmatter;
  const hasSyndication = Boolean(fm.originalDate && fm.originalPublication);
  const hasRepost = Boolean(fm.repostDate);

  return (
    <Section $foreground="black" $background={bgLight} id="post">
      <PostArticleShell $hasToc={showToc}>
        {showToc ? <TableOfContents items={toc} /> : null}
        <PostProse>
          {("series" in fm) && (
            <PostSeriesNavBar
              previous={resolveBlogNeighbor(fm.previous)}
              next={resolveBlogNeighbor(fm.next)}
              series={fm.series}
              seriesNumber={fm.seriesNumber}
              slot="above-title"
            />
          )}
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
          {("series" in fm) && (<PostSeriesNavBar
            previous={resolveBlogNeighbor(fm.previous)}
            next={resolveBlogNeighbor(fm.next)}
            series={fm.series}
            seriesNumber={fm.seriesNumber}
            slot="under-body"
          />)}
        </PostProse>
        <PostSidenoteGutter />
      </PostArticleShell>
    </Section>
  );
}
