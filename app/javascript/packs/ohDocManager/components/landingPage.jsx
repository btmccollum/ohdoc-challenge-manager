import React from 'react';
import NavigationBar from './navBar'
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'
import RepoDisplay from '../containers/repoDisplay'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class LandingPage extends React.Component {
  showGithub = () => {
    console.log()
  }

  render() {
    return(
      <div>
        <NavigationBar />
        <RepoDisplay />
        <TweetForm />
        <CommitForm />
      </div>
    )
  }
}

export default LandingPage