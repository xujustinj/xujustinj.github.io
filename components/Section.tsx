import styled from "styled-components";
import { adapt } from "@styles/Adaptive";
import { SECTION_CONTENT_MAX_WIDTH } from "@styles/layout";

export interface SectionProps {
  $foreground: string;
  $background: string;
}
export const Section = styled.div<SectionProps>`
  color: ${(props) => props.$foreground};
  background: ${(props) => props.$background};
  ${adapt({
    mobile: `
      padding-left: max(calc(100% / 18), 16px);
      padding-right: max(calc(100% / 18), 16px);
      padding-top: 32px;
      padding-bottom: 32px;
    `,
    desktop: `
      box-sizing: border-box;
      padding-left: max(24px, calc((100% - ${SECTION_CONTENT_MAX_WIDTH}) / 2));
      padding-right: max(24px, calc((100% - ${SECTION_CONTENT_MAX_WIDTH}) / 2));
      padding-top: 48px;
      padding-bottom: 48px;
    `,
  })}
`;

export const SectionHeading = styled.h2`
  ${adapt({
    mobile: `font-size: 16pt;`,
    desktop: `font-size: 20pt;`,
  })}
  font-weight: 700;
  margin-top: 0;
`;
