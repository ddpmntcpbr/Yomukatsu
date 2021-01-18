import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { deletePost, exchangeRegisteredAndReadingPost,updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getRegisteredPosts } from "../reducks/posts/selectors"
import { fetchSharePost } from "../reducks/sharePosts/operations"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const RegisteredPostsDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getRegisteredPosts(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];
  const post = posts.find((v) => v.id===Number(id))
  const [updatePostStatusOpen, setUpdatePostStatusOpen] = useState(false);
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);

  useEffect(()=>{
    dispatch(fetchSharePost(id))
  },[dispatch,id])

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
    dispatch(push("/registered/posts"))
  },[dispatch,handleDeletePostDialogClose,post])

  return (
    <Box>
      {isNonEmptyArray(post) ?
        <Box>
          <Paper>
            <Box p={1} >
              <ArrowBackIosIcon
                onClick={()=>dispatch(push({
                  pathname: "/posts/list",
                  state: { selectedTab: 0}
                }))}
              />
              <Typography component="h3">
                <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                  書籍情報
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

              <Box>
                {isNonEmptyArray(post.post_items) ? post.post_items.map(mapItem => (
                  <Box key={mapItem.id} my={2} >
                    <Card className={classes.mapItem} variant="outlined">
                      <CardContent>
                        <Typography component="p">
                          {mapItem.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )) :
                  <Typography>マップアイテムがありません</Typography>
                }
              </Box>

              <Box>
                <Box my={4}>
                  <Box>
                    <SecondaryButton
                      label="カレントブックに登録"
                      onClick={() => dispatch(exchangeRegisteredAndReadingPost(id))}
                    />
                  </Box>
                  <Box>
                    <SecondaryButton
                      label="完読した!"
                      onClick={handleUpdatePostStatusDialogOpen}
                    />
                  </Box>
                  <Box>
                    <SecondaryButton
                      label="Share"
                      onClick={()=>dispatch(push("/share/posts/" + id))}
                    />
                  </Box>
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
          </Paper>
        </Box>
      :
        <></>
      }
    </Box>
  )
}

export default RegisteredPostsDetail