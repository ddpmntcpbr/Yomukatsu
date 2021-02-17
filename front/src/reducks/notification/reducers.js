import * as Actions from './actions';
import initialState from '../store/initialState';

export const NotificationReducer = (state = initialState.notification, action)  => {
    switch (action.type) {
        case Actions.CLOSE_NOTIFICATION:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SET_NOTIFICATION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};