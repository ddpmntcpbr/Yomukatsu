import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { getRegisteredPosts } from "../reducks/posts/selectors"
import { SmallBookCard } from "../components/UIkit"
import { push } from "connected-react-router";
import { formatDateString } from "../helpers"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const RegisteredPostsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getRegisteredPosts(selector);

  return (
    <Box className={classes.root}>
      {posts.length > 0 ? (
        posts.map(post => (
          <Box
            key={post.id}
            onClick={()=>dispatch(push("/registered/posts/" + String(post.id)))}
          >
            <SmallBookCard
              title={post.title}
              image={post.image}
              created_at={formatDateString(post.created_at)}
            />
          </Box>
        ))
      ) : (
        <Typography>読書中アイテムなし</Typography>
      )}
    </Box>
  )
}

export default RegisteredPostsList