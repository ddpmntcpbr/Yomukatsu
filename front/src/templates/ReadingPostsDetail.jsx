import React, { useState,useCallback,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Divider,Paper,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { deletePost,updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getReadingPosts } from "../reducks/posts/selectors"
import { CreatedPostItemsList,ECSiteLinkButtonList } from "../components/Posts"
import { formatDateString } from "../helpers"
import { push } from "connected-react-router"
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: theme.palette.grey[100]
  },
  completedButton:{
    fontWeight: "bold"
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

  useEffect(()=>{
    if(isNonEmptyArray(post)){
      setinitialPostItems(post.post_items)
      setPostItems(post.post_items);
    }
  },[setinitialPostItems,setPostItems,post])

  return (
    <Box mb={2}>
      {isNonEmptyArray(post) ?
        <Box component={Paper} className={classes.root}>
          <Box p={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box component="h2" fontWeight="fontWeightBold" fontSize="1.2rem">
                現在読書中の書籍
              </Box>
              <Box mr={2}>
                <TwitterShareButton url={process.env.REACT_APP_BASE_URL + "/share/posts/" + post.id + "?" + getDateString()} title={"今から『"+ post.title +"』を読みます！\n\n#yomukatsu\n\n"}>
                  <TwitterIcon size={48} round />
                </TwitterShareButton>
              </Box>

            </Box>

            <Box mb={1}>
              <BookCard
                title={post.title}
                author={post.author}
                image={post.image}
                created_at={formatDateString(post.created_at)}
              />
            </Box>

            <ECSiteLinkButtonList title={post.title} url={post.url} />

            <Box my={4}>
              <Divider/>
            </Box>

            <Box component="h2" fontWeight="fontWeightBold" fontSize="1.2rem">
              メンタルマップ
            </Box>
            <CreatedPostItemsList
              postId={post.id}
              initialPostItems={initialPostItems}
              postItems={postItems}
              setPostItems={setPostItems}
            />
            <Box my={4}>
              <Divider/>
            </Box>
            <Box display="flex" justifyContent="center" my={4}>
              <Box mx={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DoneIcon/>}
                  onClick={handleUpdatePostStatusDialogOpen}
                  className={classes.completedButton}
                >
                  完読した!
                </Button>
              </Box>
              <Box mx={1}>
                <Button
                  variant="contained"
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