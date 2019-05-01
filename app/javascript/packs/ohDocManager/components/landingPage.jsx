import React from 'react';
import NavigationBar from './navBar'
import TweetForm from './tweet/tweetForm'
import CommitForm from './github/commitForm'

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <TweetForm />
        <CommitForm />
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default LandingPage