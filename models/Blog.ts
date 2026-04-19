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
