import axios from "axios";
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {setNotificationAction} from "../notification/actions";
import {_sleep} from "../../helpers"
import {
  fetchPostsFailureAction,
  fetchPostsAction,
  startFetchingPostsAction
} from "./actions";
import _ from 'lodash';

let notificationContent = {}

export const exchangeRegisteredAndReadingPost = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("カレントブックに設定中..."))
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/registered/posts/exchange_registered_and_reading_post/' + String(id)

    await axios.get(apiUrl, { headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then(() => {
      dispatch(fetchPosts())
      dispatch(push("/reading/posts"))
      notificationContent = {variant:"success",message:"書籍を読書中にセットしました"}
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"書籍情報を変更に失敗しました"}
    })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍情報を削除中..."))
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)

    await axios.delete(apiUrl, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then(() => {
      dispatch(fetchPosts())
      dispatch(push("/posts/list"))
      notificationContent = {variant:"success",message:"書籍を削除しました"}
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"削除に失敗しました"}
    })
    await _sleep(1000);
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// posts全体を取得する
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(startFetchingPostsAction())
    const data = {"reading":[],"registered":[],"completed":[]}

    await axios.get(process.env.REACT_APP_API_V1_URL + '/reading/posts', {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      data["reading"]=response.data
    })
    .catch((error) => {
      dispatch(fetchPostsFailureAction(error))
    })

    await axios.get(process.env.REACT_APP_API_V1_URL + '/registered/posts', {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      data["registered"]=response.data
    })
    .catch((error) => {
      dispatch(fetchPostsFailureAction(error))
    })

    await axios.get(process.env.REACT_APP_API_V1_URL + '/completed/posts', {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then((response) => {
      data["completed"]=response.data
    })
    .catch((error) => {
      dispatch(fetchPostsFailureAction(error))
    })

    dispatch(fetchPostsAction(data))

  }
}

// posts全体を取得する。初回レンダー時のみ使用
export const initialFetchPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍情報を取得中..."))
    dispatch(fetchPosts())
    await _sleep(1000)
    dispatch(hideLoadingAction())
  }
}

// reading posts として書籍情報を新規登録
export const saveReadingPost = (title,url,author,image,postItems) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍登録中..."))

    const post_items_attributes = []
    postItems.map((postItem) => (
      post_items_attributes.push({"content":postItem.content})
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
        dispatch(fetchPosts())
        dispatch(push("/reading/posts"))
        notificationContent = {variant:"success",message:"新規登録に成功しました"}
      })
      .catch((error) => {
        console.log("error",error)
        notificationContent = {variant:"error",message:"新規登録に失敗しました"}
      })
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"新規登録に失敗しました"}
    })

    await _sleep(2500);
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// registered posts として書籍情報を新規登録
export const saveRegisteredPost = (title,url,author,image,postItems) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("書籍登録中..."))
    const post_items_attributes = []

    postItems.map((postItem) => (
      post_items_attributes.push({"content":postItem.content})
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
      const postId = response.data.id
      dispatch(fetchPosts())
      dispatch(push("/registered/posts/" + postId))
      notificationContent = {variant:"success",message:"新規登録に成功しました"}
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"新規登録に失敗しました"}
    })
    await _sleep(2500);
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// postItemsを更新
export const updatePostItems = (id,initialPostItems,editedPostItems) => {
  return async (dispatch) => {
    const initialPostItemsIds = initialPostItems.map((item,index) => {
      return item["id"]
    })

    const editedPostItemsIds = editedPostItems.map((item,index) => {
      return item["id"]
    })

    const deletedPostItemsIds = _.difference(initialPostItemsIds,editedPostItemsIds)

    const resultPostItems = [...editedPostItems]

    deletedPostItemsIds.map((id,index) => (
      resultPostItems.push({
        "id": id,
        "content": ""
      })
    ))

    const data = {
      "post_items_attributes": {...resultPostItems}
    }

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts/' + id;

    await axios.patch(apiUrl, data, {headers :{
      'access-token': localStorage.getItem('auth_token'),
      'client': localStorage.getItem('client_id'),
      'uid': localStorage.getItem('uid'),
    }})
    .then(() => {
      dispatch(fetchPosts())
      notificationContent = {variant:"success",message:"マップアイテムを更新しました"}
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"更新に失敗しました"}
    })
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// reading post を registered post に変更
export const updateStatusToCompleted = (prevData) =>{
  return async (dispatch) => {
    dispatch(showLoadingAction("完読書籍として登録中..."))

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
      const postId = response.data.id
      dispatch(fetchPosts())
      dispatch(push("/completed/posts/" + postId))
      notificationContent = {variant:"success",message:'完読！Twitterでシェアしよう！'}
    })
    .catch((error) => {
      console.log("error",error)
      notificationContent = {variant:"error",message:"更新に失敗しました"}
    })
    await _sleep(1000);
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}
