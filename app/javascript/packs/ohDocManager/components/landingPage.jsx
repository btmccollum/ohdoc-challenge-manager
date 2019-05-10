import React from 'react';
import NavigationBar from './navBar'
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'
import RepoDisplay from '../containers/repoDisplay'

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <RepoDisplay />
        <TweetForm />
        <CommitForm />
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default LandingPage