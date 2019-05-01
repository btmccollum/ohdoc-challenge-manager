import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import LandingPage from './components/landingPage';
import rootReducer from './reducers/rootReducer';
import NavigationBar from './components/navBar'

export const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk),
      // for local testing only
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      
      // necessary for heroku deployment or some computers encounter a loading error with the above
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

const App = (props) => (
  <Provider store={store}>
    <Router>
      <Route exact path='/' component={LandingPage} />
    </Router>
  </Provider>
)

export default App;