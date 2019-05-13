import React from 'react';
import NavigationBar from './navBar'
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'
import RepoDisplay from '../containers/repoDisplay'
import Login from '../containers/login'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class LandingPage extends React.Component {
  showGithub = () => {
    console.log()
  }

  loadContent = () => {
    if (loggedIn() === true) {
      return (
        <>
        <RepoDisplay />
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
        <NavigationBar loggedIn={loggedIn()} />

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