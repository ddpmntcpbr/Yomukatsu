import React from 'react';
import {getUserId, getUserName, getUserImage} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
import {signOut} from "../reducks/users/operations"
import { TweetButton } from '../components/UIKit';
import { Helmet } from 'react-helmet';

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state);

  const uid = getUserId(selector);
  const username = getUserName(selector);
  const image = getUserImage(selector);

  return (
    <div>
      <Helmet
      title={'Hello World'}
      meta={[
        { name: 'twitter:card', content: 'summary' },
        { property: 'og:image', content: 'http://pbs.twimg.com/profile_images/1146784352019177472/h52X2ZUP_normal.png' },
        { property: 'og:title', content: 'Helloページ' },
        { property: 'og:description', content: 'サンプルページです' },
        { property: "og:url", content: "https://twitter.com/ddpmntcpbr" }
      ]}
      />


      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <div>
        <img src={image} alt="アイコン"/>
      </div>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
      <div>
        <TweetButton label="ツイート" />
      </div>
    </div>
  );
};

export default Home
