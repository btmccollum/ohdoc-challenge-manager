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
import Profile from './containers/profile'
import NavigationBar from './components/navBar'
import NotFound from './components/notFound'
import ForgotPassword from './containers/forgotPassword'
import PasswordReset from './containers/passwordReset'

class App extends Component {
  componentWillMount() {
    loggedIn()
  }
  
  render() {
    return (
      <Router>
        <NavigationBar loggedIn={loggedIn()} />
        <Switch>
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
          <Route path='/profile' component={ () => loggedIn() ? <Profile /> : <Login /> }/>
          <Route path='/login' component={ () => loggedIn() ? <Redirect to="/"/> : <Login /> }/>
          <Route path='/logout' render={ props => { 
            this.props.logoutUser();
            return <Redirect to="/"/>  
          }} />
          <Route path='/password/forgot' component={ () => loggedIn() ? <Redirect to="/"/> : <ForgotPassword /> }/>
          <Route path='/password/reset' component={ () => loggedIn() ? <Redirect to="/"/> : <PasswordReset /> }/>
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user
  }
}

const loggedIn = () => !!sessionStorage['logged_in'];

export default connect(mapStateToProps, { logoutUser, authenticateUser })(App);