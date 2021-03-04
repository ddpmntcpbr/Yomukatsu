import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Divider, Paper } from "@material-ui/core";
import { TwitterLoginButton } from "components/UIkit";
import {
  listenAuthState,
  signIn,
  signInGuestUser,
} from "reducks/users/operations";
import topPageImage from "assets/img/src/top.png";
import { PrimaryButton } from "components/UIkit";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/styles";
import Image from "react-image-resizer";
import womanImage from "assets/img/src/woman.png";
import postEditScreenShotImage from "assets/img/src/postEditScreenShot.png";
import favoImage from "assets/img/src/favo.png";
import ideaImage from "assets/img/src/idea.png";
import researchImage from "assets/img/src/research.png";
import terminalImage from "assets/img/src/terminal.png";
import axios from "axios";
import { push } from "connected-react-router";
import administratorIcon from "assets/img/src/administratorIcon.png";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { getSignedIn } from "reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[100],
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: theme.palette.grey[900],
    marginTop: theme.spacing(2),
  },
  subTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.grey[800],
  },
  content: {
    fontSize: "1rem",
    color: theme.palette.grey[800],
  },
  subContent: {
    fontSize: "0.8rem",
    color: theme.palette.grey[800],
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
      height: "100%",
    },
  },
  administratorIcon: {
    "& img": {
      borderRadius: "50%",
    },
  },
  footerLink: {
    fontSize: "0.8rem",
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
      borderBottom: "1px solid",
    },
  },
}));

const TopPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  const userCount = () => {
    axios
      .get(process.env.REACT_APP_API_V1_URL + "/users_count")
      .then((response) => {
        console.log("User.count", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCount = () => {
    axios
      .get(process.env.REACT_APP_API_V1_URL + "/posts_count")
      .then((response) => {
        console.log("Post.count", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isSignedIn && localStorage.getItem("auth_token")) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  return (
    <Box>
      <Button variant="contained" onClick={userCount}>
        User count
      </Button>
      <Button variant="contained" onClick={postCount}>
        Post count
      </Button>
      <Helmet
        meta={[
          { name: "twitter:card", content: "summary" },
          {
            name: "twitter:image",
            content:
              "https://www.book.yomukatsu.com/static/media/logo.e89c3802.png",
          },
          { name: "twitter:title", content: "Yomukatsu" },
          { name: "twitter:description", content: "積読解消サポート!" },
        ]}
      />
      <Box component={Paper} p={2} className={classes.paper}>
        <Box textAlign="center" fontSize="2.0rem" fontWeight="bold">
          積読解消アプリ「Yomukatsu!」
        </Box>
        <Box textAlign="center" fontSize="1rem" my={1}>
          「読書メンタルマップ術」を使って
          <br />
          積読を解消しよう！
        </Box>
        <img src={topPageImage} alt="topPageImage" width="100%" />

        <Box className={classes.title} component="h2" mt={10}>
          新規登録/ログイン
        </Box>
        <Divider />
        <Box className={classes.content} component="h6" textAlign="center">
          <Box py={2}>
            <Box>↓かんたん！5秒で無料登録！↓</Box>
            <TwitterLoginButton
              label={"Twitter ログイン / 新規登録"}
              onClick={() => dispatch(signIn())}
            />
            <Box py={1} fontSize="0.8rem">
              ※勝手にツイートすることはありません
            </Box>
          </Box>
          <Box py={2}>
            <Box>↓お試しはコチラ(ユーザー登録無し)↓</Box>
            <PrimaryButton
              label="ゲストログイン"
              onClick={() => dispatch(signInGuestUser())}
            />
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            Yomukatsu使い方(字幕動画)
          </Box>
          <Divider />
          <Box className={classes.youtube} textAlign="center" mt={2}>
            <iframe
              width="480"
              height="270"
              src="https://www.youtube.com/embed/qBvS3Ilp_3o"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="tutorial"
            ></iframe>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            Yomukatsuとは？
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            PCやスマホで簡単に「読書メンタルマップ術」を実践することで、
            <br />
            ユーザーの積読解消をサポートするアプリです。
            <Image
              src={womanImage}
              width={200}
              height={200}
              style={{ margin: "auto" }}
            />
            「読書メンタルマップ術」とは、ハーバード大学ショーンエーカー氏が
            <br />
            提唱している積読解消術です。読破したい対象の書籍に対して、
            <br />
            <Box fontWeight="bold" my={4}>
              1.
              その本について興味があること、それを知って得られるメリットを文章に書き出す
              <br />
              2. 読んでいる途中で飽きてきたら、それを読み返す
              <br />
            </Box>
            を繰り返すことで完読までモチベーションを維持する、という読書法です。
            <Box mt={4}>
              <img
                src={postEditScreenShotImage}
                alt="postEditScreenShotImage"
                width="100%"
              />
              <Box fontSize="0.8rem" textAlign="center">
                読書メンタルマップ作成イメージ
              </Box>
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            Yomukatsuでできること
          </Box>
          <Divider />
          <Box textAlign="center">
            <Box mt={4}>
              <Box className={classes.subTitle} component="h3">
                PCやスマホから、ペーパーレスでお手軽利用！
              </Box>
              <Box className={classes.subContent} component="h6" mt={2}>
                通勤中など、紙やペンが手元にない状態であっても、
                <br />
                読書メンタルマップの作成・管理ができます
              </Box>
              <Image
                src={terminalImage}
                width={200}
                height={200}
                style={{ margin: "auto" }}
              />
            </Box>

            <Box mt={10}>
              <Box className={classes.subTitle} component="h3">
                マップ作成をサポートするヒント機能！
              </Box>
              <Box className={classes.subContent} component="h6" mt={2}>
                「どうやってマップを作ったらいいか分からない・・・」という方向けの、
                <br />
                充実したヒント機能！
              </Box>
              <Image
                src={ideaImage}
                width={200}
                height={200}
                style={{ margin: "auto" }}
              />
            </Box>

            <Box mt={10}>
              <Box className={classes.subTitle} component="h3">
                読書遍歴をログとして記録！
              </Box>
              <Box className={classes.subContent} component="h6" mt={2}>
                読破してきた書籍がログとして貯まることで、達成感が味わえます
              </Box>

              <Image
                src={researchImage}
                width={200}
                height={200}
                style={{ margin: "auto" }}
              />
            </Box>

            <Box mt={10}>
              <Box className={classes.subTitle} component="h3">
                登録した書籍をTwitterでシェア！
              </Box>
              <Box className={classes.subContent} component="h6" mt={2}>
                読書仲間で「いいね」を送り合って、モチベを高めよう！
                <Box style={{ color: "red" }}>
                  (※ メンタルマップの中身が公開されることはありません)
                </Box>
              </Box>
              <Image
                src={favoImage}
                width={200}
                height={200}
                style={{ margin: "auto" }}
              />
            </Box>
          </Box>

          <Box component="h6" textAlign="center" py={4}>
            <Box className={classes.subTitle}>まずはワンタップで無料登録♪</Box>
            <Box my={1}>
              <TwitterLoginButton
                label={"Twitter ログイン / 新規登録"}
                onClick={() => dispatch(signIn())}
              />
            </Box>
            <Box my={1}>
              <PrimaryButton
                label="ゲストログイン"
                onClick={() => dispatch(signInGuestUser())}
              />
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <Box>
              <CopyrightIcon
                style={{ fontSize: "0.8rem", verticalAlign: -1 }}
              />
            </Box>
            <Box fontSize="0.8rem" ml={1}>
              2021 辻野翔陽
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box className={classes.administratorIcon}>
              <img
                src={administratorIcon}
                alt="administratorIcon"
                width="30px"
                height="30px"
              />
            </Box>
            <Box ml={1} fontSize="0.8rem">
              運営者:
            </Box>
            <Box
              className={classes.footerLink}
              onClick={() => window.open("https://twitter.com/ddpmntcpbr")}
            >
              @ddpmntcpbr
            </Box>
            <Box mx={1} fontSize="0.8rem">
              /
            </Box>
            <Box
              className={classes.footerLink}
              onClick={() => dispatch(push("/agreement"))}
            >
              利用規約
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopPage;
