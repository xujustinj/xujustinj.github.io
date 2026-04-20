import type { Metadata } from "next";
import {
  BlogIndexShell,
  PostExcerpt,
  PostLink,
  PostList,
  PostListItem,
  PostMetaLine,
} from "@components/blog/BlogProse";
import { Section } from "@components/Section";
import { AuthorsLine } from "@components/blog/AuthorsLine";
import {
  PublicationMetaInline,
  publicationMetaVisible,
} from "@components/blog/PublicationMeta";
import { InlineMarkdown } from "@components/blog/InlineMarkdown";
import { getBlogIndex } from "@lib/blog";
import { bgLight } from "@styles/Colours";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogIndexPage() {
  const posts = getBlogIndex();

  return (
    <Section $foreground="black" $background={bgLight} id="blog">
      <BlogIndexShell>
        <PostList>
          {posts.map((post) => (
            <PostListItem key={post.slug}>
              <PostLink href={`/blog/${post.slug}`}>
                <InlineMarkdown source={post.title} />
              </PostLink>
              <PostMetaLine>
                {post.authors !== undefined && post.authors.length > 0 ? (
                  <>
                    <AuthorsLine authors={post.authors} />
                    {publicationMetaVisible(post) ? " · " : null}
                  </>
                ) : null}
                <PublicationMetaInline fm={post} />
              </PostMetaLine>
              {post.excerpt === undefined ? null : (
                <PostExcerpt>{post.excerpt}</PostExcerpt>
              )}
            </PostListItem>
          ))}
        </PostList>
      </BlogIndexShell>
    </Section>
  );
}
