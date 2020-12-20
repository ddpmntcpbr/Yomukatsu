import {createSelector} from "reselect";

const sharePostsSelector = (state) => state.sharePosts;

export const getSharePosts = createSelector(
  [sharePostsSelector],
  state => state.sharePosts
)
