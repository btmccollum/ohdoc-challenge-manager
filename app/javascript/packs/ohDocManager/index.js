import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { authenticateUser } from './actions/userActions'

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

// ensuring we keep a 'logged in' user's information updated on refresh, if jwt token is present we re-authenticate on reload
const token = sessionStorage.getItem('jwt')

// dispatch authenticateUser to authenticate token with backend and re-updated users info in store
if (token) {
  store.dispatch(authenticateUser())
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('ohdoc-challenge-manager'),
  )
});