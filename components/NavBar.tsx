import Link from "next/link";
import styled from "styled-components";
import { Colour } from "../styles/Colours";

// The NavBar is split into three segments: left, centre, and right.
const NavBarContainer = styled.div`
  /* Sizing */
  width: 100%;
  height: 40px;

  /* Child Layout */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;

  /* Appearance */
  background-color: ${Colour({ h: "blue", s: "muted", v: "dark" })};
  color: white;
`;

interface NavBarSegmentProps {
  $alignment: "start" | "center" | "end";
}
const NavBarSegment = styled.div<NavBarSegmentProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$alignment};
`;

const LogoContainer = styled(Link)`
  font-family: var(--font-ibm-plex-mono), monospace;
  font-size: 14pt;
  font-weight: bold;
  margin: 4px;
  text-decoration: none;
  color: white;
`;
const Logo = () => (
  <LogoContainer href="/">
    xujustinj
  </LogoContainer>
);

const PageTitle = styled.h1`
  margin: 0;
  font-size: 16pt;
  white-space: nowrap;
`;

export interface NavBarProps {
  title: string;
}
const NavBar = (props: NavBarProps) => (
  <NavBarContainer>
    <NavBarSegment $alignment="start">
      <Logo />
    </NavBarSegment>
    <NavBarSegment $alignment="center">
      <PageTitle>{props.title}</PageTitle>
    </NavBarSegment>
    <NavBarSegment $alignment="end" />
  </NavBarContainer>
);

export default NavBar;
