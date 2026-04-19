import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Item } from "@models/Item";
import { adapt } from "@styles/Adaptive";
import { Colour, primary } from "@styles/Colours";
import { TagBubble } from "./TagBubble";

interface CardContainerProps {
  $size: number;
}
const CardContainer = styled.div<CardContainerProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  position: relative;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.5s;

  > .overlay {
    ${adapt({
      mobile: `
        opacity: 1;
        visibility: visible;
      `,
      desktop: `
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s, visibility 0.5s;
      `,
    })}
  }

  &:hover {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    > .overlay {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.5s, visibility 0s;
    }
  }
`;

const CardIcon = styled(Image)`
  /* Sizing */
  width: 100%;
  height: 100%;

  /* Position */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const CardContent = styled.div`
  /* Sizing */
  width: 100%;
  height: 100%;

  /* Position */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  /* Child Layout */
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  > * {
    margin: 0;
  }

  /* Appearance */
  background-color: rgba(100%, 100%, 100%, calc(15 / 16));
  color: black;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardTitleRow = styled.div`
  /* Child Layout */
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 20px;
`;

const CardTitle = styled.h3`
  margin: 0;

  /* Font */
  font-weight: 700;
  font-size: 12pt;
  height: 20px;
`;

const CardLinks = styled.div`
  /* Flex */
  display: flex;
  flex-direction: row;
  gap: 4px;
  height: 20px;
`;

const CardSubtitle = styled.p`
  margin: 0;

  font-weight: 700;
  font-size: 9pt;
  color: ${Colour({ v: "medium" })};
`;

const CardDescription = styled.p`
  /* Sizing */
  flex-grow: 1;

  /* Font */
  font-weight: 400;
  font-size: 9pt;
`;

const CardTags = styled.div`
  /* Flex */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

const Icon = styled(FontAwesomeIcon)`
  /* Appearance */
  font-size: 10pt;
  color: ${primary};
  height: 20px;

  :hover {
    cursor: pointer;
  }
`;

export interface CardProps {
  size: number;
  item: Item;
}
export const Card = ({ size, item }: CardProps) => (
  <CardContainer $size={size}>
    <CardIcon src={item.icon} alt={item.title} width={size} height={size} />
    <CardContent className="overlay">
      <CardHeader>
        <CardTitleRow>
          <CardTitle>{item.title}</CardTitle>
          {item.links === undefined || (
            <CardLinks>
              {item.links.map(({ url, icon }) => (
                <Link key={icon.iconName} href={url}>
                  {/* fa-fw: fixed width */}
                  <Icon icon={icon} className="fa-fw" />
                </Link>
              ))}
            </CardLinks>
          )}
        </CardTitleRow>
        {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
      </CardHeader>
      <CardDescription>{item.description}</CardDescription>
      {item.tags === undefined || (
        <CardTags>
          {item.tags.map((tag) => (
            <TagBubble key={tag.name} tag={tag} />
          ))}
        </CardTags>
      )}
    </CardContent>
  </CardContainer>
);
