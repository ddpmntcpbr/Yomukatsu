import React, {useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Box,Button,Dialog,DialogActions,DialogContent,DialogTitle } from '@material-ui/core';
import { TextInput } from "../UIkit"
import { getUserName,getUserNickname } from "../../reducks/users/selectors"

const FormDialog = (props) => {
  const selector = useSelector((state)=>state);
  const userName = getUserName(selector)
  const userNickname = getUserNickname(selector)
  const [description,setDescription] = useState("")

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  },[]);

  const submitForm = () => {
    if(!description) {
      alert("フォーム内が空欄です")
      return props.handleClose()
    }
    const payload = {
      text: 'お問い合わせがありました\n' +
            'お名前: ' + userName + '\n' +
            'Twitter ID: @' + userNickname + '\n' +
            'お問い合わせ内容:\n' + description
    }

    fetch(process.env.REACT_APP_SLACK_WEB_HOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました！しばらくお待ちください')
      setDescription("")
      return props.handleClose()
    }).catch((error)=>{
      alert(error)
      setDescription("")
      return props.handleClose()
    })
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"お問い合せフォーム"}</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            送信者: {userName + "@" + userNickname}
          </Box>
        </Box>
        <TextInput
          label={"お問い合わせ内容"}
          fullWidth={true}
          multiline={true}
          rows={10}
          value={description}
          type={"text"}
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
  );
}

export default FormDialog