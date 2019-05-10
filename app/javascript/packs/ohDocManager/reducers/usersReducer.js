export default function userReducer(state = { currentUser: {}, loading: false }, action) {
  switch(action.type) {
    case 'LOADING_USER_INFO':
      return { ...state, loading: true }

    case 'SET_USER':
      debugger;
      return { ...state, currentUser: action.payload.current, loading: false }

    case 'LOGOUT_USER':
      return { ...state, currentUser: action.payload, loading: false }

    case 'AUTHENTICATE_USER':
      const user = action.payload;
      return { ...state, currentUser: user.current, feed: [...user.preferences.subreddits], loading: false }

    case 'DELETE_USER':
      return { ...state, currentUser: {}, loading: false}

    default: 
      return state;
  }
}