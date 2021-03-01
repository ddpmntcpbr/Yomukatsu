import React from 'react';
import {Route, Switch} from "react-router";
import {
  Agreement,
  CompletedPostsDetail,
  IntroductionPage,
  PostEdit,
  PostsList,
  ReadingPostsDetail,
  RegisteredPostsDetail,
  Setting,
  SharePostsPage,
  TopPage}
from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />
      <Route exact path={"/share/posts/:id"} component={SharePostsPage} />
      <Route exact path={"/agreement"} component={Agreement} />
      <Route exact path={"/intro"} component={IntroductionPage} />

      <Auth>
        <Route exact path={"/completed/posts/:id"} component={CompletedPostsDetail} />
        <Route exact path={"/reading/posts"} component={ReadingPostsDetail} />
        <Route exact path={"/setting"} component={Setting} />
        <Route exaxt path={"/registered/posts/:id"} component={RegisteredPostsDetail} />
        <Route exact path={"/posts/edit"} component={PostEdit} />
        <Route exact path={"/posts/list"} component={PostsList} />
      </Auth>
    </Switch>
  );
};

export default Router