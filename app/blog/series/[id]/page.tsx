import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexView } from "@components/blog/BlogIndexView";
import { getAllSeriesIds, getBlogIndex } from "@lib/blog";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllSeriesIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const posts = getBlogIndex({ series: id });
  if (posts.length === 0) {
    return { title: "Not found" };
  }
  const heading =
    posts[0] !== undefined && "seriesTitle" in posts[0]
      ? posts[0].seriesTitle
      : id;
  return { title: `${heading} · Blog` };
}

export default async function BlogSeriesPage({ params }: Props) {
  const { id } = await params;
  const posts = getBlogIndex({ series: id });
  if (posts.length === 0) {
    notFound();
  }
  const listHeading =
    posts[0] !== undefined && "seriesTitle" in posts[0]
      ? posts[0].seriesTitle
      : id;
  return <BlogIndexView listHeading={listHeading} posts={posts} />;
}
