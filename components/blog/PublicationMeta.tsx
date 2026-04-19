import type { BlogFrontmatter } from "@lib/blog";
import { FormattedPostDate } from "./FormattedPostDate";

/** Shared copy for syndication + repost (post page and /blog index). */
export function PublicationMetaInline({ fm }: { fm: BlogFrontmatter }) {
  const hasSyndication = Boolean(fm.originalDate && fm.originalPublication);
  const hasRepost = Boolean(fm.repostDate);

  if (hasSyndication) {
    return (
      <>
        Originally published in{" "}
        {fm.originalUrl !== undefined && fm.originalUrl.length > 0 ? (
          <a
            href={fm.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fm.originalPublication}
          </a>
        ) : (
          fm.originalPublication
        )}{" "}
        on <FormattedPostDate iso={fm.originalDate!} />.
        {hasRepost && (
          <>
            {" "}
            Reposted <FormattedPostDate iso={fm.repostDate!} />.
          </>
        )}
      </>
    );
  }

  if (hasRepost) {
    return (
      <>
        Reposted <FormattedPostDate iso={fm.repostDate!} />
      </>
    );
  }

  if (fm.originalDate !== undefined) {
    return <FormattedPostDate iso={fm.originalDate} />;
  }

  return null;
}

export function publicationMetaVisible(fm: BlogFrontmatter): boolean {
  const hasSyndication = Boolean(fm.originalDate && fm.originalPublication);
  const hasRepost = Boolean(fm.repostDate);
  return (
    hasSyndication ||
    hasRepost ||
    fm.originalDate !== undefined
  );
}
