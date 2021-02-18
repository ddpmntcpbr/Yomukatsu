import { setNotificationAction } from "./actions"
import {_sleep} from "../../helpers"

export const delaySetNotification = (variant,message,delayTime) => {
  return async (dispatch) => {
    console.log("delaySetNotification")
    await _sleep(delayTime)
    dispatch(setNotificationAction(variant,message))
  }
}