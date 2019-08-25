import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as modelsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PrivateRoute from "components/PrivateRoute";
import PublishedModelsPage from "./ModelsPage";
import ModulesMainPage from "./MainPage";
import ModelDetail from "./ModelDetail";

class ModelScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to="/models-repo">Models Repository</BreadcrumbsItem>
        <Switch>
          <PrivateRoute
            path={`/${modelsNames.url}/published-models`}
            component={PublishedModelsPage}
          />
          <Route
            path={`/${modelsNames.url}/model-detail/:modelId`}
            component={ModelDetail}
          />
          <Route component={ModulesMainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ModelScenes;
