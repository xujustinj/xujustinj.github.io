/** Markdown `#` … `######` heading depth. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Document-order heading from markdown `#` … `######` lines. */
export type Heading = {
  id: string;
  text: string;
  level: HeadingLevel;
};
