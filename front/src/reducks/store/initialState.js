const initialState = {
  loading: {
    state: false,
    text: ""
  },
  posts: {
    isFetching: false,
    list: [],
    reading: [],
    registered: [],
    completed: []
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