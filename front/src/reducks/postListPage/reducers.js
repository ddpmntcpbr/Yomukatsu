import * as Actions from './actions'
import initialState from '../store/initialState'

export const postListPageReducer = (state = initialState.postListPage, action) => {
  switch (action.type) {
    case Actions.INITIALIZE_POSTS_LIST_PAGINASTION_INDEX:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SWITCH_COMPLETED_POSTS_LIST_PAGINASTION_INDEX:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SWITCH_TAB_INDEX:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SWITCH_REGISTERED_POSTS_LIST_PAGINASTION_INDEX:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
