import { Box, Container, Divider, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import intro1 from 'assets/img/src/intro1.png'
import intro10 from 'assets/img/src/intro10.png'
import intro11 from 'assets/img/src/intro11.png'
import intro12 from 'assets/img/src/intro12.png'
import intro2 from 'assets/img/src/intro2.png'
import intro3 from 'assets/img/src/intro3.png'
import intro4 from 'assets/img/src/intro4.png'
import intro5 from 'assets/img/src/intro5.png'
import intro6 from 'assets/img/src/intro6.png'
import intro7 from 'assets/img/src/intro7.png'
import intro8 from 'assets/img/src/intro8.png'
import intro9 from 'assets/img/src/intro9.png'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listenAuthState } from 'reducks/users/operations'
import { getSignedIn } from 'reducks/users/selectors'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[100],
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: theme.palette.grey[900],
    marginTop: theme.spacing(2),
  },
  content: {
    fontSize: '1rem',
    color: theme.palette.grey[800],
  },
  image: {
    margin: '0 auto',
    textAlign: 'center',
  },
}))

const IntroductionPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn && localStorage.getItem('auth_token')) {
      dispatch(listenAuthState())
    }
  }, [isSignedIn, dispatch])

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
          <Box className={classes.content} component="h6" pt={2} pb={4}>
            キーワード検索から書籍を選び、ヒントを参考にしながら"読書メンタルマップ"を作成しましょう
            <br />
            <br />
            "読書メンタルマップ"は、書籍登録後からでもいつでも更新できますので、最初はあまり深く考えなくてOKです
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className={classes.image}>
              <img src={intro1} alt="intro1" width="80%" />
              <Box fontSize="0.8rem" py={1}>
                書籍をセットして、
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.image}>
              <img src={intro2} alt="intro2" width="80%" />
              <Box fontSize="0.8rem" py={1}>
                メンタルマップを作成!
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            2. 「読書中」にセットしよう！
          </Box>
          <Divider />
          <Box className={classes.content} component="h6">
            <Box pt={2} pb={4}>
              新規作成を押すと、「読書中にセット」「登録のみ」の２つを選ぶことができます。
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro3} alt="intro3" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  すぐに読み始める場合は「読書中にセット」を選び、後々で読む予定ならば「登録のみ」を 選んでください
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro4} alt="intro4" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  メンタルマップを作成!
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box py={4}>Yomukatsuでは、書籍情報は3つの登録状態を持ちます</Box>
          <Box fontWeight="bold" my={2}>
            1. 「読書中」: 現在読書中の書籍。全体でひとつだけ設定できる
            <br />
            <br />
            2. 「登録中」: 登録はしているが、まだ読み終わってはいない状態の書籍。いくつも登録できる
            <br />
            <br />
            3. 「完読済」: 読み終わった状態の書籍
            <br />
            <br />
          </Box>
          <Box className={classes.content} component="h6" py={2}>
            「読書中」アイテムと「登録中」アイテムの入れ替えは、登録リストからいつでもできます
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className={classes.image}>
              <img src={intro5} alt="intro5" width="80%" />
              <Box fontSize="0.8rem" py={1}>
                ページ下部の「登録リスト」から、書籍を選択
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.image}>
              <img src={intro6} alt="intro6" width="80%" />
              <Box fontSize="0.8rem" py={1}>
                「読書開始書籍にセット」を押すことで、この書籍を「読書中」と入れ替えられる
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            3. 読書中にセットした書籍を読もう！
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            <Box pt={2} pb={4}>
              読書中にセットした本を読んでいきましょう。
              <br />
              <br />
              「ちょっと飽きてきちゃったなー」というときこそ、読書メンタルマップの出番！自作したマップを読み返してモチベーションを高めましょう
              <br />
              <br />
              また、一度中断した書籍を再び読み始めるときのモチベーションフックとしても活用できます！
            </Box>
            <Container maxWidth="xs">
              <Box className={classes.image}>
                <img src={intro7} alt="intro7" />
                <Box fontSize="0.8rem" py={1}>
                  本を読みながら新しいマップ項目が思いついたら、どんどん追加していこう！
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            4. 読み終わったら「完読した！」ボタンをクリック！Twitterでシェアしよう
          </Box>
          <Divider />
          <Box className={classes.content} component="h6">
            <Box pt={2} pb={4}>
              完読ボタンを押すことで、書籍を「完読済み」にすることができます。
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro8} alt="intro8" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  OKをクリックすると
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro9} alt="intro9" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  書籍が「完読済み」リストへ移動!
                </Box>
              </Grid>
            </Grid>
            <Box my={4}>Twitterボタンで完読をシェアし、読書仲間からのいいねをもらいましょう！</Box>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro10} alt="intro10" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  ツイート内容はデフォルトから変更することも可能
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.image}>
                <img src={intro11} alt="intro11" width="80%" />
                <Box fontSize="0.8rem" py={1}>
                  タイムライン表示イメージ
                </Box>
                <Box fontSize="0.8rem" style={{ color: 'red' }}>
                  ※Twitterシェアされるのは書籍そのものの情報だけであり、メンタルマップの中身が他人に公開されることはありません
                </Box>
              </Grid>
            </Grid>

            <Container maxWidth="xs">
              <Box className={classes.image}>
                <img src={intro12} alt="intro12" />
                <Box fontSize="0.8rem" py={1}>
                  実際にシェアされるページ。メンタルマップの中身は公開されませんので、気軽につぶやこう！
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default IntroductionPage
