export const FETCH_SHARE_POSTS_LIST = "FETCH_SHARE_POSTS_LIST";
export const fetchSharePostsListAction = (sharePosts) => {
  return {
    type: "FETCH_SHARE_POSTS",
    payload: sharePosts
  }
}