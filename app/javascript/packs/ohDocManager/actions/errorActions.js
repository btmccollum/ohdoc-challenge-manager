export const addError = error => {
    return dispatch => {
        dispatch({ 
            type: 'ADD_ERROR',
            payload: error
        })
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({ type: 'REMOVE_ERRORS' })
    }
}