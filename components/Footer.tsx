import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import { FontAwesome } from "@data/FontAwesome";
import { adapt } from "@styles/Adaptive";
import { Colour } from "@styles/Colours";
import { Section, SectionProps } from "./Section";

const IconTextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  :hover {
    cursor: pointer;
  }
`;

interface FooterLinkProps {
  href: string;
  icon: IconDefinition;
  children: ReactNode;
}

const FooterLink = (props: FooterLinkProps) => (
  <IconTextLink href={props.href}>
    <FontAwesomeIcon icon={props.icon} className={"fa-fw"} />
    {props.children}
  </IconTextLink>
);

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  column-gap: 24px;
  row-gap: 12px;

  ${adapt({
    mobile: `font-size: 10pt;`,
    desktop: `font-size: 12pt;`,
  })}

  a {
    color: inherit;
    text-decoration-thickness: 1px;
  }
`;

const FooterLastUpdated = styled.p`
  margin: 0;
  color: ${Colour({ h: "blue", s: "faded", v: "lighter" })};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 20px;
`;

export const Footer = (props: SectionProps) => (
  <Section {...props}>
    <FooterContainer>
      <FooterLastUpdated>Last updated April 22, 2026.</FooterLastUpdated>
      <FooterLinks>
        <FooterLink href={"/blog"} icon={FontAwesome.BLOG}>
          Blog
        </FooterLink>
        <FooterLink
          href={"https://github.com/xujustinj"}
          icon={FontAwesome.GITHUB}
        >
          GitHub
        </FooterLink>
        <FooterLink
          href={"https://www.linkedin.com/in/xujustinj/"}
          icon={FontAwesome.LINKEDIN}
        >
          LinkedIn
        </FooterLink>
        <FooterLink href={"/resume.pdf"} icon={FontAwesome.RESUME}>
          Résumé
        </FooterLink>
      </FooterLinks>
    </FooterContainer>
  </Section>
);
