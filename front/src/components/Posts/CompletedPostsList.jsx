import { Box, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { SmallBookCard } from 'components/UIkit'
import { push } from 'connected-react-router'
import { formatDateString } from 'helpers'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchCompletedPostsListPaginationIndexAction } from 'reducks/postListPage/actions'
import { getCompletedPostsListPaginationIndex } from 'reducks/postListPage/selectors'
import { getCompletedPosts } from 'reducks/posts/selectors'

const CompletedPostsList = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const posts = getCompletedPosts(selector)
  const paginationIndex = getCompletedPostsListPaginationIndex(selector)

  const handlePaginationIndexChange = (event, index) => {
    dispatch(switchCompletedPostsListPaginationIndexAction(index))
  }

  return (
    <Box>
      {posts.length > 0 && (
        <Box mb={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(posts.length / 5)}
            page={paginationIndex}
            onChange={handlePaginationIndexChange}
            color="standard"
          />
        </Box>
      )}

      {posts.length > 0 ? (
        posts.map(
          (post, i) =>
            Math.floor(i / 5 + 1) === paginationIndex && (
              <Box key={post.id} onClick={() => dispatch(push('/completed/posts/' + String(post.id)))}>
                <SmallBookCard title={post.title} image={post.image} created_at={formatDateString(post.created_at)} />
              </Box>
            )
        )
      ) : (
        <Box textAlign="center">
          <Typography>完読した書籍はありません</Typography>
        </Box>
      )}
    </Box>
  )
}

export default CompletedPostsList
