/** Viewport width at/under this matches `adapt` “mobile” (TOC hidden, sidenotes stacked, etc.). */
export const MOBILE_MAX_WIDTH_PX = 640;

export const MOBILE_BREAKPOINT = `${MOBILE_MAX_WIDTH_PX}px`;

export const adapt = (styles: { mobile: string; desktop: string }) => `
  ${styles.mobile ?? ""}
  @media (min-width: ${MOBILE_BREAKPOINT}) {
    ${styles.desktop ?? ""}
  }
`;
