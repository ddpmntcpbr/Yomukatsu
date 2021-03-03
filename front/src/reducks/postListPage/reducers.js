import * as Actions from './actions';
import initialState from '../store/initialState';

export const postListPageReducer = (state = initialState.postListPage, action)  => {
    switch (action.type) {
        case Actions.SWITCH_TAB_INDEX:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};