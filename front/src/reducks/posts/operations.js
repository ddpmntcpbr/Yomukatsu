import axios from "axios";
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {_sleep} from "../../helpers"
import {
  fetchCompletedPostsAction,
  fetchCompletedPostsDetailAction,
  fetchPostsFailureAction,
  fetchReadingPostsAction,
  fetchRegisteredPostsAction,
  fetchRegisteredPostsDetailAction,
  startFetchingPostsAction
} from "./actions";

export const exchangeRegisteredAndReadingPost = (id) => {
  return async (dispatch) => {
    await axios.get(process.env.REACT_APP_API_V1_URL + '/registered/posts/exchange_registered_and_reading_post/' + String(id), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
      console.log(response)
      dispatch(push("/reading/posts"))
    })
    .catch((error) => {
      console.log("error",error)
    })
  }
}

export const fetchReadingPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
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
      dispatch(fetchPostsFailureAction(error))
    })
  }
}

export const fetchCompletedPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
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
      dispatch(fetchPostsFailureAction(error))
    })
  }
}

export const fetchCompletedPostsDetail = (id) => {
  return async (dispatch) => {
    await axios.get((process.env.REACT_APP_API_V1_URL + '/completed/posts/' +  String(id)), {
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
    dispatch(fetchPostsFailureAction(error))
   })
  }
}

export const fetchRegisteredPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
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
      dispatch(fetchPostsFailureAction(error))
    })
  }
}

export const fetchRegisteredPostsDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("fetchRegisteredPostDetail..."))
    await axios.get((process.env.REACT_APP_API_V1_URL + '/registered/posts/' +  String(id)), {
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

export const saveReadingPost = (title,url,author,image,mapItems) => {
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


    axios.get(process.env.REACT_APP_API_V1_URL + '/reading/change_status_from_reading_to_registered', {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then(() => {
      axios.post(process.env.REACT_APP_API_V1_URL + '/posts', data, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      .then(() => {
        dispatch(push("/reading/posts"))
      })
      .catch((error) => {
        console.log("error",error)
      })
    })
    .catch((error) => {
      console.log("error",error)
    })
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

    await axios.post(process.env.REACT_APP_API_V1_URL + '/posts', data, {
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
      await _sleep(1000);
      dispatch(hideLoadingAction())
  }
}

export const updateStatusToCompleted = (prevData) =>{
  return async (dispatch) => {
    const id = prevData.id

    const data = {
      "status": "completed"
      }

    await axios.put((process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)), data, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      .then((response) => {
        dispatch(push("/completed/posts"))
      })
      .catch((error) => {
        console.log("error",error)
      })

  }
}
