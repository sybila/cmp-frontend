import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as experimentsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PrivateRoute from "components/PrivateRoute";

class ModelScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to={`/${experimentsNames.url}`}>Experiments Repository</BreadcrumbsItem>
        <Switch>
        </Switch>
      </React.Fragment>
    );
  }
}

export default ModelScenes;
