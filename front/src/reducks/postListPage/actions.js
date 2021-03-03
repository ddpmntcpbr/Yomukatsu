export const SWITCH_COMPLETED_POSTS_LIST_PAGINASTION_INDEX = "SWITCH_COMPLETED_POSTS_LIST_PAGINASTION_INDEX";
export const switchCompletedPostsListPaginationIndexAction = (index) => {
    return {
        type: "SWITCH_COMPLETED_POSTS_LIST_PAGINASTION_INDEX",
        payload: {
          completedPostsListPaginationIndex: index
        }
    }
};

export const SWITCH_TAB_INDEX = "SWITCH_TAB_INDEX";
export const switchTabIndexAction = (index) => {
    return {
        type: "SWITCH_TAB_INDEX",
        payload: {
          tabIndex: index
        }
    }
};

export const SWITCH_REGISTERED_POSTS_LIST_PAGINASTION_INDEX = "SWITCH_REGISTERED_POSTS_LIST_PAGINASTION_INDEX";
export const switchRegisteredPostsListPaginationIndexAction = (index) => {
    return {
        type: "SWITCH_REGISTERED_POSTS_LIST_PAGINASTION_INDEX",
        payload: {
          registeredPostsListPaginationIndex: index
        }
    }
};
