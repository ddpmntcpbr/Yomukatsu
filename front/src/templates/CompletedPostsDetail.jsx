import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard } from "../components/UIkit"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { fetchCompletedPosts } from "../reducks/posts/operations"
import { getPosts } from "../reducks/posts/selectors"

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
  const posts = getPosts(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];

  useEffect(()=> {
    dispatch(fetchCompletedPosts(id))
  },[dispatch,id])

  return (
    <Container maxWidth="md" >
      {isNonEmptyArray(posts[0]) ?
      <Box>

        <Helmet
          meta={[
            {"property": "og:image", "content": posts[0].image},
            {"property": "og:url", "content": process.env.REACT_APP_BASE_URL}
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
              <Box display="flex" justifyContent="center">
                <Box m={1}>
                  <Button variant="outlined" color="default" startIcon={<DeleteIcon />}>
                    削除
                  </Button>
                </Box>
              </Box>
            </Box>
            <TwitterShareButton url={process.env.REACT_APP_BASE_URL} title={`『`+ posts[0].title +`』を完読しました！\n#yomukatsu`}>
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

export default CompletedPostsDetail