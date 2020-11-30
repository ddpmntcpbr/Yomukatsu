const initialState = {
  loading: {
    state: false,
    text: ""
  },
  posts: {
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