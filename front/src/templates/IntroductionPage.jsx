import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box,Button,Divider,Paper } from '@material-ui/core';
import { TwitterLoginButton } from "../components/UIkit";
import {listenAuthState, signIn,signInGuestUser} from "../reducks/users/operations";
import topPageImage from "../assets/img/src/top.png";
import {PrimaryButton} from "../components/UIkit";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/styles";
import Image from "react-image-resizer";
import womanImage from "../assets/img/src/woman.png";
import postEditScreenShotImage from "../assets/img/src/postEditScreenShot.png";
import favoImage from "../assets/img/src/favo.png";
import ideaImage from "../assets/img/src/idea.png";
import researchImage from "../assets/img/src/research.png";
import terminalImage from "../assets/img/src/terminal.png";
import axios from "axios"
import { push } from "connected-react-router";
import administratorIcon from "../assets/img/src/administratorIcon.png"
import CopyrightIcon from '@material-ui/icons/Copyright';
import { getSignedIn } from "../reducks/users/selectors";

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100]
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: theme.palette.grey[900],
    marginTop: theme.spacing(2)
  },
  subTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.grey[800]
  },
  content: {
    fontSize: "1rem",
    color: theme.palette.grey[800]
  },
  subContent: {
    fontSize: "0.8rem",
    color: theme.palette.grey[800]
  },
  youtube: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
    "& iframe": {
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%"
    }
  },
  administratorIcon:{
    "& img":{
      borderRadius: "50%"
    }
  },
  footerLink: {
    fontSize: "0.8rem",
    color: theme.palette.primary.main,
    '&:hover':{
      cursor: "pointer",
      borderBottom: "1px solid"
    }
  }
}))

const IntroductionPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  const userCount = () => {
    axios.get(process.env.REACT_APP_API_V1_URL + '/users_count')
    .then((response) => {
      console.log("User.count",response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const postCount = () => {
    axios.get(process.env.REACT_APP_API_V1_URL + '/posts_count')
    .then((response) => {
      console.log("Post.count",response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (!isSignedIn && localStorage.getItem('auth_token')) {
      dispatch(listenAuthState())
    }
  },[isSignedIn,dispatch])

  return (
    <Box >
      <Box component={Paper} p={2} className={classes.paper}>
        <Box textAlign="center" fontSize="2.0rem" fontWeight="bold">
          アプリの使い方
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            1. 書籍を新規登録をしよう！
          </Box>
          <Divider/>
          <Box className={classes.content} component="h6" mt={2}>
            キーワード検索から書籍を選び、ヒントを参考にしながら"読書メンタルマップ"を作成しましょう<br/>
            <br/>
            "読書メンタルマップ"は、書籍登録後からでもいつでも更新できますので、最初はあまり深く考えなくてOKです
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            2. 「読書中」にセットしよう！
          </Box>
          <Divider/>
          <Box className={classes.content} component="h6" mt={2}>
            新規作成を押すと、「読書中にセット」「登録のみ」の２つを選ぶことができます。<br/>
            <br/>
            すぐに読み始める場合は「読書中にセット」を選び、後々で読む予定ならば「登録のみ」を
            選んでください
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
            Yomukatsuでは、作成した書籍情報は全部で 3つ の登録状態を持ちます
          </Box>
          <Box fontWeight="bold" my={4}>
            1. 「読書中」: 現在読書中の書籍。全体でひとつだけ設定できる<br/><br/>
            2. 「登録中」: 登録はしているが、まだ読み終わってはいない状態の書籍。いくつも登録できる<br/><br/>
            3. 「完読済」: 読み終わった状態の書籍<br/><br/>
          </Box>
          <Box className={classes.content} component="h6" mt={2}>
            「読書中」アイテムと「登録中」アイテムの入れ替えは、登録リストからいつでもできます
          </Box>
          <Image
            src={womanImage}
            width={200}
            height={200}
            style={{margin: "auto"}}
          />
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            3. 読書中にセットした書籍を読もう！
          </Box>
          <Divider/>
          <Box className={classes.content} component="h6" mt={2}>
            読書中にセットした本を読んでいきましょう。<br/>
            <br/>
            「ちょっと飽きてきちゃったなー」というときこそ、読書メンタルマップの出番！自作したマップを読み返してモチベーションを高めましょう<br/>
            <br/>
            また、一度中断した書籍を再び読み始めるときのモチベーションフックとしても活用できます！
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
            読書中アイテムのメンタルマップを読み返す！本を読みながら新しいマップ項目が思いついたら、どんどん追加してこう
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            4. 読み終わったら「完読した！」ボタンをクリック！Twitterでシェアしよう！
          </Box>
          <Divider/>
          <Box className={classes.content} component="h6" mt={2}>
            完読ボタンを押すことで、書籍を「完読済み」にすることができます。<br/>
            <br/>
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
            Twitterボタンで完読をシェアし、読書仲間からのいいねをもらいましょう！<br/>
            <br/>
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
            ※Twitterシェアされるのは書籍そのものの情報だけであり、メンタルマップの中身は他人に公開されることはありません
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{margin: "auto"}}
            />
            シェアされるページ
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default IntroductionPage
