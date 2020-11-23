import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { TwitterLoginButton } from "../components/UIkit";
import { Helmet } from "react-helmet";
import { TwitterShareButton,TwitterIcon } from 'react-share';
import {useDispatch} from 'react-redux';
import {signIn} from "../reducks/users/operations";
import topPageImage from "../assets/img/src/top.png";
import axios from "axios";
import {PrimaryButton} from "../components/UIkit"

const fetchHttpsUsersCount = () => {
    return async () => {
      // const apiEndpoint = process.env.REACT_APP_API_V1_URL + "/users_count"
      const apiEndpoint = "https://backend.book.yomukatsu.com/api/v1/users_count"
      console.log("httpsApiEndpoint",apiEndpoint)
      axios.get(apiEndpoint)
      .then((response) => {
        console.log("fetchHttpsUsersCount",response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

const fetchHttpUsersCount = () => {
    return async () => {
      const apiEndpoint = "http://backend.book.yomukatsu.com/api/v1/users_count"
      console.log("httpApiEndpoint",apiEndpoint)
      axios.get(apiEndpoint)
      .then((response) => {
        console.log("fetchHttpUsersCount",response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

const TopPage = () => {
  const dispatch = useDispatch()

  const url = process.env.REACT_APP_BASE_URL;
  const title = `開発途中のアプリです\n#hashtag_test`;
  // const [usersCount,setUsersCount] = useState(0);
  // const usersCount = fetchUsersCount()

  // useEffect(()=>{
  //   // setUsersCount(fetchUsersCount())
  //   const usersCount = fetchUsersCount()
  // },[])

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
      <div>
        <img
          src={topPageImage} alt="topPageImage"
        />
      </div>
      <Typography>HTTPS対応</Typography>
      <Typography>かんたん！5秒で登録！</Typography>
      <TwitterLoginButton
        label={"Twitter ログイン / 新規登録"}
        onClick={() => dispatch(signIn())}
      />
      <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={64} round />
      </TwitterShareButton>
      <PrimaryButton
        label="fetchHttpUsersCount"
        onClick={fetchHttpUsersCount()}
      />
      <PrimaryButton
        label="fetchHttpsUsersCount"
        onClick={fetchHttpsUsersCount()}
      />
      {/* <Typography>{usersCount}</Typography> */}
    </Container>
  );
};

export default TopPage
