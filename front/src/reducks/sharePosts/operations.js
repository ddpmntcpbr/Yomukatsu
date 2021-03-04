import axios from 'axios'
import { fetchSharePostAction, fetchSharePostsListAction } from './actions'

// share用のposts listを取得する
export const fetchSharePostsList = () => {
  return async (dispatch) => {
    await axios
      .get(process.env.REACT_APP_API_V1_URL + '/share/posts')
      .then((response) => {
        dispatch(fetchSharePostsListAction(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// share用のpostを取得する
export const fetchSharePost = (id) => {
  return async (dispatch) => {
    await axios
      .get(process.env.REACT_APP_API_V1_URL + '/share/posts/' + id)
      .then((response) => {
        dispatch(fetchSharePostAction(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
