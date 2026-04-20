import type { Metadata } from "next";
import {
  BlogIndexHeading,
  BlogIndexShell,
  PostExcerpt,
  PostLink,
  PostList,
  PostListItem,
  PostMetaLine,
} from "@components/blog/BlogProse";
import { Section } from "@components/Section";
import { PublicationMetaInline } from "@components/blog/PublicationMeta";
import { InlineMarkdown } from "@components/blog/InlineMarkdown";
import { getBlogIndex } from "@lib/blog";
import { bgLight } from "@styles/Colours";

export const metadata: Metadata = {
  title: "Blog",
};

type BlogIndexPageProps = {
  searchParams: Promise<{ series?: string | string[] }>;
};

function firstQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    const first = value[0];
    return typeof first === "string" ? first : undefined;
  }
  return value;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const sp = await searchParams;
  const seriesRaw = firstQueryValue(sp.series)?.trim();
  const posts = getBlogIndex(
    seriesRaw !== undefined && seriesRaw.length > 0
      ? { series: seriesRaw }
      : undefined,
  );

  const listHeading =
    seriesRaw !== undefined && seriesRaw.length > 0
      ? posts[0] !== undefined && "seriesTitle" in posts[0]
        ? posts[0].seriesTitle
        : seriesRaw
      : "All Posts";

  return (
    <Section $foreground="black" $background={bgLight} id="blog">
      <BlogIndexShell>
        <BlogIndexHeading>
          <InlineMarkdown source={listHeading} />
        </BlogIndexHeading>
        <PostList>
          {posts.map((post) => (
            <PostListItem key={post.slug}>
              <PostLink href={`/blog/${post.slug}`}>
                <InlineMarkdown source={post.title} />
              </PostLink>
              <PostMetaLine>
                <PublicationMetaInline fm={post} />
              </PostMetaLine>
              {post.excerpt === undefined ? null : (
                <PostExcerpt>
                  <InlineMarkdown source={post.excerpt} />
                </PostExcerpt>
              )}
            </PostListItem>
          ))}
        </PostList>
      </BlogIndexShell>
    </Section>
  );
}
