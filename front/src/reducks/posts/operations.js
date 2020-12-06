import axios from "axios";
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {_sleep} from "../../helpers"
import {
  fetchCompletedPostsAction,
  fetchCompletedPostsDetailAction,
  fetchPostDetailAction,
  fetchPostsAction,
  fetchReadingPostsAction,
  fetchRegisteredPostsAction,
  fetchRegisteredPostsDetailAction
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
    .then((response) => {
      dispatch(fetchPostDetailAction(response.data))
   })
   .catch((error) => {
     console.log("error",error)
   })
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

export const fetchReadingPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("読書中の書籍を取得中..."))
    axios.get(process.env.REACT_APP_API_V1_URL + '/reading/posts', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
       dispatch(fetchReadingPostsAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
    })

    await _sleep(1000);

    dispatch(hideLoadingAction())

  }
}

export const fetchCompletedPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("完読済みの書籍を取得中..."))
    axios.get(process.env.REACT_APP_API_V1_URL + '/completed/posts', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
       dispatch(fetchCompletedPostsAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
    })

    await _sleep(1000);

    dispatch(hideLoadingAction())

  }
}

export const fetchCompletedPostsDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("fetchCompletedPostsDetail..."))
    const data = await axios.get((process.env.REACT_APP_API_V1_URL + '/completed/posts/' +  String(id)), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
      dispatch(fetchCompletedPostsDetailAction([response.data]))
   })
   .catch((error) => {
     console.log("error!",error)
   })

    await _sleep(1000);
    dispatch(hideLoadingAction())
  }
}

export const fetchRegisteredPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("登録済みの書籍を取得中..."))
    axios.get(process.env.REACT_APP_API_V1_URL + '/registered/posts', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
       dispatch(fetchRegisteredPostsAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
    })

    await _sleep(1000);

    dispatch(hideLoadingAction())

  }
}

export const fetchRegisteredPostsDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("fetchRegisteredPostDetail..."))
    const data = await axios.get((process.env.REACT_APP_API_V1_URL + '/registered/posts/' +  String(id)), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
      dispatch(fetchRegisteredPostsDetailAction([response.data]))
   })
   .catch((error) => {
     console.log("error!",error)
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
        dispatch(push("/registered/posts"))
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