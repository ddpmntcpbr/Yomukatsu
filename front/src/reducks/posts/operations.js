import axios from "axios";
import {push} from "connected-react-router";
import { fetchPostsAction } from "./actions";

export const fetchPosts = () => {
  return async (dispatch) => {
    axios.get('http://localhost:3000/api/v1/posts', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
      // console.log(response.data)
      // const postList = []

      // response.data.forEach(data => {
      //   const post = {
      //     "title": data.title,
      //     "url": data.infoLink,
      //     "author": data.author,
      //     "image": data.thumbnail,
      //     "status": data.status,
      //     "post_items_attributes": data.post_items_attributes,
      //     "created_at": data.created_at,
      //     "user": data.user,
      //   }
      //   postList.push(post)
      // })
      // const data = {
      //   "title": response.data.title,
      //   "url": response.data.infoLink,
      //   "author": response.data.author,
      //   "image": response.data.thumbnail,
      //   "status": response.data.status,
      //   "post_items_attributes": response.data.post_items_attributes
      // }
      // console.log(postList)
      dispatch(fetchPostsAction(response.data))

    })
    .catch((error) => {
      console.log("error",error)
    })
  }
}

export const savePosts = (title,url,author,image,mapItems) => {
  return async (dispatch) => {

    const post_items_attributes = []
    mapItems.map((mapItem) => (
      post_items_attributes.push({"content":mapItem.mapItem})
    ))

    const data = {
      "title": title,
      "url": url,
      "author": author,
      "image": image,
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
        dispatch(push("/mypage"))
      })
      .catch((error) => {
        console.log("error",error)
      })
  }
}