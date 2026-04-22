"use client";

import Link from "next/link";
import { type ReactNode, useMemo } from "react";
import styled from "styled-components";
import { useTocSectionScroll } from "@hooks/useTocSectionScroll";
import type { HeadingLevel } from "@models/MarkdownHeading";
import { adapt } from "@styles/Adaptive";
import { BLOG_RAIL_WIDTH } from "@styles/blogLayout";
import { primary } from "@styles/Colours";

export type TocLevel = HeadingLevel;

export type TocItem = {
  id: string;
  /** Rendered inline markdown (built on the server). */
  label: ReactNode;
  level: TocLevel;
};

const TocContainer = styled.nav`
  ${adapt({
    mobile: `
      display: none;
    `,
    desktop: `
      display: block;
      flex-shrink: 0;
      width: ${BLOG_RAIL_WIDTH};
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    `,
  })}

  position: sticky;
  top: 72px;

  max-height: calc(100vh - 96px);
  overflow: auto;
  padding-right: 12px;

  /*
   * Match code-block scrollbars in BlogProse (8px, rounded, no buttons). Lighter
   * track/thumb for the page rail. Do not set scrollbar-width / scrollbar-color —
   * in Chromium they override ::-webkit-scrollbar-* and restore OS-style bars.
   */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    min-width: 0;
    height: 0;
    min-height: 0;
  }

  &::-webkit-scrollbar-button:horizontal:start:decrement,
  &::-webkit-scrollbar-button:horizontal:end:increment,
  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: none;
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background: hsl(215, 12%, 91%);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(215, 9%, 68%);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: hsl(215, 9%, 58%);
  }

  &::-webkit-scrollbar-corner {
    background: hsl(215, 12%, 91%);
  }
`;

const TocList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

/** H1: 12px, H2: 24px, H3: 36px */
const TocRow = styled.li<{ $active: boolean; $level: TocLevel }>`
  margin: 0;
  padding: 6px 0;
  padding-left: ${(p) => `${p.$level * 12}px`};

  border-left: 2px solid
    ${(p) => (p.$active ? primary : "transparent")};
`;

const TocLink = styled(Link)<{ $active: boolean; $level: TocLevel }>`
  display: inline-block;
  color: ${(p) => (p.$active ? primary : "inherit")};
  text-decoration: none;
  font-size: 11pt;
  font-weight: ${(p) =>
    p.$level === 1 ? 700 : p.$level === 2 ? 500 : 400};
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

export function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const { activeId, onTocNavigate } = useTocSectionScroll(ids);

  if (items.length === 0) return null;

  return (
    <TocContainer aria-label="Table of contents">
      <TocList>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <TocRow key={item.id} $active={active} $level={item.level}>
              <TocLink
                href={`#${item.id}`}
                $active={active}
                $level={item.level}
                onClick={() => onTocNavigate(item.id)}
              >
                {item.label}
              </TocLink>
            </TocRow>
          );
        })}
      </TocList>
    </TocContainer>
  );
}
