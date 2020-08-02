import React from 'react';
import {Route, Switch} from "react-router";
import {Home,SignIn} from "./templates";
import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      
      <Auth>
        <Route path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router