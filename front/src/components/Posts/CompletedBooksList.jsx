import React from "react";
// import { makeStyles } from "@material-ui/styles"
import { useDispatch, useSelector } from "react-redux";
// import { getUserId, getUserName, getUserImage } from '../../reducks/users/selectors';
import { getPosts } from '../../reducks/posts/selectors';
import { BookCard } from "../UIkit";
import { Box } from "@material-ui/core";
import { push } from "connected-react-router";
// import { fetchPosts } from "../../reducks/posts/operations";

// const useStyles = makeStyles((theme)=>({
//   root: {

//   }
// }))

const CompletedBooksList = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  // const uid = getUserId(selector);
  // const username = getUserName(selector);
  // const image = getUserImage(selector);
  const posts = getPosts(selector);

  // useEffect(()=>{
  //   dispatch(fetchPosts())
  // },[dispatch])

  return (
    <div>
      {posts.length > 0 && (
        posts.map(post => (
          post.status === "completed" &&(
            <Box
              key={post.id}
              onClick={()=>dispatch(push("posts/show/" + String(post.id)))}
            >
              <BookCard
                title={post.title}
                author={post.author}
                image={post.image}
              />
            </Box>
          )
        ))
      )}
    </div>
  )
}

export default CompletedBooksList