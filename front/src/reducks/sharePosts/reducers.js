import * as Actions from './actions'
import initialState from '../store/initialState'

export const SharePostsReducer = (state = initialState.sharePosts, action) => {
  switch (action.type) {
    case Actions.FETCH_SHARE_POST:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.FETCH_SHARE_POSTS_LIST:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}
