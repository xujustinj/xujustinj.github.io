import Link from "next/link";
import { Fragment } from "react";
import type { BlogAuthor } from "../../lib/blog";

/** Renders author names with optional links; comma-separated with “and” before the last. */
export function AuthorsLine({ authors }: { authors: BlogAuthor[] }) {
  if (authors.length === 0) return null;
  return (
    <>
      {authors.map((a, i) => {
        const node = a.url ? (
          <Link href={a.url}>{a.name}</Link>
        ) : (
          a.name
        );
        return (
          <Fragment key={`${a.name}-${i}`}>
            {i === 0 ? null : i === authors.length - 1 ? ", and " : ", "}
            {node}
          </Fragment>
        );
      })}
    </>
  );
}
