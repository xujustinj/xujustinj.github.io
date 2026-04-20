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
import type { BlogIndexItem } from "@models/Blog";
import { bgLight } from "@styles/Colours";

type Props = {
  listHeading: string;
  posts: BlogIndexItem[];
};

export function BlogIndexView({ listHeading, posts }: Props) {
  return (
    <Section $foreground="black" $background={bgLight} id="blog">
      <BlogIndexShell>
        <BlogIndexHeading>
          <InlineMarkdown source={listHeading} />
        </BlogIndexHeading>
        <PostList>
          {posts.map((post) => (
            <PostListItem key={post.slug}>
              <PostLink href={`/blog/post/${post.slug}`}>
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
