import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import axios from "axios"
import { BookCard } from "../components/UIkit"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"

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
  const path = selector.router.location.pathname;
  const id = path.split("/completed/posts/")[1];
  const [post,setPost] = useState({});
  const [tweetMessage,setTweetMessage] = useState("")

  useEffect(()=>{
    const fetchPostsDetail = async () => {
      const response = await axios.get((process.env.REACT_APP_API_V1_URL + '/completed/posts/' +  String(id)), {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          'client': localStorage.getItem('client_id'),
          'uid': localStorage.getItem('uid'),
        }
      })
      setPost(response.data)
      setTweetMessage(`『`+ response.data.title +`』を完読しました！\n#yomukatsu`)
    };
    fetchPostsDetail()
  },[dispatch,id])

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
            <Box>
              {isNonEmptyArray(post.post_items) ? post.post_items.map(mapItem => (
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
              <Box display="flex" justifyContent="center">
                <Box m={1}>
                  <Button variant="outlined" color="default" startIcon={<DeleteIcon />}>
                    削除
                  </Button>
                </Box>
              </Box>
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

export default CompletedPostsDetail