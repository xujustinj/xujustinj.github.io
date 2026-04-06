"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ISO date string `YYYY-MM-DD` */
  iso: string;
};

/**
 * Renders a human-readable date using the visitor’s locale (`undefined` in
 * `toLocaleDateString`). First paint uses the ISO string so server and client
 * HTML match; then updates after mount (brief flash possible).
 */
export function FormattedPostDate({ iso }: Props) {
  const [label, setLabel] = useState(iso);

  useEffect(() => {
    const d = new Date(`${iso}T12:00:00Z`);
    setLabel(
      d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, [iso]);

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {label}
    </time>
  );
}
