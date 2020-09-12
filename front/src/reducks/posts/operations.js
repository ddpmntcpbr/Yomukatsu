import axios from "axios";
import {push} from "connected-react-router";
import { fetchPostDetailAction,fetchPostsAction } from "./actions";

export const fetchPostDetail = (id) => {
  return async (dispatch) => {
    axios.get(('http://localhost:3000/api/v1/posts/' +  String(id)), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
       dispatch(fetchPostDetailAction([response.data]))
    })
    .catch((error) => {
      console.log("error",error)
    })
  }
}

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