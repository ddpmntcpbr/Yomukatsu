import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Paper,Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,QuestionDialog } from "../components/UIkit"
import { deletePost } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getCompletedPosts } from "../reducks/posts/selectors"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { formatDateString } from "../helpers"
import { CreatedPostItemsList } from "../components/Posts"

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

const CompletedPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getCompletedPosts(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/completed/posts/")[1];
  const post = posts.find((v) => v.id===Number(id))
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [initialPostItems, setinitialPostItems] = useState([]);
  const [postItems, setPostItems] = useState([]);

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
              <Box mb={4}>
                <BookCard
                  title={post.title}
                  author={post.author}
                  image={post.image}
                  created_at={formatDateString(post.created_at)}
                />
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
                open={deletePostDialogOpen}
                handleClose={handleDeletePostDialogClose}
                handleEvent={handleDeletePost}
                title="本当に削除よろしいですか？"
                contentText="一度削除したアイテムは、元には戻せません"
              />
            </Box>

            <TwitterShareButton url={process.env.REACT_APP_BASE_URL + "/share/posts/" + post.id + "?" + getDateString()} title={"『"+ post.title +"』を完読しました！\n\n#yomukatsu\n\n"}>
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

export default CompletedPostsDetail