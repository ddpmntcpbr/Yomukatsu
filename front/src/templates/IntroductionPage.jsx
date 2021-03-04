import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider, Paper } from "@material-ui/core";
import { listenAuthState } from "../reducks/users/operations";
import { getSignedIn } from "../reducks/users/selectors";
import intro1 from "../assets/img/src/intro1.png";
import intro2 from "../assets/img/src/intro2.png";
import intro3 from "../assets/img/src/intro3.png";
import intro4 from "../assets/img/src/intro4.png";
import intro5 from "../assets/img/src/intro5.png";
import intro6 from "../assets/img/src/intro6.png";
import intro7 from "../assets/img/src/intro7.png";
import intro8 from "../assets/img/src/intro8.png";
import intro9 from "../assets/img/src/intro9.png";
import intro10 from "../assets/img/src/intro10.png";
import intro11 from "../assets/img/src/intro11.png";
import intro12 from "../assets/img/src/intro12.png";

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
  content: {
    fontSize: "1rem",
    color: theme.palette.grey[800],
  },
  image: {
    width: "80%",
    margin: "0 auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
}));

const IntroductionPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn && localStorage.getItem("auth_token")) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  return (
    <Box>
      <Box component={Paper} p={2} className={classes.paper}>
        <Box textAlign="center" fontSize="2.0rem" fontWeight="bold">
          アプリの使い方
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            1. 書籍を新規登録をしよう！
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            キーワード検索から書籍を選び、ヒントを参考にしながら"読書メンタルマップ"を作成しましょう
            <br />
            <br />
            "読書メンタルマップ"は、書籍登録後からでもいつでも更新できますので、最初はあまり深く考えなくてOKです
            <Box className={classes.image}>
              <img src={intro1} alt="intro1" />
              <Box py={1}>書籍をセットして、</Box>
            </Box>
            <Box className={classes.image}>
              <img src={intro2} alt="intro2" />
              <Box py={1}>メンタルマップを作成!</Box>
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            2. 「読書中」にセットしよう！
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            新規作成を押すと、「読書中にセット」「登録のみ」の２つを選ぶことができます。
            <Box className={classes.image}>
              <img src={intro3} alt="intro3" />
            </Box>
            すぐに読み始める場合は「読書中にセット」を選び、後々で読む予定ならば「登録のみ」を
            選んでください
            <Box className={classes.image}>
              <img src={intro4} alt="intro4" />
              <Box py={1}>書籍を登録!</Box>
            </Box>
          </Box>
          Yomukatsuでは、書籍情報は3つの登録状態を持ちます
          <Box fontWeight="bold" my={4}>
            1. 「読書中」: 現在読書中の書籍。全体でひとつだけ設定できる
            <br />
            <br />
            2. 「登録中」:
            登録はしているが、まだ読み終わってはいない状態の書籍。いくつも登録できる
            <br />
            <br />
            3. 「完読済」: 読み終わった状態の書籍
            <br />
            <br />
          </Box>
          <Box className={classes.content} component="h6" mt={2}>
            「読書中」アイテムと「登録中」アイテムの入れ替えは、登録リストからいつでもできます
          </Box>
          <Box className={classes.image}>
            <img src={intro5} alt="intro5" />
            <Box py={1}>ページ下部の「登録リスト」から、書籍をクリック</Box>
          </Box>
          <Box className={classes.image}>
            <img src={intro6} alt="intro6" />
            <Box py={1}>
              「読書開始書籍にセット」をクリックすることで、この書籍を「読書中」と入れ替えられる
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            3. 読書中にセットした書籍を読もう！
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            読書中にセットした本を読んでいきましょう。
            <br />
            <br />
            「ちょっと飽きてきちゃったなー」というときこそ、読書メンタルマップの出番！自作したマップを読み返してモチベーションを高めましょう
            <br />
            <br />
            また、一度中断した書籍を再び読み始めるときのモチベーションフックとしても活用できます！
            <Box className={classes.image}>
              <img src={intro7} alt="intro7" />
              <Box py={1}>
                本を読みながら新しいマップ項目が思いついたら、どんどん追加していこう
              </Box>
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            4.
            読み終わったら「完読した！」ボタンをクリック！Twitterでシェアしよう
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            完読ボタンを押すことで、書籍を「完読済み」にすることができます。
            <Box className={classes.image}>
              <img src={intro8} alt="intro8" />
              <Box py={1}>OKをクリックすると</Box>
            </Box>
            <Box className={classes.image}>
              <img src={intro9} alt="intro9" />
              <Box py={1}>書籍が「完読済み」リストへ移動!</Box>
            </Box>
            Twitterボタンで完読をシェアし、読書仲間からのいいねをもらいましょう！
            <Box className={classes.image}>
              <img src={intro10} alt="intro10" />
              <Box py={1}>ツイート内容はデフォルトから変更することも可能</Box>
            </Box>
            <Box className={classes.image}>
              <img src={intro11} alt="intro11" />
              <Box py={1}>タイムライン表示イメージ</Box>
            </Box>
            <Box style={{ color: "red" }}>
              ※Twitterシェアされるのは書籍そのものの情報だけであり、メンタルマップの中身が他人に公開されることはありません
            </Box>
            <Box className={classes.image}>
              <img src={intro12} alt="intro12" />
              <Box py={1}>
                実際にシェアされるページ。メンタルマップの中身は公開されませんので、気軽につぶやこう！
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroductionPage;
