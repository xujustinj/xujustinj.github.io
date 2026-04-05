import styled from "styled-components";
import { Embed } from "../components/Embed";
import { Section } from "../components/Section";
import { adapt } from "../styles/Adaptive";

export function getServerSideProps() {
  return { props: { title: "Hexagonal 2048" } };
}

const GameInfo = styled.p`
  ${adapt({
    mobile: `
    font-size: 14pt;
  `,
    desktop: `
    font-size: 16pt;
  `,
  })}
  line-height: 1.5;

  margin: 8px;

  a {
    color: inherit;
  }
`;

const Game = styled(Embed)`
  width: 100%;
  aspect-ratio: 1;
  border: none;
`;

const Home = () => {
  return (
    <>
      <Section $foreground="black" $background="white" id="intro">
        <GameInfo>
          Just like{" "}
          <a href="https://play2048.co/" target={"_blank"} rel="noreferrer">
            Gabriele Cirulli&apos;s original 2048
          </a>
          , join the tiles to get to <b>2048</b>...
          <br />
          Actually, reaching 2048 is pretty easy on a hexagonal board. Join the
          tiles until you get bored!
        </GameInfo>
        <GameInfo>
          <a href="#how-to-play">
            <b>How to play →</b>
          </a>
        </GameInfo>
        <Game
          src="https://xujustinj.github.io/hexagonal-2048/game"
          title="Hexagonal 2048"
        />
        <GameInfo id="how-to-play">
          <b>HOW TO PLAY: </b>
          Use your <b>QWEASD keys</b> or <b>swipe</b> on a touchscreen to move
          the tiles. Tiles with the same number <b>merge into one</b> when they
          touch.
        </GameInfo>
      </Section>
    </>
  );
};

export default Home;
