import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Container } from "@material-ui/core"
import { fetchPostDetail } from "../reducks/posts/operations";
import { getPosts } from "../reducks/posts/selectors";

const PostShow = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const path = selector.router.location.pathname;
  const id = path.split("/posts/")[1];
  const post = getPosts(selector);

  useEffect(()=>{
    dispatch(fetchPostDetail(id))
  },[])

  return (
    <Container maxWidth="sm">
      This is PostShow page.
      {post.length > 0 &&(
        <div>
          {post[0].title}
        </div>
      )}
    </Container>
  )
}

export default PostShow