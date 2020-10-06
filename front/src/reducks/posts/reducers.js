import * as Actions from './actions'
import initialState from '../store/initialState'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.FETCH_POST_DETAIL:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_POSTS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}