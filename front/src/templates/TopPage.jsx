import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux'
import {signIn} from "../reducks/users/operations"
import {TwitterLoginButton} from "../components/UIkit"

const TopPage = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <Typography>かんたん！5秒で登録！</Typography>
      <TwitterLoginButton
        label={"Twitter ログイン / 新規登録"}
        onClick={() => dispatch(signIn())}
      />
    </Container>
  );
};

export default TopPage
