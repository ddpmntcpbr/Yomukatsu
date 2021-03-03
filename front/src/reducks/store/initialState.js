const initialState = {

  loading: {
    state: false,
    text: ""
  },

  notification: {
    isOpen: false,
    variant: 'success',
    message: '',
  },

  postListPage: {
    tabIndex: 0, // 0: 登録済みリスト, 1:完読リスト
    registerdPostsListPaginationIndex: 1,
    completedPostsLIstPaginationIndex: 1,
  },

  posts: {
    isFetching: false,
    reading: [],
    registered: [],
    completed: [],
  },

  sharePosts: {
    list: []
  },

  users: {
    isSignedIn: false,
    role:  "",
    uid: "",
    username: "",
    userNickname: "",
    image: ""
  }
};

export default initialState