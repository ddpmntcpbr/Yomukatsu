import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
import { fetchRegisteredPosts } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"
import { BookCard } from "../components/UIkit"
import { push } from "connected-react-router";

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
        posts.map(post => (
          <Box
            key={post.id}
            onClick={()=>dispatch(push("posts/show/" + String(post.id)))}
          >
            <BookCard
              title={post.title}
              author={post.author}
              image={post.image}
            />
          </Box>
        ))
      ) : (
        <Typography>読書中アイテムなし</Typography>
      )}
    </Container>
  )
}

export default RegisteredBookPage