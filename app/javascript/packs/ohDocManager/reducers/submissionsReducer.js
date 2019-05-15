function submissionsReducer(state = { submissions: [] }, action) {
    switch(action.type) {
        case "CREATE_SUBMISSION":
            return { ...state, submissions: [...action] }

        default:
            return state;
    }
}

export default submissionsReducer;