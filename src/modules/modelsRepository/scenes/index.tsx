import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as modelsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PublishedModelsPage from "./ModelsPage";
import ModulesMainPage from "./MainPage";

class ModelScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to="/models-repo">Models Repository</BreadcrumbsItem>
        <Switch>
          <Route
            path={`/${modelsNames.url}/published-models`}
            component={PublishedModelsPage}
          />
          <Route component={ModulesMainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ModelScenes;
