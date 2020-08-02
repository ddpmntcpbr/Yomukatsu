import React from 'react';
import {getUserId, getUserName} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
import {signIn} from "../reducks/users/operations"

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>SignIn</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <button onClick={() => dispatch(signIn())}>SIGN IN</button>
    </div>
  );
};

export default Home
