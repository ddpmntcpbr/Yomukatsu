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

  posts: {
    isFetching: false,
    reading: [],
    registered: [],
    completed: [],
    share: []
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