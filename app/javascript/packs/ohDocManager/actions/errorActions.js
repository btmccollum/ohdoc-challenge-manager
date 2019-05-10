export const clearErrors = () => {
    return dispatch => {
        dispatch({ type: 'REMOVE_ERRORS' })
    }
}