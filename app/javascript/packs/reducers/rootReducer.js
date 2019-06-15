import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import errorsReducer from './errorsReducer'
import submissionsReducer from './submissionsReducer'

const rootReducer = combineReducers({
    user: usersReducer,
    submissions: submissionsReducer,
    errors: errorsReducer,
});

export default rootReducer;