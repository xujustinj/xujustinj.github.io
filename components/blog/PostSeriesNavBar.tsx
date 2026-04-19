import Link from "next/link";
import styled, { css } from "styled-components";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { BlogNeighborNav } from "@models/Blog";
import { stripInlineMarkdown } from "@lib/markdownPlain";
import { adapt } from "@styles/Adaptive";
import { Colour } from "@styles/Colours";
import { InlineMarkdown } from "./InlineMarkdown";

/* ——— series neighbor links (prev / next) ——— */

const PartLine = styled.span`
  font-size: 0.8em;
`;

const TitleLine = styled.span``;

const neighborLinkSurface = css`
  ${adapt({
  mobile: `font-size: 9pt;`,
  desktop: `font-size: 10pt;`,
})}
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

const NeighborTextStack = styled.span`
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
`;

const PrevNeighborLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-align: left;
  ${neighborLinkSurface}
`;

const NextNeighborLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-align: right;
  ${neighborLinkSurface}
`;

function neighborLinkAriaLabel(neighbor: BlogNeighborNav): string {
  return `Part ${neighbor.seriesNumber}: ${stripInlineMarkdown(neighbor.title)}`;
}

/* ——— bar chrome + center label ——— */

const SeriesCenterRoot = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${adapt({
  mobile: `font-size: 11pt;`,
  desktop: `font-size: 12pt;`,
})}
  color: inherit;
`;

const Shell = styled.nav<{ $slot: "above-title" | "under-body" }>`
  width: 100%;
  padding: 0.5em 1em;
  background: ${Colour({ h: "blue", s: "faded", v: "lightest" })};
  border: 2px solid ${Colour({ h: "blue", s: "faded", v: "lighter" })};
  border-radius: 9999px;
  margin-top: ${({ $slot }) => $slot === "under-body" ? "2rem" : "0"};
  margin-bottom: ${({ $slot }) => $slot === "above-title" ? "2rem" : "0"};
  line-height: 1.15;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavSide = styled.div<{ $align: "left" | "right" }>`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === "left" ? "flex-start" : "flex-end"};
`;

const NavCenter = styled.div`
  flex: 0 1 auto;
  min-width: 0;
  text-align: center;
`;

type Props = {
  previous?: BlogNeighborNav;
  next?: BlogNeighborNav;
  series: string;
  seriesNumber: string;
  slot: "above-title" | "under-body";
};

export async function PostSeriesNavBar({
  previous,
  next,
  series,
  seriesNumber,
  slot,
}: Props) {
  const hasNeighbors = previous !== undefined || next !== undefined;

  let ariaLabel = "Series navigation";
  ariaLabel = `Part ${seriesNumber} of ${stripInlineMarkdown(series)}`;
  if (hasNeighbors) {
    ariaLabel += ". Previous and next posts";
  }

  return (
    <Shell $slot={slot} aria-label={ariaLabel}>
      <Inner>
        <NavSide $align="left">
          {previous !== undefined ? (
            <PrevNeighborLink
              href={`/blog/${previous.slug}`}
              rel="prev"
              aria-label={`Previous post: ${neighborLinkAriaLabel(previous)}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} aria-hidden />
              <NeighborTextStack>
                <PartLine>Part {previous.seriesNumber}</PartLine>
                <TitleLine>
                  <InlineMarkdown source={`**${previous.title}**`} />
                </TitleLine>
              </NeighborTextStack>
            </PrevNeighborLink>
          ) : null}
        </NavSide>
        <NavCenter>
          <SeriesCenterRoot>
            <PartLine>Part {seriesNumber} of</PartLine>
            <TitleLine>
              <InlineMarkdown source={`**${series}**`} />
            </TitleLine>
          </SeriesCenterRoot>
        </NavCenter>
        <NavSide $align="right">
          {next !== undefined ? (
            <NextNeighborLink
              href={`/blog/${next.slug}`}
              rel="next"
              aria-label={`Next post: ${neighborLinkAriaLabel(next)}`}>
              <NeighborTextStack>
                <PartLine>Part {next.seriesNumber}</PartLine>
                <TitleLine>
                  <InlineMarkdown source={`**${next.title}**`} />
                </TitleLine>
              </NeighborTextStack>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden />
            </NextNeighborLink>
          ) : null}
        </NavSide>
      </Inner>
    </Shell>
  );
}
