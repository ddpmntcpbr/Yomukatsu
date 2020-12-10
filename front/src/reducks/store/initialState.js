const initialState = {
  loading: {
    state: false,
    text: ""
  },
  posts: {
    isFetching: false,
    list: []
  },

  users: {
    isSignedIn: false,
    role:  "",
    uid: "",
    username: "",
    image: ""
  }
};

export default initialState