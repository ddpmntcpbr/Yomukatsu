import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box,Paper,Typography,Divider } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton } from "../components/UIkit"
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getSharePosts } from "../reducks/sharePosts/selectors"
import { fetchSharePost } from "../reducks/sharePosts/operations";
import { push } from "connected-react-router";


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
        </Paper>
      </Box>
    :
      <></>
    }
    </Box>
  )
}

export default SharePostsPage