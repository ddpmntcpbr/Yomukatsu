import { createSelector } from "reselect";

const postListPageSelector = (state) => state.postListPage;

export const getTabIndex = createSelector(
    [postListPageSelector],
    state => state.tabIndex
);