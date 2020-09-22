import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import axios from "axios"

export const listenAuthState = () => {
  return async (dispatch) => {

    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('auth_token')) {
      const auth_token = localStorage.getItem('auth_token')
      const client_id = localStorage.getItem('client_id')
      const uid = localStorage.getItem('uid')
      const apiEndpoint = process.env.REACT_APP_API_V1_URL + "/users/currentuser"

      // console.log("apiEndpoint",apiEndpoint)
      axios.get(apiEndpoint, {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
      .then((response) => {
        // console.log("listenAuthState",response)
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
      dispatch(push("/"))
    }
  }
}


export const signIn = () => {

  return async (dispatch) => {
    // TwitterAPIのエンドポイントへリダイレクト
    const authOriginUrl = process.env.REACT_APP_BASE_URL.replace("http://","")
    // console.log("signIn", process.env.REACT_APP_API127_URL + '/api/v1/auth/twitter?auth_origin_url=' + authOriginUrl)

    window.location.href = process.env.REACT_APP_API127_URL + '/api/v1/auth/twitter?auth_origin_url=' + authOriginUrl;
    // window.location.href = 'http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=' + process.env.REACT_APP_URL;

    // 失敗したら、SignIn画面へリダイレクト
    // dispatch(push("/mypage"));
  }
}

export const signOut = () => {
  return async (dispatch) => {

    // Local Storageの初期化
    localStorage.clear()

    // Store Userの初期化
    dispatch(signOutAction());
    dispatch(push("/"));
  }
}