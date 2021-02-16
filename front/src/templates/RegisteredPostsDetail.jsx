import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Paper,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { deletePost, exchangeRegisteredAndReadingPost,updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getRegisteredPosts } from "../reducks/posts/selectors"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { formatDateString } from "../helpers"
import { CreatedPostItemsList,ECSiteLinkButtonList } from "../components/Posts"

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: theme.palette.grey[100]
  },
  goBack: {
    cursor: "pointer",
    transition: "0.2s",
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    }
  }
}))

const RegisteredPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getRegisteredPosts(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];
  const post = posts.find((v) => v.id===Number(id))
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
      // dispatch(fetchSharePost(id))
      setinitialPostItems(post.post_items)
      setPostItems(post.post_items);
    }
  },[dispatch,setinitialPostItems,setPostItems,post,id])

  return (
    <Box mb={2}>
      {isNonEmptyArray(post) ?
        <Box component={Paper} className={classes.root}>
            <Box p={1} >
              <Box my={1} display="flex">
                <Box
                  p={1} display="flex" className={classes.goBack}
                  onClick={()=>dispatch(push("/posts/list"))}
                >
                  <ArrowBackIosIcon/>
                  <Typography>登録リストに戻る</Typography>
                </Box>
                <Box/>
              </Box>
              <Typography component="h2">
              <Box fontSize="1rem">
                書籍情報
              </Box>
            </Typography>
              <Box mb={1}>
                <BookCard
                  title={post.title}
                  author={post.author}
                  image={post.image}
                  created_at={formatDateString(post.created_at)}
                />
              </Box>

              <Box mb={6}>
                <ECSiteLinkButtonList title={post.title} url={post.url} />
              </Box>

              <Typography component="h2">
              <Box fontSize="1rem">
                メンタルマップ
              </Box>
            </Typography>

            <CreatedPostItemsList
              postId={post.id}
              initialPostItems={initialPostItems}
              postItems={postItems}
              setPostItems={setPostItems}
            />

            <Box>
              <Box display="flex" justifyContent="space-between" my={4}>
                <Box>
                  <SecondaryButton
                    label="読書中にセット"
                    onClick={() => dispatch(exchangeRegisteredAndReadingPost(id))}
                    width={256}
                  />
                </Box>
                <Box>
                  <SecondaryButton
                    label="完読した!"
                    onClick={handleUpdatePostStatusDialogOpen}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
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
        <></>
      }
    </Box>
  )
}

export default RegisteredPostsDetail