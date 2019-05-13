export default function userReducer(state = { currentUser: {}, github_linked: false, twitter_linked: false, loading: false }, action) {
  switch(action.type) {
    case 'LOADING_USER_INFO':
      return { ...state, loading: true }

    case 'SET_USER':
      return { ...state, currentUser: action.payload.current, github_linked: false, twitter_linked: false, loading: false }

    case 'LOGOUT_USER':
      return { ...state, currentUser: action.payload, github_linked: false, twitter_linked: false, loading: false }

    case 'AUTHENTICATE_USER':
      let user = action.payload;
      return { ...state, currentUser: user, github_linked: user.attributes.github_linked, twitter_linked: false, loading: false }

    case 'DELETE_USER':
      return { ...state, currentUser: {}, github_linked: false, twitter_linked: false, loading: false}

    default: 
      return state;
  }
}