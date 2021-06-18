import React from "react";

import { Route, Switch } from "react-router-dom";
import { moduleNames as modelsNames } from "../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PublishedModelsPage from "./ModelsPage";
import ModulesMainPage from "./MainPage";
import ModelDetail from "./ModelDetail";
import PublicRoute from "components/PublicRoute";
import AddModel from "./AddModel";

class ModelScenes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbsItem to={`/${modelsNames.url}`}>
          Models Repository
        </BreadcrumbsItem>
        <Switch>
          <Route
            path={`/${modelsNames.url}/model-detail/:modelId`}
            component={ModelDetail}
          />
          <Route
            path={`/${modelsNames.url}/info`}
            component={ModulesMainPage}
          />
          <Route path={`/${modelsNames.url}/new`} component={AddModel} />
          <Route
            path={`/${modelsNames.url}/repository`}
            component={PublishedModelsPage}
          />
          <PublicRoute
            path={`/${modelsNames.url}/`}
            to={`/${modelsNames.url}/repository`}
            fallback={`/${modelsNames.url}/info`}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default ModelScenes;
