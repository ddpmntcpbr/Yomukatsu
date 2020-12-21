import React from "react";
import { useSelector } from 'react-redux'
import { Box,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard } from "../components/UIkit"
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getSharePosts } from "../reducks/sharePosts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const SharePostsPage = () => {
  const classes = useStyles();
  const selector = useSelector((state)=>state);
  const posts = getSharePosts(selector);
  const path = selector.router.location.pathname;
  const id = Number(path.split("/share/posts/")[1]);
  console.log("id",id)

  const post = posts.find((v) => v.id===id)

  console.log("post",post)
  return (
    <Container maxWidth="md" >
      {isNonEmptyArray(post) ?
      <Box>
        <Helmet
          meta={[
            {"property": "og:title", "content": post.title},
            {"property": "og:description", "content": "Yomukatsu!!"},
            {"property": "og:image", "content": post.image}
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
        </Paper>
      </Box>
    :
      <></>
    }
    </Container>
  )
}

export default SharePostsPage