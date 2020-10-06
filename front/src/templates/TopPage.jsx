import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { TwitterLoginButton } from "../components/UIkit";
import { Helmet } from "react-helmet";
import { TwitterShareButton,TwitterIcon } from 'react-share';
import {useDispatch} from 'react-redux'
import {signIn} from "../reducks/users/operations"

const TopPage = () => {
  const dispatch = useDispatch()

  const url = process.env.REACT_APP_BASE_URL;
  const title = `開発途中のアプリです\n#hashtag_test`;

  return (
    <Container>
      <Helmet
        title={'Hello World'}
        meta={[
          { name: 'twitter:card', content: "summary_large_image" },
          // { name: 'twitter:title', content: 'Yomukatsu!' },
          // { name: 'twitter:description', content: 'description of TopPage' },
          // { name: 'twitter:image', content: 'https://global.canon/ja/environment/bird-branch/photo-gallery/kijibato/img/gallery-kijibato-main@2x.jpg' },
          { property: 'og:title', content: 'TopPageです' },
          // { property: 'og:type', content: 'website' },
          // { property: 'og:url', content: 'https://master.d11sevmfggnvt.amplifyapp.com/' },
          { property: 'og:image', content: 'https://global.canon/ja/environment/bird-branch/photo-gallery/kijibato/img/gallery-kijibato-main@2x.jpg' },
          { property: 'og:description', content: 'TopPageの詳細です' },
        ]}
      />
      <Typography>かんたん！5秒で登録！</Typography>
      <TwitterLoginButton
        label={"Twitter ログイン / 新規登録"}
        onClick={() => dispatch(signIn())}
      />
      <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={64} round />
      </TwitterShareButton>

    </Container>
  );
};

export default TopPage
