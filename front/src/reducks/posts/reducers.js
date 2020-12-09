import * as Actions from './actions'
import initialState from '../store/initialState'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.FETCH_READING_POSTS:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_COMPLETED_POSTS:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_COMPLETED_POSTS_DETAIL:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_REGISTERED_POSTS:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_REGISTERED_POSTS_DETAIL:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.START_FETCHING_POSTS:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.START_FETCHING_POSTS:
      return {
        ...state,
        isFetching: false,
        list: [...action.payload],
        error: action.error
      };
    default:
      return state
  }
}