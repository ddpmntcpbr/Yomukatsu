import React, { useState,useCallback } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,QuestionDialog } from "../components/UIkit"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import { getDateString,isNonEmptyArray } from "../helpers"
import { getCompletedPosts } from "../reducks/posts/selectors"
import { deletePost } from "../reducks/posts/operations"
import { push } from "connected-react-router";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const CompletedPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getCompletedPosts(selector);
  const path = selector.router.location.pathname;
  const id = Number(path.split("/completed/posts/")[1]);
  const post = posts.find((v) => v.id===id)
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);

  const handleDeletePostClickOpen = useCallback(() => {
    setDeletePostDialogOpen(true);
  }, [setDeletePostDialogOpen])

  const handleDeletePostDialogClose = useCallback(() => {
    setDeletePostDialogOpen(false)
  }, [setDeletePostDialogOpen]);

  const handleDeletePost = useCallback(()=>{
    dispatch(deletePost(post.id))
    handleDeletePostDialogClose()
    dispatch(push("/completed/posts"))
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
                state: { selectedTab: 1}
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
            <TwitterShareButton url={process.env.REACT_APP_BASE_URL + "/share/posts/" + post.id + "?" + getDateString()} title={`『`+ post.title +`』を完読しました！\n\n#yomukatsu\n\n`}>
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

export default CompletedPostsDetail