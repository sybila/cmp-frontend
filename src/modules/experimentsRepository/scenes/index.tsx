import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as experimentsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import ExperimentsMainPage from "./MainPage";
import ExperimentsRepository from "./ExperimentsPage";
import DetailPage from "./DetailPage";


class ExperimentsScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to={`/${experimentsNames.url}`}>Experiments Repository</BreadcrumbsItem>
        <Switch>
          <Route
              path={`/${experimentsNames.url}/repository/detail/:experimentId`}
              component={DetailPage}
          />
          <Route
              path={`/${experimentsNames.url}/repository`}
              component={ExperimentsRepository}
          />
          <Route component={ExperimentsMainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ExperimentsScenes;
