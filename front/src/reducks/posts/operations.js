import axios from "axios";
// import { headers } from "../../headers"
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {_sleep} from "../../helpers"
import {
  fetchCompletedPostsAction,
  fetchCompletedPostsDetailAction,
  fetchPostsFailureAction,
  fetchPostsAction,
  fetchReadingPostsAction,
  fetchRegisteredPostsAction,
  fetchRegisteredPostsDetailAction,
  startFetchingPostsAction
} from "./actions";

export const exchangeRegisteredAndReadingPost = (id) => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/registered/posts/exchange_registered_and_reading_post/' + String(id)

    await axios.get(apiUrl, { headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      dispatch(push("/reading/posts"))
    })
    .catch((error) => {
      console.log("error",error)
    })
  }
}


// posts全体を取得する
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts'

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      console.log(response.data)
      dispatch(fetchPostsAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
      dispatch(fetchPostsFailureAction(error))
    })
  }
}

// share用のpostsを取得する
// export const fetchSharePost = () => {

// }

export const fetchReadingPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/reading/posts'

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
       dispatch(fetchReadingPostsAction(response.data))
    })
    .catch((error) => {
      console.log("error",error)
      dispatch(fetchPostsFailureAction(error))
    })
  }
}

export const fetchCompletedPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/completed/posts'

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
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
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/completed/posts/' +  String(id)

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
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
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/registered/posts'

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
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
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/registered/posts/' +  String(id)

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
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

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/reading/change_status_from_reading_to_registered'

    await axios.get(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then(() => {
      axios.post(process.env.REACT_APP_API_V1_URL + '/posts', data, {headers:{
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }})
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

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts';

    await axios.post(apiUrl, data, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
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

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)

    await axios.put(apiUrl, data, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      dispatch(push("/completed/posts"))
    })
    .catch((error) => {
      console.log("error",error)
    })
  }
}
