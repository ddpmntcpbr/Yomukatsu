import { createSelector } from "reselect";

const postListPageSelector = (state) => state.postListPage;

export const getCompletedPostsListPaginationIndex = createSelector(
    [postListPageSelector],
    state => state.completedPostsListPaginationIndex
);

export const getTabIndex = createSelector(
    [postListPageSelector],
    state => state.tabIndex
);

export const getRegisteredPostsListPaginationIndex = createSelector(
    [postListPageSelector],
    state => state.registeredPostsListPaginationIndex
);