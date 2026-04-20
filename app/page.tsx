import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { CardGrid } from "@components/CardGrid";
import { EmojiBulletItem } from "@components/EmojiBullet";
import { Section, SectionHeading } from "@components/Section";
import { Items } from "@data/Items";
import ProfileKyoto from "../public/assets/profile-kyoto.jpg";
import { adapt } from "@styles/Adaptive";
import { bgLight, bgDark } from "@styles/Colours";

const IntroContainer = styled.div`
  display: flex;
  ${adapt({
    mobile: `
      flex-direction: column;
    `,
    desktop: `
      flex-direction: row;
    `,
  })}
  gap: 32px;
  align-items: top;
`;

const IntroIcon = styled.div`
  ${adapt({
    mobile: `
      display: none;
    `,
    desktop: `
      display: inline;
    `,
  })}
  flex-grow: 0;
  flex-shrink: 0;
  width: min(200px, 40vw);
  height: min(200px, 40vw);
  border-radius: 16px;
  overflow: hidden;
`;

const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  gap: 8px;
  align-items: flex-start;

  ${adapt({
    mobile: `
      font-size: 12pt;
    `,
    desktop: `
      font-size: 14pt;
    `,
  })}

  > * {
    margin: 0;
  }

  a {
    color: inherit
  }
`;

const NameText = styled.h2`
  ${adapt({
    mobile: `
      font-size: 24pt;
    `,
    desktop: `
      font-size: 36pt;
    `,
  })}
  line-height: 100%;
  margin-bottom: 8px;
`;

export default function HomePage() {
  return (
    <>
      <Section $foreground="black" $background={bgLight} id="intro">
        <IntroContainer>
          <IntroIcon>
            <Image
              src={ProfileKyoto}
              alt={"Picture of Justin Xu"}
              width={200}
              height={200}
            />
          </IntroIcon>
          <IntroContent>
            <NameText>Justin Xu</NameText>
            <EmojiBulletItem $bullet={"🎓"}>
              MMath Computer Science student @UWaterloo
            </EmojiBulletItem>
            <EmojiBulletItem $bullet={"🔎"}>
              researching knowledge graphs with{" "}
              <Link href={"https://cs.uwaterloo.ca/~ppoupart/"}>
                Prof. Pascal Poupart
              </Link>
            </EmojiBulletItem>
            <EmojiBulletItem $bullet={"💻"}>
              writing,{" "}
              <Link
                href={
                  "/blog/google-sheets"
                }
              >
                spreadsheet hacking
              </Link>
              , web development
            </EmojiBulletItem>
            <EmojiBulletItem $bullet={"🕹️"}>
              bad at video games and bouldering
            </EmojiBulletItem>
          </IntroContent>
        </IntroContainer>
      </Section>

      <Section $foreground="white" $background={bgDark} id="featured">
        <SectionHeading>Featured Stuff</SectionHeading>
        <CardGrid items={Items.filter((item) => item.status === "featured")} />
      </Section>

      <Section $foreground="black" $background={bgLight} id="other">
        <SectionHeading>Other Stuff</SectionHeading>
        <CardGrid
          items={Items.filter(
            (item) => item.status !== "hidden" && item.status !== "featured",
          )}
        />
      </Section>
    </>
  );
}
