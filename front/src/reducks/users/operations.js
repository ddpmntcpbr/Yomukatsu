import { signInAction } from "./actions";
import { push } from "connected-react-router";
// import {axios} from "../../axios/index"

export const signIn = () => {
  return async (dispatch) => {
    // ダミー処理
    dispatch(signInAction({
      isSignedIn: true,
      role: "LoginRole",
      uid: "LoginUid",
      username: "LoginUser"
    }));

    dispatch(push("/"));
  }
}