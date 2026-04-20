import type { Metadata } from "next";
import { BlogIndexView } from "@components/blog/BlogIndexView";
import { getBlogIndex } from "@lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getBlogIndex();
  return <BlogIndexView listHeading="All Posts" posts={posts} />;
}
