import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import axios from "axios"
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
// import { hideLoading, showLoading } from "../loading/operations";
import {_sleep} from "../../helpers"

export const listenAuthState = () => {
  return async (dispatch) => {
    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('auth_token')) {
      const auth_token = localStorage.getItem('auth_token')
      const client_id = localStorage.getItem('client_id')
      const uid = localStorage.getItem('uid')
      const apiEndpoint = process.env.REACT_APP_API_V1_URL + "/users/currentuser"

      axios.get(apiEndpoint, {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
      .then((response) => {
        const userData = response.data.data

        dispatch(signInAction({
          isSignedIn: true,
          image: userData.image,
          uid: userData.id,
          username: userData.name,
        }))
      })
      .catch((error) => {
        console.log(error)
      })

    // LocalStorageに認証情報が含まれていない場合
    } else {
      console.log("LocalStorageに認証情報が含まれていません")
      dispatch(push("/"))
    }
  }
}


export const signIn = () => {

  return async (dispatch) => {
    dispatch(showLoadingAction("Sign in..."))
    await _sleep(1000)
    // TwitterAPIのエンドポイントへリダイレクト
    const authOriginUrl = process.env.REACT_APP_BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
    window.location.href = process.env.REACT_APP_API_V1_URL + '/auth/twitter?auth_origin_url=' + authOriginUrl;

    // 失敗したら、SignIn画面へリダイレクト
    dispatch(push("/"));
  }
}

export const signInGuestUser = () => {

  return async (dispatch) => {
    dispatch(showLoadingAction("Sign-in as guest user..."))

    const apiUrl = process.env.REACT_APP_API_V1_URL + "/auth/sign_in"

    const data = {
      "email": process.env.REACT_APP_GUEST_USER_SIGNIN_EMAIL,
      "password": process.env.REACT_APP_GUEST_USER_SIGNIN_PASSWORD
    }

    await axios.post(apiUrl,data)
    .then((response) => {
      localStorage.setItem('auth_token', response.headers["access-token"]);
      localStorage.setItem('client_id', response.headers["client"]);
      localStorage.setItem('uid', response.headers["uid"]);
      dispatch(push("/reading/posts"))
    })
    .catch((error) => {
      console.log("error",error)
    })

    await _sleep(1000);
    dispatch(hideLoadingAction())
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction("Sign out..."))
    // Local Storageの初期化
    localStorage.clear()

    // Store Userの初期化
    dispatch(signOutAction());
    await _sleep(1000)
    dispatch(push("/"));
    dispatch(hideLoadingAction())
  }
}