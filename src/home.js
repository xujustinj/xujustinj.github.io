import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Card,
  Container,
  Divider,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

import jx_avatar from './img/jx_avatar.png'
import adetos from './img/adetos.png'
import asteria from './img/asteria.png'
import hexagonal_2048 from './img/hexagonal_2048.png'
import stairway_constants from './img/stairway_constants.png'
import swift_record_generator from './img/swift_record_generator.png'
import ulam_spiral from './img/ulam_spiral.png'
import './home.css'

// COMMENT FROM semantic-ui-react LAYOUT EXAMPLE:
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  return (typeof window === 'undefined') ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const Heading = () => (
  <Container text>
    <Header id='homeHeader' inverted>
      <Image id='homeHeaderAvatar' avatar src={jx_avatar}/>
      Justin Xu
    </Header>
  </Container>
)

const DesktopHeading = (props) => {
  const { children } = props

  const [overlay, setOverlay] = useState(false);

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => setOverlay(true)}
        onBottomPassedReverse={() => setOverlay(false)}
      >
        <Segment
          id='homeHeaderDesktop'
          inverted
          textAlign='center'
          vertical
        >
          <Menu
            fixed={overlay ? 'top' : null}
            inverted={!overlay}
            pointing={!overlay}
            secondary={!overlay}
            size='large'
          >
            <Menu.Item as='a' href='https://github.com/xujustinj' icon='github'>
              <Icon name='github' />&nbsp; GitHub
            </Menu.Item>
            <Menu.Item as='a' href='https://drive.google.com/file/d/18Bl6LJ0o_8e_GaF0HbPoGxq0_IvlcwWD/view?usp=sharing'>
              <Icon name='newspaper' /> Résumé
            </Menu.Item>
            <Menu.Item as='a' href='https://www.linkedin.com/in/justin-j-xu/'>
              <Icon name='linkedin' /> LinkedIn
            </Menu.Item>
            <Menu.Item as='a' href='mailto://justin.xu@uwaterloo.ca'>
              <Icon name='mail' /> Email
            </Menu.Item>
          </Menu>
          <Heading />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}
DesktopHeading.propTypes = {
  children: PropTypes.node,
}

const MobileHeading = (props) => {
  const { children } = props

  const [sidebar, setSidebar] = useState(false);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={() => setSidebar(false)}
        vertical
        visible={sidebar}
      >
        <Menu.Item as='a' href='https://github.com/xujustinj' icon='github'>
          <Icon name='github' /> GitHub
        </Menu.Item>
        <Menu.Item as='a' href='https://drive.google.com/file/d/18Bl6LJ0o_8e_GaF0HbPoGxq0_IvlcwWD/view?usp=sharing'>
          <Icon name='newspaper' /> Résumé
        </Menu.Item>
        <Menu.Item as='a' href='https://www.linkedin.com/in/justin-j-xu/'>
          <Icon name='linkedin' /> LinkedIn
        </Menu.Item>
        <Menu.Item as='a' href='mailto:justin.xu@uwaterloo.ca'>
          <Icon name='mail' /> Email
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebar}>
        <Segment
          id='homeHeaderMobile'
          inverted
          textAlign='center'
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item onClick={() => setSidebar(!sidebar)}>
                <Icon name='sidebar' />
              </Menu.Item>
            </Menu>
          </Container>
          <Heading />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  )
}
MobileHeading.propTypes = {
  children: PropTypes.node,
}

const ResponsiveHeading = ({ children }) => (
  <div>
    <DesktopHeading>{children}</DesktopHeading>
    <MobileHeading>{children}</MobileHeading>
  </div>
)
ResponsiveHeading.propTypes = {
  children: PropTypes.node,
}

