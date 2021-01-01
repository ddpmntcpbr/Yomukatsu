import React, { useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { deletePost,updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isNonEmptyArray } from "../helpers"
import { getReadingPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const ReadingPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getReadingPosts(selector);
  const post = posts[0]
  const [open, setOpen] = useState(false);
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  const handleUpdateStatus = useCallback(()=>{
    dispatch(updateStatusToCompleted(post))
    handleClose()
    dispatch(push("/completed/posts"))
  },[dispatch,handleClose,post])

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
    <Container maxWidth="md" >
      {isNonEmptyArray(post) ?
        <Box>
          <Paper>
            <Box p={1} >
              <Typography component="h3">
                <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                  現在読書中の書籍
                </Box>
              </Typography>
              <Divider />
              <Box my={3}>
                <BookCard title={post.title} author={post.author} image={post.image} />
              </Box>

              <Typography component="h3">
                <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                  メンタルマップ
                </Box>
              </Typography>
              <Divider />

              {post.post_items && post.post_items.map(mapItem => (
                <Box key={mapItem.id} my={2} >
                  <Card className={classes.mapItem} variant="outlined">
                    <CardContent>
                      <Typography component="p">
                        {mapItem.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
              <Box>
                <Box display="flex" justifyContent="center" my={4}>
                  <SecondaryButton label="完読した!" onClick={handleClickOpen}/>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box my={1}>
                    <Button variant="contained" color="default" startIcon={<EditIcon />}>
                      編集
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
                  open={open}
                  handleClose={handleClose}
                  handleEvent={handleUpdateStatus}
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
              <TwitterShareButton url={process.env.REACT_APP_BASE_URL + "/share/posts/" + post.id} title={"今から『"+ post.title +"』を読みます！\n#yomukatsu"}>
                <TwitterIcon size={64} round />
              </TwitterShareButton>
            </Box>
          </Paper>
        </Box>
      :
        <Typography>現在読書中の書籍はありません</Typography>
      }
    </Container>
  )
}

export default ReadingPostsDetail