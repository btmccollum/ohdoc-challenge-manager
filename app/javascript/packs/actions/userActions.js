import axios from 'axios';
import { getSubmissions } from './submissionActions';

// const baseUrl = 'https://localhost:3000/api/v1'
const baseUrl = '/api/v1'

// generate API url based on path pased in
const create_url = endpoint => { return `${baseUrl}/${endpoint}` }
// const baseUrl = 'https://droplet-app-api.herokuapp.com/api/v1'

// optional argument only necessary for null request, otherwise a generic call of function will return the correct token header
const setHeaders = (option) => { 
  if (option !== null) {
    return axios.defaults.headers.common['Authorization'] = `Token ${sessionStorage.getItem('jwt')}`
  } else {
    return axios.defaults.headers.common['Authorization'] = 'null'
  }
}

// --------------- USER STATE ACTIONS ---------------

export const signupUser = (user, callback) => {
    const data = { user: user, }
  
    // pass in argument of null if no auth token is available, none is since we are creating a new user
    setHeaders(null)

    return dispatch => {
      // updating load status while async action executes
      dispatch({ type: "LOADING_USER_INFO"})

      axios.post(create_url('users'), data)
        .then(json => {
            sessionStorage.setItem('logged_in', 'true')
            sessionStorage.setItem('jwt', json.data.jwt)
      
            dispatch({
                type: 'SET_USER',
                payload: json.data.user.data
            });

            callback()
        })
        .catch(error => {
            dispatch({ 
              type: 'ADD_ERROR', 
              payload: error.response.data.errors 
            })
        })
    }
}

export const loginUser = (user, callback) => {
  const data = { user: user, }

  // pass in argument of null if no auth token is available, none is since we are logging in a user
  setHeaders(null)

  return dispatch => {
    // updating load status while async action executes
    dispatch({ type: "LOADING_USER_INFO"})

    axios.post(create_url('sessions'), data)
      .then(json => {
        sessionStorage.setItem('logged_in', 'true')
        sessionStorage.setItem('jwt', json.data.jwt)

        dispatch({
            type: 'AUTHENTICATE_USER',
            payload: json.data.user.data
        })
            callback()
        })
        .catch(error => {
            dispatch({ 
              type: 'ADD_ERROR', 
              payload: error.response.data.errors })
        })
  }
}

export const logoutUser = () => {
  setHeaders()

  if (sessionStorage['jwt']) { 
    sessionStorage.removeItem('jwt') 
  }

  sessionStorage.removeItem('logged_in')
  
  return dispatch => {
    // updating load status while async action executes
    dispatch({ type: "LOADING_USER_INFO"})

    axios.post('/logout')
      .then(resp => {
        dispatch({
          type: 'LOGOUT_USER',
          payload: ''
        })
      })
  .catch(error => {console.log(error.message)})
  }
}   

export const authenticateUser = () => {
  return dispatch => {
    // setting authorization header ahead of axios request
    setHeaders()

    // updating load status while async action executes
    dispatch({ type: "LOADING_USER_INFO"})

    axios.get(`${baseUrl}/users/authorize`)
      .then( json => {
        sessionStorage.setItem('logged_in', 'true')
        sessionStorage.setItem('jwt', json.data.jwt)

        dispatch({
          type: 'AUTHENTICATE_USER',
          payload: json.data.user.data
        })

        dispatch(getSubmissions())
    })
  }
}

export const updateUser = (user) => {
  const data = { user: user, }

  // setting authorization header ahead of axios request
  setHeaders();

  return dispatch => {

  // updating load status while async action executes
  dispatch({ type: "LOADING_USER_INFO"})

  axios.patch(create_url(`users/${data.user.id}`), data)
    .then( json => {
      // new JWT token created with user update, resetting both the token and logged_in status
      sessionStorage.setItem('logged_in', 'true')
      sessionStorage.setItem('jwt', json.data.jwt)

      dispatch({
        type: 'UPDATE_USER',
        payload: json.data.user.data
      })
    })
  }
}

export const deleteUser = (id, callback) => {
  // setting authorization header ahead of axios request
  setHeaders();

  return dispatch => {
    // updating load status while async action executes
    dispatch({ type: "LOADING_USER_INFO"})

    axios.delete(create_url(`users/${id}`))
      .then( json => {
        sessionStorage.removeItem('jwt') 
        sessionStorage.removeItem('logged_in')

        dispatch({
          type: 'DELETE_USER',
        })

        // callback is forcing user to root route after change is made
        callback()
      })
    .catch(error => {console.log(error.message)})
  }
}

export const sendPasswordReset = (user_email, callback) => {
  const data = { email: user_email }
  setHeaders(null)

  return dispatch => {
    axios.post('/password/forgot', data)
      .then(json => {
        // send user back to login page
        callback()
      })
      .catch(error => {
        dispatch({ 
          type: 'SHOW_ERROR', 
          payload: error.response.data.error 
        })
      })
  }
}

export const submitPasswordReset = (user_data, callback) => {
  return dispatch => {
    axios.post('/password/reset', user_data)
      .then(json => {
        callback()
      })
      .catch(error => {
        dispatch({ 
          type: 'SHOW_ERROR', 
          payload: error.response.data.error 
        })
      })
  }
}

// --------------- USER ACCOUNT ACTIONS ---------------

export const linkGithubAccount = () => {
// manually setting data object for sake of fetch display
  setHeaders()

  return dispatch => {
  //  axios would normally be used, fetch variant placed for purposes of demonstration
    axios.get(create_url('github_authorization'))
      .then(json => {
        // automatically redirecting the user to the github authorization link to authorize the app, will be redirected back to site after accepting
        const resp = json.data
        window.location = `${resp.url}${resp.query_params}`
      })
      .catch(error => {
        dispatch({ 
          type: 'SHOW_ERROR', 
          payload: error.response.data.error 
        })
    })
  }
}

export const linkTwitterAccount = () => {
  // manually setting data object for sake of fetch display
    setHeaders()
  
    return dispatch => {
    //  axios would normally be used, fetch variant placed for purposes of demonstration
      axios.get(create_url('twitter_authorization'))
        .then(json => {
          // automatically redirecting the user to the twitter authorization link to authorize the app, will be redirected back to site after accepting
          const redirect_url = json.data
          window.location = redirect_url
        })
        .catch(error => {
          dispatch({ 
            type: 'SHOW_ERROR', 
            payload: error.response.data.error 
          })
      })
    }
  }