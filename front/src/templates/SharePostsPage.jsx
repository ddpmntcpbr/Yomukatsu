import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button,Box,Paper,Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BookCard } from "../components/UIkit"
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getSharePosts } from "../reducks/sharePosts/selectors"
import { fetchSharePost } from "../reducks/sharePosts/operations";
import { push } from "connected-react-router";
import { listenAuthState } from "../reducks/users/operations";
import { getSignedIn } from "../reducks/users/selectors";

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100]
  },
  googleBooksButton:{
    fontWeight: "bold",
    color:"white",
    backgroundColor:"#4285F4"
  },
  amazonButton:{
    fontWeight: "bold",
    color:"white",
    backgroundColor:"#FA9900"
  },
  rakutenButton:{
    fontWeight: "bold",
    color:"white",
    backgroundColor: "#BF1A00"
  },
  appButton:{
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light
  }
}))

const SharePostsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const isSignedIn = getSignedIn(selector);
  const post = getSharePosts(selector);
  const path = selector.router.location.pathname;
  const id = Number(path.split("/share/posts/")[1]);

  useEffect(()=>{
    dispatch(fetchSharePost(id))
    if (!isSignedIn && localStorage.getItem('auth_token')) {
      dispatch(listenAuthState())
    }
  },[isSignedIn,dispatch,id])

  return (
    <Box>
      {isNonEmptyArray(post) ?
      <Box>
        <Helmet
          meta={[
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:image", content: post.twitter_card_image.url},
            {name: "twitter:title", content: "積読解消アプリ Yomukatsu!"},
            {name: "twitter:description", content: post.title},
          ]}
        />
        <Box component={Paper} p={2} className={classes.paper}>
          <Box>
            <Box fontSize="1rem">
              書籍情報
            </Box>
            <Divider />
            <Box my={2}>
              <BookCard title={post.title} author={post.author} image={post.image} />
            </Box>
          </Box>

          <Box px={4} mt={4}>
            <Box my={2}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => window.open(post.url)}
                className={classes.googleBooksButton}
              >
                Google Books で開く
              </Button>
            </Box>

            <Box my={2}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => window.open("https://www.amazon.co.jp/s?k="+ post.title +"&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss")}
                className={classes.amazonButton}
              >
                Amazon で開く
              </Button>
            </Box>

            <Box my={2}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => window.open("https://books.rakuten.co.jp/search?sitem=" + post.title + "&l-id=pc-search-box&x=29&y=15")}
                className={classes.rakutenButton}
              >
                楽天ブックス で開く
              </Button>
            </Box>
          </Box>

          <Box mt={6}>
              <Button
                fullWidth={true}
                className={classes.appButton}
                onClick={() => dispatch(push("/"))}
              >
                積読解消アプリ<br/>
                Yomukatsu のご利用はコチラ!
              </Button>
            </Box>


        </Box>
      </Box>
    :
      <></>
    }
    </Box>
  )
}

export default SharePostsPage