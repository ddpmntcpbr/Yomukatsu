import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container,Typography } from "@material-ui/core"
import { fetchRegisteredPosts } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const RegisteredBookPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getPosts(selector);

  useEffect(()=>{
    dispatch(fetchRegisteredPosts())
  },[dispatch])

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

export default RegisteredBookPage