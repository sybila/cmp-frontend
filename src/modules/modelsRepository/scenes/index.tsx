import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as modelsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PrivateRoute from "components/PrivateRoute";
import PublishedModelsPage from "./ModelsPage";
import ModulesMainPage from "./MainPage";
import ModelDetail from "./ModelDetail";
import PublicRoute from "components/PublicRoute";

class ModelScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to={`/${modelsNames.url}`}>
          Models Repository
        </BreadcrumbsItem>
        <Switch>
          <Route
            path={`/${modelsNames.url}/published-models`}
            component={PublishedModelsPage}
          />
          <Route
            path={`/${modelsNames.url}/model-detail/:modelId`}
            component={ModelDetail}
          />
          <PublicRoute
            fallback={`/${modelsNames.url}/published-models`}
            component={ModulesMainPage}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ModelScenes;
