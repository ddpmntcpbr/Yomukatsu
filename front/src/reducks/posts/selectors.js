import {createSelector} from "reselect";

const postsSelector = (state) => state.posts;

// export const getPosts = createSelector(
//   [postsSelector],
//   state => state.list
// )

export const getReadingPosts = createSelector(
  [postsSelector],
  state => state.reading
)

export const getRegisteredPosts = createSelector(
  [postsSelector],
  state => state.registered
)

export const getCompletedPosts = createSelector(
  [postsSelector],
  state => state.completed
)