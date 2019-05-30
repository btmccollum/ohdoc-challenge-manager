import React from 'react';
import NavigationBar from './navBar'
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'
import RepoDisplay from '../containers/repoDisplay'
import Login from '../containers/login'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import GettingStartedModal from '../containers/gettingStartedModal'

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
    console.log()
  }

  // handleWelcome = () => {
  //   if ()
  // }

  loadContent = () => {
    if (loggedIn() === true) {
      return (
        <>
        <Button onClick={this.showModal}>Click Me</Button>
        <GettingStartedModal show={this.state.show} onHide={this.hideModal} />
        <TweetForm />
        <CommitForm />
        </>
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