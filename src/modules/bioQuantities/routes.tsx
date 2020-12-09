import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { moduleNames as bioQuantitiesNames } from "./reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import BioQuantitiesList from "./scenes/BioQuantitiesList";
import BioQuantitiesDetail from "./scenes/BioQuantityDetail";

import PublicRoute from "components/PublicRoute";
import ModuleInfo from "./scenes/ModuleInfo";

const BioQuantitiesRoutes = () => {
  return (
    <>
      <BreadcrumbsItem to={`/${bioQuantitiesNames.url}`}>
        BioQuantities
      </BreadcrumbsItem>
      <Switch>
        <Route
          component={BioQuantitiesDetail}
          path={`/${bioQuantitiesNames.url}/detail/:detailId`}
        />
        <Route
          component={ModuleInfo}
          path={`/${bioQuantitiesNames.url}/info`}
        />
        <Route
          component={BioQuantitiesList}
          path={`/${bioQuantitiesNames.url}/list`}
        />

        <PublicRoute
          path={`/${bioQuantitiesNames.url}/`}
          to={`/${bioQuantitiesNames.url}/list`}
          fallback={`/${bioQuantitiesNames.url}/info`}
        />
      </Switch>
    </>
  );
};

export default BioQuantitiesRoutes;
