import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from '@material-ui/core'
import { getUserName, getUserNickname } from '../../reducks/users/selectors'
import { setNotificationAction } from '../../reducks/notification/actions'

const FormDialog = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const userName = getUserName(selector)
  const userNickname = getUserNickname(selector)
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [])

  const submitForm = () => {
    if (!email || !description) {
      dispatch(setNotificationAction('error', '入力フォームが空欄です'))
      return props.handleClose()
    }

    // Emailチェック用正規表現パターン
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/

    if (!reg.test(email)) {
      dispatch(setNotificationAction('error', '不正なメールアドレスです'))
      return props.handleClose()
    }

    const payload = {
      text:
        'お問い合わせがありました\n' +
        'お名前: ' +
        userName +
        '\n' +
        'Twitter ID: @' +
        userNickname +
        '\n' +
        'Emailアドレス: @' +
        email +
        '\n' +
        'お問い合わせ内容:\n' +
        description,
    }

    fetch(process.env.REACT_APP_SLACK_WEB_HOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(() => {
        dispatch(setNotificationAction('success', '送信が完了しました'))
        setEmail('')
        setDescription('')
        return props.handleClose()
      })
      .catch((error) => {
        dispatch(setNotificationAction('error', '送信に失敗しました'))
        setEmail('')
        setDescription('')
        return props.handleClose()
      })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      style={{ maxHeight: '90%' }}
    >
      <DialogTitle id="form-dialog-title">お問い合せフォーム</DialogTitle>
      <DialogContent>
        <DialogContentText>送信者: {userName + '@' + userNickname}</DialogContentText>
        {/* <TextInput
          label={"お問い合わせ内容"}
          fullWidth={true}
          multiline={true}
          rows={10}
          value={description}
          type={"text"}
          onChange={inputDescription}
        /> */}
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={inputEmail}
        />
        <TextField
          margin="dense"
          id="description"
          label="お問い合わせ内容"
          type="text"
          fullWidth
          multiline
          rows={10}
          value={description}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
