function errorsReducer(state = { errors: [] }, action) {
    switch(action.type) {
        case "SHOW_ERROR":
            return { ...state, errors: [action.message] }

        case "REMOVE_ERRORS":
            return { ...state, errors: [] }
            
        default:
            return state;
    }
}

export default errorsReducer;