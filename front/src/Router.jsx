import React from 'react';
import {Route, Switch} from "react-router";
import {TopPage, MyPage} from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={TopPage} />

      <Auth>
        <Route exact path={"/mypage"} component={MyPage} />
      </Auth>
    </Switch>
  );
};

export default Router