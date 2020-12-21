import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box,Container,Paper,Typography,Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton } from "../components/UIkit"
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getSharePosts } from "../reducks/sharePosts/selectors"
import { fetchSharePost } from "../reducks/sharePosts/operations";
import { push } from "connected-react-router";
import {TwitterShareButton,TwitterIcon} from "react-share";


const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const SharePostsPage = () => {
  const classes = useStyles();
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
          title={'Yomukatsu!'}
          meta={[
            {name: "twitter:card", content: "summary_large_image"},
            {property: "og:image", content: post.image},
            {property: "og:title", content: "SharePostsPageのog:titleを入れます"},
            {property: "og:description", content: "Yomukatsu!!"},
            {property: "og:url", content: process.env.REACT_APP_BASE_URL + path }
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