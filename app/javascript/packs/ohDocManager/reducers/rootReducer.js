import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
    user: usersReducer,
    errors: errorsReducer,
});

export default rootReducer;