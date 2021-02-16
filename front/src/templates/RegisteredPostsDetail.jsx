import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Divider,Paper,Typography } from "@material-ui/core"
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
import DoneIcon from '@material-ui/icons/Done';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

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
  },
  completedButton:{
    fontWeight: "bold"
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
      setinitialPostItems(post.post_items)
      setPostItems(post.post_items);
    }
  },[dispatch,setinitialPostItems,setPostItems,post,id])

  return (
    <Box mb={2}>
      {isNonEmptyArray(post) ?
        <Box component={Paper} className={classes.root}>
            <Box p={1} >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" justifyContent="flex-start" onClick={()=>dispatch(push("/posts/list"))}>
                  <Box>
                    <ArrowBackIosIcon fontSize="small"/>
                  </Box>
                  <Box component="h2" fontSize="1rem">
                    登録リストに戻る
                  </Box>
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

            <Box display="flex" justifyContent="center" mb={2}>
              <Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<BookmarksIcon/>}
                  onClick={() => dispatch(exchangeRegisteredAndReadingPost(id))}
                >
                  読書開始書籍にセット
                </Button>
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" mb={4}>
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
        </Box>
      :
        <></>
      }
    </Box>
  )
}

export default RegisteredPostsDetail