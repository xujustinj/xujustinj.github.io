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

import JXdp from './img/avatar.png'
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
      <Image id='homeHeaderAvatar' avatar src={JXdp}/>
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
        <Menu.Item as='a' href='mailto://justin.xu@uwaterloo.ca'>
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
          work, I also write for UWaterloo mathNEWS, make music, and play video
          games. (I'm terrible at video games...)
        </p>
      </Container>

      <Divider hidden/>
      <Divider section horizontal>Current Projects</Divider>
      <Card.Group centered>
        <Card raised>
          <Card.Content as='a' href='https://github.com/xujustinj/Asteria'>
            <Card.Header>Asteria</Card.Header>
            <Card.Meta className='labelLine'>
              <Label>Neural Networks</Label>
              <Label>React</Label>
              <Label>TypeScript</Label>
              <Label>Sass</Label>
              <Label>C++</Label>
            </Card.Meta>
            <Card.Description>
              <b>Goal:</b> a multilayer perceptron that learns character
              recognition, implemented from scratch <br/>
              <b>So far:</b> a web app that runs an interactive training/testing
              engine in the client <br/>
              <b>Soon:</b> migrating the engine to a C++ server
            </Card.Description>
          </Card.Content>
        </Card>
        <Card raised>
          <Card.Content>
            <Card.Header>Stairway Constants</Card.Header>
            <Card.Meta className='labelLine'>
              <Label>Writing</Label>
              <Label>Recreational Mathematics</Label>
            </Card.Meta>
            <Card.Description>
              A massive guide to every constant featured on the decorative
              number line recently installed at UW campus.
              <br /><br />
              Published across 5 installments of UW mathNEWS volume 142.
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

      <Divider hidden/>
      <Divider section horizontal>Past Projects (Section Under Construction)</Divider>
      <Card.Group centered>
        <Card raised>
          <Card.Content as='a' href='https://github.com/xujustinj/Swift-Record-Generator'>
            <Card.Header>Swift Record Generator</Card.Header>
            <Card.Meta className='labelLine'>
              <Label>Swift</Label>
            </Card.Meta>
            <Card.Description>
              Measures the relative performance of Swift structs, classes, and
              string-keyed dictionaries, with respect to mutation, copying,
              (de)serialization, and more.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card raised>
          <Card.Content as='a' href='https://xujustinj.github.io/Extended-Essay/'>
            <Card.Header>Ulam Spiral</Card.Header>
            <Card.Meta className='labelLine'>
              <Label>Recreational Math</Label>
              <Label>Number Theory</Label>
              <Label>Java</Label>
            </Card.Meta>
            <Card.Description>
              When you highlight prime numbers on a spiral number line, strange
              patterns appear. In high school, I wrote a paper explaining what
              causes them, and how they can be exploited.
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>

    <Segment id='homeFooter' inverted vertical>
      <Container text>
        <small>
          Made with React and Semantic UI.<br/>
          Last updated Sunday May 10, 2020.
        </small>
      </Container>
    </Segment>
  </ResponsiveHeading>
)

export default Home;
