import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { moduleNames as experimentsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import ExperimentsMainPage from "./MainPage";
import ExperimentsRepository from "./DetailPage/ExperimentsPage";
import DetailPage from "./DetailPage";
import AddExperiment from "./AddExperiment";

type RouteParams = {
  experimentId?: string;
};

export interface ExperimentComponentProps
  extends RouteComponentProps<RouteParams> {}

class ExperimentsScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to={`/${experimentsNames.url}`}>
          Experiments
        </BreadcrumbsItem>
        <Switch>
          <Route
            path={`/${experimentsNames.url}/repository/detail/:experimentId`}
            component={DetailPage}
          />
          <Route
            path={`/${experimentsNames.url}/repository`}
            component={ExperimentsRepository}
          />
          <Route
            path={`/${experimentsNames.url}/new`}
            component={AddExperiment}
          />
          <Route component={ExperimentsMainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ExperimentsScenes;
