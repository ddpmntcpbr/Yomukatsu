import React from "react";
import { useSelector, useDispatch } from 'react-redux'
// import { makeStyles } from "@material-ui/styles";
import { getRegisteredPosts } from "../../reducks/posts/selectors"
import { SmallBookCard } from "../UIkit"
import { push } from "connected-react-router";
import { formatDateString } from "../../helpers"
import { Box,Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

// const useStyles = makeStyles((theme)=>({
//   root: {
//   }
// }))

const RegisteredPostsList = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getRegisteredPosts(selector);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      {posts.length > 0 && (
         <Box mb={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(posts.length/5)}
            page={page}
            onChange={handleChange}
            color="standard"
          />
        </Box>
      )}

      {posts.length > 0 ? (
        posts.map((post,i) => (
          Math.floor(i/5+1) === page && (
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
          )
        ))

      ) : (
        <Box textAlign="center">
          <Typography>未読の書籍はありません</Typography>
        </Box>
      )}

    </Box>
  )
}

export default RegisteredPostsList