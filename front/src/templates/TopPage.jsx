import { Box, Container, Divider, Grid, Paper } from '@material-ui/core'
import CopyrightIcon from '@material-ui/icons/Copyright'
import { makeStyles } from '@material-ui/styles'
import administratorIcon from 'assets/img/src/administratorIcon.png'
import favoImage from 'assets/img/src/favo.png'
import ideaImage from 'assets/img/src/idea.png'
import postEditScreenShotImage from 'assets/img/src/postEditScreenShot.png'
import researchImage from 'assets/img/src/research.png'
import terminalImage from 'assets/img/src/terminal.png'
import topPageImage from 'assets/img/src/top.png'
import womanImage from 'assets/img/src/woman.png'
import { TwitterLoginButton } from 'components/UIkit'
import { PrimaryButton } from 'components/UIkit'
import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Image from 'react-image-resizer'
import { useSelector, useDispatch } from 'react-redux'
import { listenAuthState, signIn, signInGuestUser } from 'reducks/users/operations'
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
  subTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.palette.grey[800],
    height: '54px',
  },
  content: {
    fontSize: '1rem',
    color: theme.palette.grey[800],
    marginTop: theme.spacing(4),
  },
  subContent: {
    fontSize: '0.8rem',
    color: theme.palette.grey[800],
  },
  youtube: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    '& iframe': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
    },
  },
  administratorIcon: {
    '& img': {
      borderRadius: '50%',
    },
  },
  footerLink: {
    fontSize: '0.8rem',
    color: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
      borderBottom: '1px solid',
    },
  },
}))

const TopPage = () => {
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
      <Helmet
        meta={[
          { name: 'twitter:card', content: 'summary' },
          {
            name: 'twitter:image',
            content: 'https://www.book.yomukatsu.com/static/media/logo.e89c3802.png',
          },
          { name: 'twitter:title', content: 'Yomukatsu' },
          { name: 'twitter:description', content: '積読解消サポート!' },
        ]}
      />
      <img src={topPageImage} alt="topPageImage" />
      <Box component={Paper} p={2} className={classes.paper}>
        <Grid container className={classes.content} component="h6" spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <TwitterLoginButton label={'Twitter ログイン / 新規登録'} onClick={() => dispatch(signIn())} />
              <Box py={1} fontSize="0.8rem">
                勝手にツイートすることはありません
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <PrimaryButton label="ユーザー登録無しで利用" onClick={() => dispatch(signInGuestUser())} />
              <Box py={1} fontSize="0.8rem">
                ゲストユーザーとしてログインします
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            【3分動画】Yomukatsu使い方 字幕解説
          </Box>
          <Divider />
          <Box className={classes.youtube} textAlign="center" mt={2}>
            rial"
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/XGzbGH1NvLk"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            Yomukatsuとは？
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            PCやスマホで簡単に「読書メンタルマップ術」を実践することで、ユーザーの積読解消をサポートするアプリです。
            <Image src={womanImage} width={200} height={200} style={{ margin: 'auto' }} />
            「読書メンタルマップ術」とは、ハーバード大学ショーンエーカー氏が提唱している積読解消術です。
            <br />
            <br />
            読破したい対象の書籍に対して、
            <br />
            <Box fontWeight="bold" my={4}>
              1. その本について興味があること、それを知って得られるメリットを文章に書き出す
              <br />
              <br />
              2. 読んでいる途中で飽きてきたら、それを読み返す
              <br />
            </Box>
            を繰り返すことで完読までモチベーションを維持する、という読書法です。
            <Box mt={4}>
              <Container maxWidth="xs">
                <img src={postEditScreenShotImage} alt="postEditScreenShotImage" width="100%" />
                <Box fontSize="0.8rem" textAlign="center">
                  読書メンタルマップ作成イメージ
                </Box>
              </Container>
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            Yomukatsuでできること
          </Box>
          <Divider />
          <Box my={4}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Box className={classes.subTitle} component="h3">
                    PCやスマホから、ペーパーレスでお手軽利用！
                  </Box>
                  <Image src={terminalImage} width={200} height={200} style={{ margin: 'auto' }} />
                  <Box className={classes.subContent} component="h6" mt={2}>
                    通勤中など、紙やペンが手元にない状態であっても、読書メンタルマップの作成・管理ができます
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Box className={classes.subTitle} component="h3">
                    マップ作成をサポートするヒント機能！
                  </Box>
                  <Image src={ideaImage} width={200} height={200} style={{ margin: 'auto' }} />
                  <Box className={classes.subContent} component="h6" mt={2}>
                    「どうやってマップを作ったらいいか分からない・・・」という方向けの充実したヒント機能！
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  読書遍歴をログとして記録！
                </Box>
                <Image src={researchImage} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  読破してきた書籍がログとして貯まることで、達成感が味わえます
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  登録した書籍をTwitterでシェア！
                </Box>
                <Image src={favoImage} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  読書仲間で「いいね」を送り合って、モチベを高めよう！
                  <Box style={{ fontSize: '0.8rem', color: 'red' }}>
                    (※ メンタルマップの中身が公開されることはありません)
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box component="h6" textAlign="center" py={4} mb={2}>
            <Box className={classes.subTitle}>まずはワンタップで無料登録♪</Box>
            <Grid container component="h6" spacing={1}>
              <Grid item xs={12} sm={6}>
                <Box textAlign="center">
                  <TwitterLoginButton label={'Twitter ログイン / 新規登録'} onClick={() => dispatch(signIn())} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box textAlign="center">
                  <PrimaryButton label="ユーザー登録無しで利用" onClick={() => dispatch(signInGuestUser())} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <Box>
              <CopyrightIcon style={{ fontSize: '0.8rem', verticalAlign: -1 }} />
            </Box>
            <Box fontSize="0.8rem" ml={1}>
              2021 辻野翔陽
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box className={classes.administratorIcon}>
              <img src={administratorIcon} alt="administratorIcon" width="30px" height="30px" />
            </Box>
            <Box ml={1} fontSize="0.8rem">
              運営者:
            </Box>
            <Box className={classes.footerLink} onClick={() => window.open('https://twitter.com/ddpmntcpbr')}>
              @ddpmntcpbr
            </Box>
            <Box mx={1} fontSize="0.8rem">
              /
            </Box>
            <Box className={classes.footerLink} onClick={() => dispatch(push('/agreement'))}>
              利用規約
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TopPage
