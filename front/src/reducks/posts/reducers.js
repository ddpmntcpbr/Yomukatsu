import initialState from '../store/initialState'
import * as Actions from './actions'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    // case Actions.FETCH_READING_POSTS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     list: [...action.payload]
    //   };
    // case Actions.FETCH_COMPLETED_POSTS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     list: [...action.payload]
    //   };
    // case Actions.FETCH_COMPLETED_POSTS_DETAIL:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     list: [...action.payload]
    //   };
    case Actions.FETCH_POSTS:
      return {
        ...state,
        isFetching: false,
        reading: action.payload['reading'],
        registered: action.payload['registered'],
        completed: action.payload['completed'],
      }
    // case Actions.FETCH_REGISTERED_POSTS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     list: [...action.payload]
    //   };
    // case Actions.FETCH_REGISTERED_POSTS_DETAIL:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     list: [...action.payload]
    //   };
    case Actions.START_FETCHING_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
