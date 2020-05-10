import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = () => (
  <Container text>
    <Header
      as='h1'
      inverted
      style={{
        fontSize: '8vmin',
        margin: '4vmin',
      }}
    >
      <Image
        avatar src={JXdp}
        style={{
          marginTop: 0,
          marginRight: '4vmin',
        }}
      />
      Justin Xu
    </Header>
  </Container>
)

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
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
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}
DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

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
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
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

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ paddingBottom: '4em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}
MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)
ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Home = () => (
  <ResponsiveContainer>
    <Segment vertical style={{ padding: '4vh 0' }}>
      <Container text>
        <Header as='h1' style={{ fontSize: '1.6em' }}>
          Hello
        </Header>
        <p style={{ fontSize: '1.2em' }}>
          I'm an aspiring software developer studying Computer Science at the
          University of Waterloo. While my long-term goal is to make meaningful
          contributions in the field of machine intelligence, I'm currently
          exploring the wide world of programming.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          So far, I've taken up a keen interest in performance and optimization.
          Beyond its obvious relevance to AI, the pursuit of efficiency often
          leads to a deeper understanding of what's really going on, and why
          things are the way they are.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          A detail-oriented no-nonsense approach gives rise to my excellent
          academic record and success at past internships. Outside of school and
          work, I also write for UWaterloo mathNEWS, make music, and play video
          games.
        </p>
      </Container>

      <Divider horizontal style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>Current Projects</Divider>
      <Card.Group centered>
        <Card raised>
          <Card.Content as='a' href='https://github.com/xujustinj/Asteria'>
            <Card.Header>Asteria</Card.Header>
            <Card.Meta style={{ padding: '0.5em 0em', lineHeight: '2.4em', height: '5.6em' }}>
              <Label>Neural Networks</Label>
              <Label>React</Label>
              <Label>TypeScript</Label>
              <Label>Sass</Label>
              <Label>C++</Label>
            </Card.Meta>
            <Card.Description>
              <b>Goal:</b> a multilayer perceptron that recognizes letters,
              implemented from scratch <br/>
              <b>So far:</b> an interactive training/testing engine written in
              TypeScript (runs client-side) <br/>
              <b>Soon:</b> migrating the engine to a C++ server
            </Card.Description>
          </Card.Content>
        </Card>
        <Card raised>
          <Card.Content>
            <Card.Header>Stairway Constants</Card.Header>
            <Card.Meta style={{ padding: '0.5em 0em', lineHeight: '2.4em', height: '5.6em' }}>
              <Label>Writing</Label>
              <Label>Recreational Mathematics</Label>
            </Card.Meta>
            <Card.Description>
              A massive guide to every constant featured on a decorative number
              line recently installed at UW campus.
              <br /><br />
              Published across 5 installments of UW mathNEWS volume 142.
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

      <Divider horizontal style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>Past Projects</Divider>
      <Container text>
        Under construction...
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '2em 0em' }}>
      <Container text>
        <small>
          Made with React and Semantic UI.<br/>
          Last updated Saturday May 8, 2020.
        </small>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default Home;
