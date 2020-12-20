import axios from "axios";
import { fetchSharePostsAction } from "./actions";

// share用のpostsを取得する
export const fetchSharePosts = () => {
  return async (dispatch) => {
    await axios.get(process.env.REACT_APP_API_V1_URL + '/share/posts')
    .then((response) => {
      dispatch(fetchSharePostsAction(response.dada))
    })
    .catch((error) => {
      console.log(error)
    })
  }
}