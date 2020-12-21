export const FETCH_SHARE_POST = "FETCH_SHARE_POST";
export const fetchSharePostAction = (sharePosts) => {
  return {
    type: "FETCH_SHARE_POST",
    payload: sharePosts
  }
}

export const FETCH_SHARE_POSTS_LIST = "FETCH_SHARE_POSTS_LIST";
export const fetchSharePostsListAction = (sharePosts) => {
  return {
    type: "FETCH_SHARE_POSTS_LIST",
    payload: sharePosts
  }
}