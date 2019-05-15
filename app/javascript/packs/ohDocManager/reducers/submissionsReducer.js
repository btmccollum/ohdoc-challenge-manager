export default function submissionsReducer(state = { submissions: [], loading: false }, action) {
    switch(action.type) {
        case "LOADING_SUBMISSION_DATA":
            return { ...state, loading: true }

        case "CREATE_SUBMISSION":
            debugger
            return { ...state, submissions: [action], loading: false }

        default:
            return state;
    }
}
