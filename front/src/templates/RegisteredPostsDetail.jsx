import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
// import { fetchRegisteredPostsDetail } from "../reducks/posts/operations"
import { makeStyles } from "@material-ui/styles";
import { getPosts } from "../reducks/posts/selectors"
import axios from "axios"

const useStyles = makeStyles((theme)=>({
  root: {
  }
}))

const RegisteredPostsDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const path = selector.router.location.pathname;
  const id = path.split("/registered/posts/")[1];
  const [post,setPost] = useState({});

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
    };
    fetchPostsDetail()
  },[dispatch,id])

  return (
    <Container maxWidth="sm" >
      {post && (
        <Typography>{post.title}</Typography>
      )}
    </Container>
  )
}

export default RegisteredPostsDetail