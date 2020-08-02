import React from 'react';
import {useDispatch} from 'react-redux'
import {signIn} from "../reducks/users/operations"

const Home = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>かんたん！5秒で登録！</h2>
      <button onClick={() => dispatch(signIn())}>Twitterログイン/新規登録</button>
    </div>
  );
};

export default Home
