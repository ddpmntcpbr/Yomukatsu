import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { exchangeRegisteredAndReadingPost,fetchRegisteredPosts,updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const RegisteredPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const posts = getPosts(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];
  const [open, setOpen] = useState(false);

  useEffect(()=> {
    dispatch(fetchRegisteredPosts(id))
  },[dispatch,id])

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  const handleUpdateStatus = useCallback(()=>{
    dispatch(updateStatusToCompleted(posts[0]))
    handleClose()
    dispatch(push("/completed/posts"))
  },[dispatch,handleClose,posts])

  return (
    <Container maxWidth="md" >
      {isNonEmptyArray(posts[0]) ?
        <Box>
          <Helmet
            meta={[
              {"property": "og:title", "content": posts[0].title},
              {"property": "og:description", "content": "Yomukatsu!!"},
              {"property": "og:image", "content": posts[0].image}
            ]}
          />
          <Paper>
            <Box p={1} >
              <Typography component="h3">
                <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                  書籍情報
                </Box>
              </Typography>
              <Divider />
              <Box my={3}>
                <BookCard title={posts[0].title} author={posts[0].author} image={posts[0].image} />
              </Box>

              <Typography component="h3">
                <Box fontSize="1.5rem" fontWeight="fontWeightBold">
                  メンタルマップ
                </Box>
              </Typography>
              <Divider />

              <Box>
                {isNonEmptyArray(posts[0].post_items) ? posts[0].post_items.map(mapItem => (
                  <Box key={mapItem.id} my={2} >
                    <Typography>マップアイテムがありません</Typography>
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
                <Box display="flex" justifyContent="center" my={4}>
                  <Box>
                    <SecondaryButton label="カレントブックに登録" onClick={() => dispatch(exchangeRegisteredAndReadingPost(id))}/>
                  </Box>
                  <Box>
                    <SecondaryButton label="完読した!" onClick={handleClickOpen}/>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box my={1}>
                    <Button variant="contained" color="default" startIcon={<EditIcon />}>
                      編集
                    </Button>
                  </Box>
                  <Box m={1}>
                    <Button variant="outlined" color="default" startIcon={<DeleteIcon />}>
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
              </Box>
              <TwitterShareButton url={process.env.REACT_APP_BASE_URL + path} title={"今から『"+ posts[0].title +"』を読みます！\n#yomukatsu"}>
                <TwitterIcon size={64} round />
              </TwitterShareButton>
            </Box>
          </Paper>
        </Box>
      :
        <></>
      }
    </Container>
  )
}

export default RegisteredPostsDetail