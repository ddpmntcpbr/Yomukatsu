import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { getCompletedPosts } from "../reducks/posts/selectors"
import { BookCard } from "../components/UIkit"
import { push } from "connected-react-router";

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const CompletedPostsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getCompletedPosts(selector);

  return (
    <Box maxWidth="md" className={classes.root}>
      {posts.length > 0 ? (
        posts.map(post => (
          <Box
            key={post.id}
            onClick={()=>dispatch(push("/completed/posts/" + String(post.id)))}
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
    </Box>
  )
}

export default CompletedPostsList