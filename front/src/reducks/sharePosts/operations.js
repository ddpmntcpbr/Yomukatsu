import axios from "axios";
import { fetchSharePostsListAction } from "./actions";

// share用のposts listを取得する
export const fetchSharePostsList = () => {
  return async (dispatch) => {
    await axios.get(process.env.REACT_APP_API_V1_URL + '/share/posts')
    .then((response) => {
      dispatch(fetchSharePostsListAction(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
  }
}