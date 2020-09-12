import React,{ useEffect } from 'react';
import {getUserId, getUserName, getUserImage} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
import {TwitterShareButton,TwitterIcon} from "react-share";
import {push} from "connected-react-router";
import Container from "@material-ui/core/COntainer"
import {makeStyles} from "@material-ui/styles";
import Avatar from '@material-ui/core/Avatar';
import Box from "@material-ui/core/Box"
import Typography from '@material-ui/core/Typography';
import {PrimaryButton} from "../components/UIkit";
import {fetchPosts} from "../reducks/posts/operations";
import {getPosts} from "../reducks/posts/selectors";
import { BookCard } from "../components/UIkit";

const useStyles = makeStyles((theme)=>({
  container: {
    textAlign: "center",
  },
  avator: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: "0 auto",
  },
  titleTypography: {
    fontSize: "2rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subTitleTypography: {
    fontSize: "1.5rem"
  },
}))

const MyPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const uid = getUserId(selector);
  const username = getUserName(selector);
  const image = getUserImage(selector);
  const posts = getPosts(selector);

  useEffect(()=>{
    dispatch(fetchPosts())
  },[])

  console.log(posts)
  return (
    <Container maxWidth="sm">
      <Box className={classes.container}>
        <Avatar alt="User Icon" src={image} className={classes.avator} />
        <Typography variant="h2" className={classes.titleTypography} >
          {username}さんの<br/>
          マイページ
        </Typography>
        <PrimaryButton
          label="新しい書籍を登録する"
          onClick={() => dispatch(push("/posts/edit"))}
          />
        <Typography variant="h3" className={classes.subTitleTypography} >
          読書中
        </Typography>

        <Box>
          {posts.length > 0 && (
            posts.map(post => (
              <BookCard key={post.id} title={post.title} author={post.author} image={post.image} />
            ))
          )}
        </Box>



        <div>
          <TwitterShareButton url={"https://qiita.com/ddpmntcpbr"} title={"Twitterでシェアしました！\n#ヨムカツ\n"}>
              <TwitterIcon size={48} round={true} />
          </TwitterShareButton>
        </div>
      </Box>
    </Container>
  );
};

export default MyPage
