export default function usersReducer(state = { currentUser: {}, loading: false }, action) {
    switch(action.type) {
    //   case 'LOADING_USER_INFO':
    //     return { ...state, loading: true }

    //   case 'SET_USER':
    //     return { ...state, currentUser: action.payload.current, loading: false }

    //   case 'LOGOUT_USER':
    //     return { ...state, currentUser: action.payload, loading: false }

    //   case 'ADD_TO_USER_FEED':
    //     return { ...state, feed: [...action.payload], loading: false}

    //   case 'REMOVE_FROM_USER_FEED':
    //     return { ...state, feed: [...state.feed.filter(el => el !== action.payload)], loading: false}

    //   case 'GET_USER_FEED':
    //     return { ...state, feed: [...action.payload], loading: false}

    //   case 'AUTHENTICATE_USER':
    //     const user = action.payload;
    //     return { ...state, currentUser: user.current, feed: [...user.preferences.subreddits], loading: false }

    //   case 'DELETE_USER':
    //     return { ...state, currentUser: {}, feed: [], loading: false}

      default: 
        return state;
    }
}