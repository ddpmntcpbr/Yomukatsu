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

export const FETCH_READING_POSTS = "FETCH_READING_POSTS";
export const fetchReadingPostsAction = (posts) => {
  return {
    type: "FETCH_READING_POSTS",
    payload: posts
  }
}

export const FETCH_COMPLETED_POSTS = "FETCH_COMPLETED_POSTS";
export const fetchCompletedPostsAction = (posts) => {
  return {
    type: "FETCH_COMPLETED_POSTS",
    payload: posts
  }
}

export const FETCH_COMPLETED_POSTS_DETAIL = "FETCH_COMPLETED_POSTS_DETAIL";
export const fetchCompletedPostsDetailAction = (posts) => {
  return {
    type: "FETCH_COMPLETED_POSTS_DETAIL",
    payload: posts
  }
}

export const FETCH_REGISTERED_POSTS = "FETCH_REGISTERED_POSTS";
export const fetchRegisteredPostsAction = (posts) => {
  return {
    type: "FETCH_REGISTERED_POSTS",
    payload: posts
  }
}

export const FETCH_REGISTERED_POSTS_DETAIL = "FETCH_REGISTERED_POSTS_DETAIL";
export const fetchRegisteredPostsDetailAction = (posts) => {
  return {
    type: "FETCH_REGISTERED_POSTS_DETAIL",
    payload: posts
  }
}