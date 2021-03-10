import axios from 'axios'
import { push } from 'connected-react-router'
import { _sleep, createRandamString } from '../../helpers'
import { hideLoadingAction, showLoadingAction } from '../loading/actions'
// import { hideLoading, showLoading } from "../loading/operations";
import { setNotificationAction } from '../notification/actions'
import { signInAction, signOutAction } from './actions'

let notificationContent = {}

export const listenAuthState = () => {
  return async (dispatch) => {
    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('auth_token')) {
      const auth_token = localStorage.getItem('auth_token')
      const client_id = localStorage.getItem('client_id')
      const uid = localStorage.getItem('uid')
      const apiEndpoint = process.env.REACT_APP_API_V1_URL + '/users/currentuser'

      axios
        .get(apiEndpoint, {
          headers: {
            'access-token': auth_token,
            client: client_id,
            uid: uid,
          },
        })
        .then((response) => {
          const userData = response.data.data

          dispatch(
            signInAction({
              isSignedIn: true,
              image: userData.image,
              uid: userData.id,
              username: userData.name,
              userNickname: userData.nickname,
            })
          )
        })
        .catch(() => {
          dispatch(setNotificationAction('error', 'ログインに失敗しました'))
        })
      // LocalStorageに認証情報が含まれていない場合
    } else {
      dispatch(setNotificationAction('error', '認証情報が見つかりません'))
      dispatch(push('/'))
    }
  }
}

export const signIn = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign in...'))

    if (localStorage.getItem('auth_token')) {
      // Local Storageの初期化
      localStorage.clear()

      // Store Userの初期化
      dispatch(signOutAction())
      await _sleep(1000)
    }
    await _sleep(1000)
    // TwitterAPIのエンドポイントへリダイレクト
    const authOriginUrl = process.env.REACT_APP_BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
    window.location.href = process.env.REACT_APP_API_V1_URL + '/auth/twitter?auth_origin_url=' + authOriginUrl
  }
}

export const signInGuestUser = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign-in as guest user...'))

    if (localStorage.getItem('auth_token')) {
      // Local Storageの初期化
      localStorage.clear()

      // Store Userの初期化
      dispatch(signOutAction())
      await _sleep(1000)
    }

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth'

    const email = createRandamString(20) + '@example.com'
    const password = createRandamString(30)

    const data = {
      name: 'ゲストユーザー',
      email: email,
      password: password,
    }

    await axios
      .post(apiUrl, data)
      .then((response) => {
        localStorage.setItem('auth_token', response.headers['access-token'])
        localStorage.setItem('client_id', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        dispatch(push('/reading/posts'))
        notificationContent = {
          variant: 'success',
          message: 'ゲストログインしました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'ログインに失敗しました',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign out...'))
    dispatch(push('/'))
    // Local Storageの初期化
    localStorage.clear()

    // Store Userの初期化
    dispatch(signOutAction())
    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction('success', 'ログアウトしました'))
  }
}

export const deleteUser = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('ユーザー情報を削除しています'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth'
    const params = {
      'access-token': localStorage.getItem('auth_token'),
      client: localStorage.getItem('client_id'),
      uid: localStorage.getItem('uid'),
    }

    await axios
      .delete(apiUrl, { data: params })
      .then(() => {
        dispatch(push('/'))
        localStorage.clear()
        dispatch(signOutAction())
        notificationContent = {
          variant: 'success',
          message: '正常に退会が完了しました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: '退会に失敗しました',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}
