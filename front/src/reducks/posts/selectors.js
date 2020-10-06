import {createSelector} from "reselect";

const postsSelector = (state) => state.posts;

export const getPosts = createSelector(
  [postsSelector],
  state => state.list
)