import { signInAction } from "./actions";
import { push } from "connected-react-router";
import axios from "axios"

// export const setAuthTokensInLocalStorage = () => {

// }

export const listenAuthState = () => {
  return async (dispatch) => {

    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('auth_token')) {
      console.log("Local Storageに認証情報が含まれている場合")
      const auth_token = localStorage.getItem('auth_token')
      const client_id = localStorage.getItem('client_id')
      const uid = localStorage.getItem('uid')

      axios.get('http://localhost:3000/api/v1/users/currentuser', {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
      .then((response) => {
        console.log(response.data.data)
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
      console.log("Local Storageが空の場合")
      dispatch(push("/signin"))
    }
  }
}


export const signIn = () => {

  return async (dispatch) => {
    // 本処理
    // TwitterAPIのエンドポイントへリダイレクト
    // window.location.href = process.env.REACT_APP_API127_URL + '/api/v1/auth/twitter?auth_origin_url=' + process.env.REACT_APP_BASE_URL;
    window.location.href = 'http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=localhost:8000';

    // リクエストヘッダーのuid, access-token, clientをLocal Storageに保存

    // Home画面へリダイレクト
    // dispatch(push("/signin"));

    // 失敗したら、SignIn画面へリダイレクト


    // ダミー処理
    // dispatch(signInAction({
    //   isSignedIn: true,
    //   role: "LoginRole",
    //   uid: "LoginUid",
    //   username: "LoginUser"
    // }));

    // dispatch(push("/"));
  }
}

export const signOut = () => {
  return async (dispatch) => {

    // Local Storageの初期化
    // 未実装

    // Redux Store の初期化
    dispatch(signInAction({
      isSignedIn: false,
      role: "",
      uid: "",
      username: ""
    }));

    dispatch(push("/"));
  }
}