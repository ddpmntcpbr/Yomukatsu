import React from "react";
import { useSelector, useDispatch } from 'react-redux'
// import { makeStyles } from "@material-ui/styles";
import { getCompletedPosts } from "../../reducks/posts/selectors"
import { SmallBookCard } from "../UIkit"
import { push } from "connected-react-router";
import { formatDateString } from "../../helpers"
import { Box,Typography} from '@material-ui/core';

// const useStyles = makeStyles((theme)=>({
//   root: {
//   }
// }))

const CompletedPostsList = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getCompletedPosts(selector);

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map(post => (
          <Box
            key={post.id}
            onClick={()=>dispatch(push("/completed/posts/" + String(post.id)))}
          >
            <SmallBookCard
              title={post.title}
              image={post.image}
              created_at={formatDateString(post.created_at)}
            />
          </Box>
        ))
      ) : (
        <Box textAlign="center">
          <Typography>登録書籍はありません</Typography>
        </Box>
      )}
    </Box>
  )
}

export default CompletedPostsList