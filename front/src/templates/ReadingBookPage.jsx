import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
// import { ReadingBookDetail } from "../components/Posts"
import { fetchReadingPost } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const ReadingBookPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getPosts(selector);

  useEffect(()=>{
    dispatch(fetchReadingPost())
  },[dispatch])

  console.log(posts[0])
  console.log(posts.length)
  return (
    <Container maxWidth="sm" >
      {posts.length > 0 ? (
        <Typography>{posts[0].title}</Typography>
      ) : (
        <Typography>読書中アイテムなし</Typography>
      )}
    </Container>
  )
}

export default ReadingBookPage