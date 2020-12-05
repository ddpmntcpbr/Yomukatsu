import React from 'react';
import {Route, Switch} from "react-router";
import {PostEdit, PostShow, ReadingBookPage, TopPage, MyPage} from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />

      <Auth>
        <Route exact path={"/reading"} component={ReadingBookPage} />
        <Route exact path={"/mypage"} component={MyPage} />
        <Route exact path={"/posts/edit"} component={PostEdit} />
        <Route path={"/posts/show(/:id)?"} component={PostShow} />
      </Auth>
    </Switch>
  );
};

export default Router