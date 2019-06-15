function errorsReducer(state = { errors: [] }, action) {
    switch(action.type) {
        case "ADD_ERROR":
            return { ...state, errors: [...action.payload] }

        case "SHOW_ERROR":
            return { ...state, errors: [action.payload] }

        case "REMOVE_ERRORS":
            return { ...state, errors: [] }
            
        default:
            return state;
    }
}

export default errorsReducer;