import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box,Container,Paper,Typography,Divider } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton } from "../components/UIkit"
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getSharePosts } from "../reducks/sharePosts/selectors"
import { fetchSharePost } from "../reducks/sharePosts/operations";
import { push } from "connected-react-router";
import {TwitterShareButton,TwitterIcon} from "react-share";


// const useStyles = makeStyles((theme)=>({
//   root: {
//   },
//   mapItem: {
//   }
// }))

const SharePostsPage = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const post = getSharePosts(selector);
  const path = selector.router.location.pathname;
  const id = Number(path.split("/share/posts/")[1]);

  useEffect(()=>{
    dispatch(fetchSharePost(id))
  },[dispatch,id])

  return (
    <Container maxWidth="md" >
      {isNonEmptyArray(post) ?
      <Box>
        <Helmet
          meta={[
            {name: "twitter:card", content: "summary"},
            {name: "twitter:image", content: "https://books.google.co.jp/books/content?id=Nvx1oAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70x35e1u48P-V3zabEXQ7i3yR4S02MmVbWqH2o8E7qFuNcjtCRbnkalwDqefJvlz7aOYGVwbEYx8MRm7L1M-hj3BCIwhC0YtpApWBe_3zMM-svMuLmtN8gCzSI_TKfO1sIFmpMM"},
            {name: "twitter:title", content: "シェアページ twitter:title"},
            {name: "twitter:description", content: "シェア用ページ"},
          ]}
        />
        <Paper>
          <Box p={1} >
            <Typography component="h3">
              <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                書籍情報
              </Box>
            </Typography>
            <Divider />
            <Box my={3}>
              <BookCard title={post.title} author={post.author} image={post.image} />
            </Box>
          </Box>
          <Box>
            <Box>
              <SecondaryButton label="Google Books を開く" onClick={() => window.open(post.url)}/>
            </Box>
            <Box>
              <SecondaryButton label="このアプリは?" onClick={() => dispatch(push("/"))}/>
            </Box>
          </Box>
          <TwitterShareButton url={process.env.REACT_APP_BASE_URL + path} title={"今から『"+ post.title +"』を読みます！\n#yomukatsu"}>
                <TwitterIcon size={64} round />
              </TwitterShareButton>
        </Paper>
      </Box>
    :
      <></>
    }
    </Container>
  )
}

export default SharePostsPage