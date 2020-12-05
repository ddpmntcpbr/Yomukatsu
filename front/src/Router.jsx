import React from 'react';
import {Route, Switch} from "react-router";
import {
  PostEdit,
  PostShow,
  ReadingBookPage,
  RegisteredPostsList,
  RegisteredPostsDetail,
  TopPage,
  MyPage}
from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />

      <Auth>
        <Route exact path={"/reading/posts"} component={ReadingBookPage} />
        <Route exact path={"/registered/posts"} component={RegisteredPostsList} />
        <Route path={"/registered/posts/:id"} component={RegisteredPostsDetail} />
        <Route exact path={"/mypage"} component={MyPage} />
        <Route exact path={"/posts/edit"} component={PostEdit} />
        <Route path={"/posts/show(/:id)?"} component={PostShow} />
      </Auth>
    </Switch>
  );
};

export default Router