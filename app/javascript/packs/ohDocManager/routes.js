import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter, 
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux';
import LandingPage from './components/landingPage';
import Signup from './containers/signup'
import { authenticateUser, logoutUser } from './actions/userActions';
import Login from './containers/login'

// const App = (props) => (
class App extends Component {
  componentWillMount() {
    // if a user causes state to refresh while logged_in we will force the server to reidentify and set the correct user
    if (!!sessionStorage.getItem('logged_in') && Object.keys(this.props.currentUser.currentUser).length < 1 ) {
      this.props.authenticateUser()
    }
  }

  render() {
    return (
      <Router>
        <Route exact path ="/" component={ 
                () => {
                  if (loggedIn()) {
                    return <LandingPage /> 
                  } else {
                    return <Redirect to="/login"/> 
                  }
                }
              }/>   
        <Route path='/signup' component={ () => loggedIn() ? <Redirect to="/"/> : <Signup /> }/>
        {/* <Route path='/profile' component={ () => loggedIn() ? <Profile /> : <Login /> }/> */}
        <Route path='/login' component={ () => loggedIn() ? <Redirect to="/"/> : <Login /> }/>
        <Route path='/logout' render={ props => { 
          this.props.logoutUser();
          return <Redirect to="/"/>  
        }} />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user
  }
}

const githubStatus = () => !!sessionStorage['github']
const loggedIn = () => !!sessionStorage['logged_in'];

export default connect(mapStateToProps, { logoutUser, authenticateUser })(App);