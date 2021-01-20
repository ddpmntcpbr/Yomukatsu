import React, { useState,useCallback,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Paper,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { deletePost,updateStatusToCompleted,updatePostItems } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getReadingPosts } from "../reducks/posts/selectors"
import { CreatedMapItemsList } from "../components/Posts"
import { formatDateString } from "../helpers"
import { push } from "connected-react-router"

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: theme.palette.grey[200]
  }
}))

const ReadingPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getReadingPosts(selector);
  const post = posts[0]
  const [updatePostStatusOpen, setUpdatePostStatusOpen] = useState(false);
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [initialPostItems, setinitialPostItems] = useState([]);
  const [postItems, setPostItems] = useState([]);

  useEffect(()=>{
    if(isNonEmptyArray(post)){
      setinitialPostItems(post.post_items)
      setPostItems(post.post_items);
    }
  },[setinitialPostItems,setPostItems,post])

  const handleUpdatePostStatusDialogOpen = useCallback(() => {
    setUpdatePostStatusOpen(true);
  }, [setUpdatePostStatusOpen])

  const handleUpdatePostStatusDialogClose = useCallback(() => {
    setUpdatePostStatusOpen(false)
  }, [setUpdatePostStatusOpen]);

  const handleUpdatePostStatus = useCallback(()=>{
    dispatch(updateStatusToCompleted(post))
    handleUpdatePostStatusDialogClose()
  },[dispatch,handleUpdatePostStatusDialogClose,post])

  const handleDeletePostClickOpen = useCallback(() => {
    setDeletePostDialogOpen(true);
  }, [setDeletePostDialogOpen])

  const handleDeletePostDialogClose = useCallback(() => {
    setDeletePostDialogOpen(false)
  }, [setDeletePostDialogOpen]);

  const handleDeletePost = useCallback(()=>{
    dispatch(deletePost(post.id))
    handleDeletePostDialogClose()
  },[dispatch,handleDeletePostDialogClose,post])


  return (
    <Box>
      {isNonEmptyArray(post) ?
        <Box component={Paper} className={classes.root}>
          <Box p={1}>
            <Typography component="h1">
                現在読書中の書籍
            </Typography>
            <Box mb={4}>
              <BookCard
                title={post.title}
                author={post.author}
                image={post.image}
                created_at={formatDateString(post.created_at)}
              />
            </Box>

            <Box mb={1}>
              <Typography component="h2">
                  メンタルマップ
              </Typography>
            </Box>

            <CreatedMapItemsList postId={post.id} postItems={postItems} setPostItems={setPostItems} />

            <Box>
              <Box display="flex" justifyContent="center" my={4}>
                <SecondaryButton
                  label="完読した!"
                  onClick={handleUpdatePostStatusDialogOpen}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <Box my={1}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<EditIcon />}
                    onClick={()=>dispatch(updatePostItems(post.id,[...initialPostItems],[...postItems]))}
                  >
                    変更を保存
                  </Button>
                </Box>
                <Box m={1}>
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeletePostClickOpen}
                  >
                    削除
                  </Button>
                </Box>
              </Box>

              <QuestionDialog
                open={updatePostStatusOpen}
                handleClose={handleUpdatePostStatusDialogClose}
                handleEvent={handleUpdatePostStatus}
                title="完読にしてよろしいですか？"
                contentText="一度完読にしたアイテムは、元には戻せません"
              />

              <QuestionDialog
                open={deletePostDialogOpen}
                handleClose={handleDeletePostDialogClose}
                handleEvent={handleDeletePost}
                title="本当に削除よろしいですか？"
                contentText="一度削除したアイテムは、元には戻せません"
              />
            </Box>
            <TwitterShareButton url={process.env.REACT_APP_BASE_URL + "/share/posts/" + post.id + "?" + getDateString()} title={"今から『"+ post.title +"』を読みます！\n\n#yomukatsu\n\n"}>
              <TwitterIcon size={64} round />
            </TwitterShareButton>
          </Box>
        </Box>
      :
      <Box textAlign="center">
        <Box p={2}>
          <Typography>現在読書中の書籍はありません</Typography>
        </Box>
        <SecondaryButton
          label="新規登録する"
          onClick={()=>dispatch(push("/posts/edit"))}
        />
      </Box>
      }
    </Box>
  )
}

export default ReadingPostsDetail