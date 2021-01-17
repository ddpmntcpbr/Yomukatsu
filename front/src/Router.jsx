import React from 'react';
import {Route, Switch} from "react-router";
import {
  CompletedPostsDetail,
  CompletedPostsList,
  PostEdit,
  PostsList,
  PostUpdatePage,
  ReadingPostsDetail,
  RegisteredPostsDetail,
  RegisteredPostsList,
  SharePostsPage,
  TopPage}
from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />
      <Route exact path={"/share/posts/:id"} component={SharePostsPage} />

      <Auth>
        <Route exact path={"/completed/posts/:id"} component={CompletedPostsDetail} />
        <Route exact path={"/completed/posts"} component={CompletedPostsList} />
        <Route exact path={"/reading/posts"} component={ReadingPostsDetail} />
        <Route exact path={"/reading/posts/update"} component={PostUpdatePage} />
        <Route exact path={"/registered/posts"} component={RegisteredPostsList} />
        <Route exaxt path={"/registered/posts/:id"} component={RegisteredPostsDetail} />
        <Route exact path={"/posts/edit"} component={PostEdit} />
        <Route exact path={"/mypage"} component={PostsList} />
      </Auth>
    </Switch>
  );
};

export default Router