import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
import axios from "axios"
import { BookCard } from "../components/UIkit"
import { MapItemCard, ReadingBookDetail,CompletedBookDetail } from "../components/Posts"
import { fetchPostDetail } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const PostShow = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const path = selector.router.location.pathname;
  const id = path.split("/posts/show/")[1];
  const posts = getPosts(selector);
  console.log("selector",selector);
  console.log("posts",posts);
  console.log(posts.length>0)

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [image, setImage] = useState("");
  // const [url,setUrl] = useState("#");
  // const [status,setStatus] = useState("");
  // const [mapItems, setMapItems] = useState([]);
  // const [post, setPost] = useState("");
  // const post = posts[0]

  useEffect(()=>{
    dispatch(fetchPostDetail(id))
    console.log("fetchの直後",selector)
    // setTitle(response.data.title)
    // setAuthor(response.data.author)
    // setImage(response.data.image)
    // setUrl(response.data.url)
    // setStatus(response.data.status)
    // setMapItems(response.data.post_items)

    // const posts = getPosts(selector)
    // console.log(posts)
    // setPost(posts[0])
    // console.log(post)
    // axios.get(('http://localhost:3000/api/v1/posts/' +  String(id)), {
    //   headers: {
    //     'access-token': localStorage.getItem('auth_token'),
    //     'client': localStorage.getItem('client_id'),
    //     'uid': localStorage.getItem('uid'),
    //   }
    // })
    // .then((response) => {
    //   setTitle(response.data.title)
    //   setAuthor(response.data.author)
    //   setImage(response.data.image)
    //   setUrl(response.data.url)
    //   setStatus(response.data.status)
    //   setMapItems(response.data.post_items)
    // })
    // .catch((error) => {
    //   console.log("error",error)
    // })
  },[])

  // useEffect(()=>{
  //   setPost(posts[0])
  //   console.log("setPost post=",post)
  // },[selector])

  // useEffect(()=>{
  //   console.log("postが更新された",post)
  // },[setPost])

  // console.log("posts",posts)
  // console.log("posts[0]",posts[0])
  // console.log("判定",Object.keys(posts).length)
  return (
    <Container maxWidth="sm" >
      {posts.length > 0 && (
        <Box className={classes.root}>
          <ReadingBookDetail
              post={posts[0]}
            />
        </Box>
      )}
    </Container>
  )
}

export default PostShow