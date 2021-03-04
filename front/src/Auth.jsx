import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";
import { initialFetchPosts } from "./reducks/posts/operations";
import queryString from "query-string";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    let tokens = queryString.parse(window.location.search);

    if (tokens["auth_token"]) {
      localStorage.setItem("auth_token", tokens.auth_token);
      localStorage.setItem("client_id", tokens.client_id);
      localStorage.setItem("uid", tokens.uid);
      dispatch(initialFetchPosts());

      window.location.href = process.env.REACT_APP_BASE_URL + "/reading/posts";
      // window.location.href = "http://localhost:8000/mypage"
    } else if (!isSignedIn) {
      dispatch(listenAuthState());
      dispatch(initialFetchPosts());
    }
  }, [dispatch, isSignedIn]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};
export default Auth;
