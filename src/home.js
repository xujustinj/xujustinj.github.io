import React from "react";
import {
  Card,
  Container,
  Divider,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import "./home.css";

import FormalAvatar from "./img/formal-avatar.png";
import ADETOSIcon from "./img/adetos-icon.png";
import AsteriaIcon from "./img/asteria-icon.png";
import Hexagonal2048Icon from "./img/hexagonal-2048-icon.png";
import StairwayConstantsIcon from "./img/stairway-constants-icon.png";
import SwiftRecordGeneratorIcon from "./img/swift-record-generator-icon.png";
import UlamSpiralIcon from "./img/ulam-spiral-icon.png";
import WaterparkIcon from "./img/waterpark-icon.png";

const NavBar = () => (
  <Menu borderless inverted>
    <Menu.Item as="a" href="https://github.com/xujustinj/" icon="github">
      <Icon name="github" />
      &nbsp; GitHub
    </Menu.Item>
    <Menu.Item as="a" href="/resume">
      <Icon name="newspaper" /> Résumé
    </Menu.Item>
    <Menu.Item as="a" href="https://www.linkedin.com/in/xujustinj/">
      <Icon name="linkedin" /> LinkedIn
    </Menu.Item>
  </Menu>
);

const Head = () => (
  <Segment id="navbar" inverted textAlign="center" vertical>
    <NavBar />
    <Container text>
      <Header id="title" inverted>
        <Image id="avatar" avatar src={FormalAvatar} />
        Justin Xu
      </Header>
    </Container>
  </Segment>
);

const Foot = () => (
  <Segment id="foot" inverted vertical>
    <Container text>
      <small>
        Made with React and Semantic UI.
        <br />
        Last updated Monday May 17, 2021.
      </small>
    </Container>
  </Segment>
);

const ProjectCard = (props) => {
  const { iconURL, projectURL, title, description, labels } = props.project;
  return (
    <Card raised>
      <Image src={iconURL} />
      <Card.Content>
        <Card.Header as={projectURL && "a"} href={projectURL}>
          {title}
        </Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {labels.map((label) => (
          <Label key={label.name} color={label.color}>
            {label.name}
          </Label>
        ))}
      </Card.Content>
    </Card>
  );
};

const languageColor = "pink";
const toolColor = "orange";
const techniqueColor = "blue";

const ADETOS = {
  iconURL: ADETOSIcon,
  projectURL:
    "https://docs.google.com/spreadsheets/d/1JsttjsZt6USt7h1Z66PhwibUmafxuH1Mwkzk2tNlDag/edit",
  title: "ADETOS",
  description:
    "A macro-powered spreadsheet that juggles matchmaking, scorekeeping, and table management for multiple concurrent double elimination tournaments.",
  labels: [
    { name: "Google Sheets", color: toolColor },
    { name: "Google Apps Script", color: languageColor },
  ],
};
const Asteria = {
  iconURL: AsteriaIcon,
  projectURL: "https://github.com/xujustinj/Asteria",
  title: "Asteria",
  description:
    "A fast machine learning library implemented from scratch. Currently working towards character recognition.",
  labels: [
    { name: "AI", color: techniqueColor },
    { name: "C++", color: languageColor },
    { name: "Python", color: languageColor },
  ],
};
const Hexagonal2048 = {
  iconURL: Hexagonal2048Icon,
  projectURL: "https://xujustinj.github.io/Hexagonal-2048/",
  title: "Hexagonal 2048",
  description:
    "My introductory project to JavaScript, inspired by my love for the original game. Swipe or use QWEASD to control the board.",
  labels: [
    { name: "JavaScript", color: languageColor },
    { name: "p5.js", color: toolColor },
  ],
};
const StairwayConstants = {
  iconURL: StairwayConstantsIcon,
  title: "Stairway Constants",
  description:
    "A massive guide to every constant featured on the decorative number line recently installed on UW campus, published across 5 installments of UW mathNEWS volume 142.",
  labels: [
    { name: "Writing", color: techniqueColor },
    { name: "Mathematics", color: techniqueColor },
  ],
};
const SwiftRecordGenerator = {
  iconURL: SwiftRecordGeneratorIcon,
  projectURL: "https://github.com/xujustinj/swift-record-generator",
  title: "Swift Record Generator",
  description:
    "Measures the relative performance of Swift structs, classes, and string-keyed dictionaries, with respect to mutation, copying, (de)serialization, and more.",
  labels: [{ name: "Swift", color: languageColor }],
};
const UlamSpiral = {
  iconURL: UlamSpiralIcon,
  projectURL: "https://xujustinj.github.io/Extended-Essay/",
  title: "Ulam Spiral",
  description:
    "When you highlight prime numbers on a spiral number line, strange patterns appear. In high school, I wrote a paper explaining what causes them, and how they might be useful.",
  labels: [
    { name: "Number Theory", color: techniqueColor },
    { name: "Java", color: languageColor },
  ],
};
const Waterpark = {
  iconURL: WaterparkIcon,
  projectURL: "https://github.com/loolabs/waterpark",
  title: "Waterpark",
  description:
    "Loo Labs' first product: a web app that helps UWaterloo students discover clubs and events. We're overengineering this to the moon!",
  labels: [
    { name: "TypeScript", color: languageColor },
    { name: "Express", color: toolColor },
    { name: "React", color: toolColor },
    { name: "DDD", color: techniqueColor },
  ],
};

const Home = () => (
  <div>
    <Head />
    <Segment id="homeBody" vertical>
      <Container text>
        <p>
          A 3rd year CS student at UWaterloo spending the prime years of his
          life watching lectures and working at software engineering co-op
          internships. In his free time, he can be found leading backend
          development at <a href="https://loolabs.org/">Loo Labs</a> and being
          terrible at video games. Favourite tech stack: Google Sheets.
        </p>
      </Container>

      <Divider hidden />
      <Divider section horizontal>
        Current Projects
      </Divider>
      <Container text>
        <Card.Group centered>
          <ProjectCard project={Waterpark}></ProjectCard>
          <ProjectCard project={Asteria}></ProjectCard>
        </Card.Group>
      </Container>

      <Divider hidden />
      <Divider section horizontal>
        Past Projects
      </Divider>
      <Container text>
        <Card.Group centered>
          <ProjectCard project={StairwayConstants}></ProjectCard>
          <ProjectCard project={SwiftRecordGenerator}></ProjectCard>
          <ProjectCard project={UlamSpiral}></ProjectCard>
          <ProjectCard project={Hexagonal2048}></ProjectCard>
          <ProjectCard project={ADETOS}></ProjectCard>
        </Card.Group>
      </Container>
    </Segment>

    <Foot />
  </div>
);

export default Home;