const Home = () => (
  <ResponsiveHeading>
    <Segment id='homeBody' vertical>
      <Container text>
        <Header as='h1'>Hello</Header>
        <p>
          I'm an aspiring software developer studying Computer Science at the
          University of Waterloo. While my long-term goal is to make meaningful
          contributions in the field of machine intelligence, I'm currently
          exploring the wide world of programming.
        </p>
        <p>
          So far, I've taken up a keen interest in performance and optimization.
          Beyond its obvious relevance to AI, the pursuit of efficiency often
          leads to a deeper understanding of what's really going on, and why
          things are the way they are.
        </p>
        <p>
          A detail-oriented no-nonsense approach gives rise to my excellent
          academic record and success at past internships. Outside of school and
          work, I also write for <a href='http://mathnews.uwaterloo.ca/'>
            UW mathNEWS
          </a>, make music, and play video games. (I'm terrible at video
          games...)
        </p>
      </Container>

      <Divider hidden/>
      <Divider section horizontal>Current Projects</Divider>
      <Container text>
        <Card.Group centered>
          <Card raised>
            <Image src={asteria} />
            <Card.Content>
              <Card.Header as='a' href='https://github.com/xujustinj/Asteria'>Asteria</Card.Header>
              <Card.Description>
                <b>Goal:</b> a web app interface for a multilayer perceptron
                that performs character recognition (implemented from scratch)
                <br/>
                <b>So far:</b> an in-browser interactive training/testing engine
                <br/>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Label color={"blue"}>AI</Label>
              <Label color={"orange"}>React</Label>
              <Label color={"yellow"}>TypeScript</Label>
              <Label color={"yellow"}>C++</Label>
            </Card.Content>
          </Card>
          <Card raised>
            <Image src={stairway_constants} />
            <Card.Content>
              <Card.Header as='a' href='http://mathnews.uwaterloo.ca/'>
                Stairway Constants
              </Card.Header>
              <Card.Description>
                A massive guide to every constant featured on the decorative
                number line recently installed on UW campus, published across 5
                installments of UW mathNEWS volume 142.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Label color={"blue"}>Writing</Label>
              <Label color={"blue"}>Mathematics</Label>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>

      <Divider hidden/>
      <Divider section horizontal>Past Projects</Divider>
      <Container text>
      <Card.Group centered>
        <Card raised>
          <Image src={swift_record_generator} />
          <Card.Content>
            <Card.Header as='a' href='https://github.com/xujustinj/Swift-Record-Generator'>
              Swift Record Generator
            </Card.Header>
            <Card.Description>
              Measures the relative performance of Swift structs, classes, and
              string-keyed dictionaries, with respect to mutation, copying,
              (de)serialization, and more.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Label color={"yellow"}>Swift</Label>
          </Card.Content>
        </Card>
        <Card raised>
          <Image src={ulam_spiral} />
          <Card.Content>
            <Card.Header as='a' href='https://xujustinj.github.io/Extended-Essay/'>
              Ulam Spiral
            </Card.Header>
            <Card.Description>
              When you highlight prime numbers on a spiral number line, strange
              patterns appear. In high school, I wrote a <a href='https://xujustinj.github.io/Extended-Essay/03-01-19%20Version%20(Revision).pdf'>
                paper
              </a> explaining what causes them, and how they could be exploited.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Label color={"blue"}>Number Theory</Label>
            <Label color={"yellow"}>Java</Label>
          </Card.Content>
        </Card>
        <Card raised>
          <Image src={hexagonal_2048} />
          <Card.Content>
            <Card.Header as='a' href='https://xujustinj.github.io/Hexagonal-2048/'>
              Hexagonal 2048
            </Card.Header>
            <Card.Description>
              My introductory project to JavaScript, inspired by my love for the
              original game.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Label color={"yellow"}>JavaScript</Label>
            <Label color={"orange"}>p5.js</Label>
          </Card.Content>
        </Card>
        <Card raised>
          <Image src={adetos} />
          <Card.Content>
            <Card.Header as='a' href='https://docs.google.com/spreadsheets/d/1JsttjsZt6USt7h1Z66PhwibUmafxuH1Mwkzk2tNlDag/edit'>
              ADETOS
            </Card.Header>
            <Card.Description>
              A macro-powered spreadsheet that juggles matchmaking,
              scorekeeping, and table management for multiple concurrent double
              elimination tournaments.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Label color={"orange"}>Spreadsheets</Label>
            <Label color={"yellow"}>Google Apps Script</Label>
          </Card.Content>
        </Card>
      </Card.Group>
      </Container>
    </Segment>

    <Segment id='homeFooter' inverted vertical>
      <Container text>
        <small>
          Made with React and Semantic UI.<br/>
          Last updated Sunday May 24, 2020.
        </small>
      </Container>
    </Segment>
  </ResponsiveHeading>
)

export default Home;
