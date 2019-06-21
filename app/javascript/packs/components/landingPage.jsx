import React from 'react';
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'
import Login from '../containers/login'
import { connect } from 'react-redux'
import GettingStartedModal from '../containers/gettingStartedModal'
import { Container, Row } from 'react-bootstrap'

class LandingPage extends React.Component {
  state = {
    show: false
  }
  componentDidMount() {
    // if a registered user has not linked either account, they will receive this popup everytime until they do
    this.handleWelcomeContent()
  }

  handleWelcomeContent() {
    const user = this.props.user.currentUser.attributes

    if (user) {
      if (!user.github_linked || !user.twitter_linked) {
        this.showModal()
      }
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showGithub = () => {
  
  }

  loadContent = () => {
    if (loggedIn() === true) {
      return (
        <Container className="nopageContainer">
          <Row className="justify-content-md-center ">
            <TweetForm />
            <CommitForm />
            <GettingStartedModal show={this.state.show} onHide={this.hideModal} />
          </Row>
        </Container>
      )
    } else {
      return (
        <Login />
      )
    }
  }

  render() {
    return(
      <div>

        {this.loadContent()}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      user: state.user,
  }
}

const loggedIn = () => !!sessionStorage['logged_in'];

export default connect(mapStateToProps)(LandingPage)