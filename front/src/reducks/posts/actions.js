export const FETCH_POST_DETAIL = "FETCH_POST_DETAIL";
export const fetchPostDetailAction = (posts) => {
  return {
    type: "FETCH_POST_DETAIL",
    payload: posts
  }
}

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPostsAction = (posts) => {
  return {
    type: "FETCH_POSTS",
    payload: posts
  }
}