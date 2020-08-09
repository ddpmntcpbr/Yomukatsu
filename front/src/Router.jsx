import React from 'react';
import {Route, Switch} from "react-router";
import {BookSearch, Home,SignIn} from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />

      <Auth>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/search"} component={BookSearch} />
      </Auth>
    </Switch>
  );
};

export default Router