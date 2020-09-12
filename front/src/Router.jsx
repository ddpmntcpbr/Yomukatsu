import React from 'react';
import {Route, Switch} from "react-router";
import {PostEdit, PostShow, TopPage, MyTabPage, MyPage} from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />

      <Auth>
        <Route exact path={"/mypage"} component={MyPage} />
        <Route exact path={"/my_tab_page"} component={MyTabPage} />
        <Route exact path={"/posts/edit"} component={PostEdit} />
        <Route path={"/posts(/:id)?"} component={PostShow} />
      </Auth>
    </Switch>
  );
};

export default Router