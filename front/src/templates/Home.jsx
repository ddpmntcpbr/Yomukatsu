import React from 'react';
import {getUserId, getUserName, getUserImage} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
import {signOut} from "../reducks/users/operations"

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state);

  const uid = getUserId(selector);
  const username = getUserName(selector);
  const image = getUserImage(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <div>
        <img src={image} alt="アイコン"/>
      </div>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home
