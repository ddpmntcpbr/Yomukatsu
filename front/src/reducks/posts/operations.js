import axios from "axios";
import {push} from "connected-react-router";

export const savePosts = (title,infoLink,author,thumbnail,mapItems) => {
  return async (dispatch) => {

    const post_items_attributes = []
    mapItems.map((mapItem) => (
      post_items_attributes.push({"content":mapItem.mapItem})
    ))

    const data = {
      "title": title,
      "url": infoLink,
      "author": author,
      "image": thumbnail,
      "status": "reading",
      "post_items_attributes": post_items_attributes
      }

    axios.post('http://localhost:3000/api/v1/posts', data, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      .then((response) => {
        // console.log("response", response)
        dispatch(push("/mypage"))
      })
      .catch((error) => {
        console.log("error",error)
      })
  }
}