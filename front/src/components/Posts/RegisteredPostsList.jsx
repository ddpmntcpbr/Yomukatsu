import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getRegisteredPosts } from "../../reducks/posts/selectors"
import { SmallBookCard } from "../UIkit"
import { push } from "connected-react-router";
import { formatDateString } from "../../helpers"
import { Box,Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { switchRegisteredPostsListPaginationIndexAction } from "../../reducks/postListPage/actions"
import { getRegisteredPostsListPaginationIndex } from "../../reducks/postListPage/selectors"

const RegisteredPostsList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getRegisteredPosts(selector);
  const paginationIndex = getRegisteredPostsListPaginationIndex(selector)

  const handlePaginationIndexChange = (event, index) => {
    dispatch(switchRegisteredPostsListPaginationIndexAction(index))
  };

  return (
    <Box>
      {posts.length > 0 && (
         <Box mb={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(posts.length/5)}
            page={paginationIndex}
            onChange={handlePaginationIndexChange}
            color="standard"
          />
        </Box>
      )}

      {posts.length > 0 ? (
        posts.map((post,i) => (
          Math.floor(i/5+1) === paginationIndex && (
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