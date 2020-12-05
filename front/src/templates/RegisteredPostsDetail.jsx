import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
import { fetchRegisteredPostsDetail } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const RegisteredPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getPosts(selector);
  const path = selector.router.location.pathname;
  // console.log("path",path)
  const id = path.split("/registered/posts/")[1];
  // console.log("id",id)

  useEffect(()=>{
    // console.log(id)
    dispatch(fetchRegisteredPostsDetail(id))
  },[dispatch,id])

  console.log("Render RegisteredPostsDetail")
  console.log("posts",posts)
  return (
    <Container maxWidth="sm" >
      <div>RegisteredPostDetail</div>
      {posts.length > 0 ? (
        <Typography>{posts[0].title}</Typography>
      ) : (
        <Typography>読書中アイテムなし</Typography>
      )}
    </Container>
  )
}

export default RegisteredPostsDetail