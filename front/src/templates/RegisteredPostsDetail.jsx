import React, { useEffect,useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
// import { fetchRegisteredPostsDetail } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
// import { getPosts } from "../reducks/posts/selectors"
import axios from "axios"
import { BookCard,SecondaryButton,QuestionDialog } from "../components/UIkit"
import { updateStatusToCompleted } from "../reducks/posts/operations"
import {TwitterShareButton,TwitterIcon} from "react-share";
import { push } from "connected-react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Helmet } from "react-helmet";

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
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];
  const [post,setPost] = useState({});
  const [open, setOpen] = useState(false);
  // const [siteUrl, setSiteUrl] = useState("");
  const title = `この本を読みます！\n#yomukatsu`;
  const [tweetMessage,setTweetMessage] = useState("")

  useEffect(()=>{
    const fetchPostsDetail = async () => {
      const response = await axios.get((process.env.REACT_APP_API_V1_URL + '/registered/posts/' +  String(id)), {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      setPost(response.data)
      setTweetMessage(`今から『`+ response.data.title +`』を読み切ります！\n#yomukatsu`)
    };
    fetchPostsDetail()
  },[dispatch,id])

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

  console.log(post)
  return (
    <Container maxWidth="md" >
      <Helmet
        meta={[
          {"property": "og:image", "content": post.image},
          {"property": "og:url", "content": process.env.REACT_APP_BASE_URL}
        ]}
      />
      {post && (
        <Paper>
          <Box p={1} >
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
            <TwitterShareButton url={process.env.REACT_APP_BASE_URL} title={tweetMessage}>
              <TwitterIcon size={64} round />
            </TwitterShareButton>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default RegisteredPostsDetail