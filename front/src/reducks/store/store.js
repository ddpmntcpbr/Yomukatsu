import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import {connectRouter, routerMiddleware} from "connected-react-router";
import {LoadingReducer} from '../loading/reducers';
import {NotificationReducer} from '../notification/reducers';
import {SharePostsReducer} from "../sharePosts/reducers";
import {PostsReducer} from "../posts/reducers";
import {UsersReducer} from "../users/reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      loading: LoadingReducer,
      notification: NotificationReducer,
      router: connectRouter(history),
      sharePosts: SharePostsReducer,
      posts: PostsReducer,
      users: UsersReducer,
    }),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  )
}
