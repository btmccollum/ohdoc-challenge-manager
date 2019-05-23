export default function submissionsReducer(state = { submissions: [], loading: false }, action) {
    switch(action.type) {
        case "LOADING_SUBMISSION_DATA":
            return { ...state, loading: true }

        case "CREATE_SUBMISSION":
            return { ...state, submissions: [...state.submissions, action.payload], loading: false }

        default:
            return state;
    }
}
