import React from 'react';
import NavigationBar from './navBar'

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default LandingPage