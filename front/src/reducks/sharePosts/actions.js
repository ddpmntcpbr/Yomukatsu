export const FETCH_SHARE_POSTS = "FETCH_SHARE_POSTS";
export const fetchSharePostsAction = (sharePosts) => {
  return {
    type: "FETCH_SHARE_POSTS",
    payload: sharePosts
  }
}