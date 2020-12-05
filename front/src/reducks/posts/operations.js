import axios from "axios";
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {_sleep} from "../../helpers"
import {
  fetchPostDetailAction,
  fetchPostsAction,
  fetchReadingPostAction
} from "./actions";


export const fetchPostDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍情報を取得中..."))

    const data = await axios.get((process.env.REACT_APP_API_V1_URL + '/posts/' +  String(id)), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => [response.data])
    .catch(() => [])
    // console.log("fetchPostDetail",data)
    dispatch(fetchPostDetailAction(data))
    await _sleep(1000);
    dispatch(hideLoadingAction())
  }
}

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍リストを取得中..."))
    axios.get(process.env.REACT_APP_API_V1_URL + '/posts', {
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

    await _sleep(1000);

    dispatch(hideLoadingAction())

  }
}

export const fetchReadingPost = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("読書中の書籍を取得中..."))
    axios.get(process.env.REACT_APP_API_V1_URL + '/posts/reading', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
       dispatch(fetchReadingPostAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
    })

    await _sleep(1000);

    dispatch(hideLoadingAction())

  }
}

export const saveRegisteredPost = (title,url,author,image,mapItems) => {
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
      "status": "registered",
      "post_items_attributes": post_items_attributes
      }

    axios.post(process.env.REACT_APP_API_V1_URL + '/posts', data, {
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

export const updateStatusToCompleted = (prevData) =>{
  return async (dispatch) => {
    const id = prevData.id

    const data = {
      // "id": prevData.id,
      "status": "completed"
      }
    // console.log("updateStatusToCompleted", data)

    axios.put((process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)), data, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      .then((response) => {
        // console.log(response)
        dispatch(push("/mypage"))
      })
      .catch((error) => {
        console.log("error",error)
      })

  }
}