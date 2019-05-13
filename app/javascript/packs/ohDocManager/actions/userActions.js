import axios from 'axios';

// const baseUrl = 'https://localhost:3000/api/v1'
const baseUrl = '/api/v1'

// generate API url based on path pased in
const create_url = endpoint => { return `${baseUrl}/${endpoint}` }
// const baseUrl = 'https://droplet-app-api.herokuapp.com/api/v1'

const setHeaders = () => { return axios.defaults.headers.common['Authorization'] = `Token ${sessionStorage.getItem('jwt')}` };

const setOauthStatus = json => {
    if (json.github == true && json.twitter == true) {
        sessionStorage.setItem('githubLinked', 'true')
        sessionStorage.setItem('twitterLinked', 'true')
    } else if (json.github == true && json.twitter == false) {
        return sessionStorage.setItem('githubLinked', 'false')
    } else if (json.github == false && json.twitter == true) {
        return sessionStorage.setItem('twitterLinked', 'false')
    } else {
        sessionStorage.setItem('githubLinked', 'false')
        sessionStorage.setItem('twitterLinked', 'false')
    }
}

// --------------- USER STATE ACTIONS ---------------

export const signupUser = (user, callback) => {
    const data = {
    //   body: JSON.stringify({ user })
        user: user,
    }
    axios.defaults.headers.common['Authorization'] = null;

    return dispatch => {
      // updating load status while async action executes
      dispatch({ type: "LOADING_USER_INFO"})

      axios.post(create_url('/users'), data)
        .then(json => {
            sessionStorage.setItem('logged_in', 'true')
            sessionStorage.setItem('jwt', json.data.jwt)

            // determine if user has authorized github and/or twitter
            setOauthStatus(json.data)

            dispatch({
                type: 'SET_USER',
                payload: json.action.payload.user.data
            });
            callback()
        })
        .catch(error => {
            dispatch({ type: 'SHOW_ERROR', message: error.response.data.error })
        })
    }
}

export const loginUser = (user, callback) => {
  const data = {
    user: user,
  }

  axios.defaults.headers.common['Authorization'] = null;

  return dispatch => {
    // updating load status while async action executes
    dispatch({ type: "LOADING_USER_INFO"})

    axios.post(create_url('/sessions'), data)
      .then(json => {
        sessionStorage.setItem('logged_in', 'true')
        sessionStorage.setItem('jwt', json.data.jwt)
        
        // determine if user has authorized github and/or twitter
        setOauthStatus(json)

        dispatch({
            type: 'AUTHENTICATE_USER',
            payload: json.data.user.data
        })
            callback()
        })
        .catch(error => {
            dispatch({ type: 'SHOW_ERROR', message: error.response.data.error })
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

    axios.post(`/logout`)
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
    })
}
}

// export const deleteUser = id => {
// // setting authorization header ahead of axios request
// setHeaders();

// return dispatch => {
//   // updating load status while async action executes
//   dispatch({ type: "LOADING_USER_INFO"})

//   axios.delete(`${baseUrl}/users/${id}`)
//     .then( json => {
//       sessionStorage.removeItem('jwt') 
//       sessionStorage.removeItem('preference_setting') 
//       sessionStorage.removeItem('logged_in')

//       dispatch({
//         type: 'DELETE_USER',
//       })
//     })
//   .catch(error => {console.log(error.message)})
// }
// }

// --------------- USER ACCOUNT ACTIONS ---------------

export const linkGithubAccount = () => {
// manually setting data object for sake of fetch display
setHeaders()

return dispatch => {
//  axios would normally be used, fetch variant placed for purposes of demonstration
  axios.get(create_url('/github_authorization'))
    .then(json => {
      // automatically redirecting the user to the reddit authorization link to authorize the app, will be redirected back to site after accepting
      const resp = json.data
      window.location = `${resp.url}${resp.query_params}`
    })
    .catch(error => {
      dispatch({ type: 'SHOW_ERROR', message: error.response.data.error })
  })
}
}