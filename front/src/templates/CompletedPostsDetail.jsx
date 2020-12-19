import React from "react";
import { useSelector } from 'react-redux'
import { Box,Button,Card,CardContent,Container,Paper,Typography,Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { BookCard } from "../components/UIkit"
import {TwitterShareButton,TwitterIcon} from "react-share";
import DeleteIcon from '@material-ui/icons/Delete';
import { Helmet } from "react-helmet";
import { isNonEmptyArray } from "../helpers"
import { getCompletedPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  },
  mapItem: {
  }
}))

const CompletedPostsDetail = () => {
  const classes = useStyles();
  const selector = useSelector((state)=>state);
  const posts = getCompletedPosts(selector);
  const path = selector.router.location.pathname;
  const id = Number(path.split("/completed/posts/")[1]);
  const post = posts.find((v) => v.id===id)

  return (
    <Container maxWidth="md" >
      {isNonEmptyArray(post) ?
      <Box>

        <Helmet
          meta={[
            {"property": "og:image", "content": post.image},
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
            <TwitterShareButton url={process.env.REACT_APP_BASE_URL} title={`『`+ post.title +`』を完読しました！\n#yomukatsu`}>
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