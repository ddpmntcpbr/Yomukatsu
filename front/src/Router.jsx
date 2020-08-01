import React from 'react';
import {Route, Switch} from "react-router";
import {Home} from "./templates";
// import Auth from "./Auth"

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
    </Switch>
  );
};

export default Router