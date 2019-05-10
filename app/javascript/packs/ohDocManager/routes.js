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
  render() {
    return (
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path ="/" component={ 
                () => {
                  if (loggedIn() && linkedStatus()) {
                    return <Home /> 
                  } else if (loggedIn() && !linkedStatus()) {
                    return <Profile />
                  } else {
                    return <Redirect to="/login"/> 
                  }
                }
              }/>   
              <Route path='/signup' component={ () => loggedIn() ? <Redirect to="/"/> : <Signup /> }/>
              <Route path='/profile' component={ () => loggedIn() ? <Profile /> : <Login /> }/>
              <Route path='/link_account' component={ 
                () => {
                  if (loggedIn() && linkedStatus()) {
                    return <Home /> 
                  } else if (loggedIn() && !linkedStatus()) {
                    return <AccountLink />
                  } else {
                    return <Redirect to="/login"/> 
                  }
                }
              }/>
              
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
    currentUser: state.user.currentUser
  }
}

const loggedIn = () => !!sessionStorage['logged_in'];

export default connect(mapStateToProps, { logoutUser, authenticateUser })(App);