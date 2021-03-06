import axios from 'axios';

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

export const createSubmission = (entryData, service) => {
    const data = { submission: entryData, service }

    setHeaders()

    return dispatch => {
      dispatch({ type: "LOADING_SUBMISSION_DATA" })

      axios.post(create_url('submissions'), data) 
          .then(json => {
              dispatch({ 
                  type: "CREATE_SUBMISSION",
                  payload: json.data.submission.data
              })
          })
          .catch(error => {
              dispatch({ type: 'SHOW_ERROR', message: error.response })
          })
    }
}

export const getSubmissions = () => {
  setHeaders()

  return dispatch => {
    dispatch({ type: "LOADING_SUBMISSION_DATA" })

    axios.get(create_url('submissions')) 
        .then(json => {
            dispatch({ 
                type: "GET_SUBMISSIONS",
                payload: json.data.submissions
            })
        })
        .catch(error => {
            dispatch({ type: 'SHOW_ERROR', message: error.response })
        })
  }
}
