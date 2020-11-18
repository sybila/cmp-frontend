import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { moduleNames as bioQuantitiesNames } from "./reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import BioQuantitiesList from "./scenes/BioQuantitiesList";
import BioQuantitiesDetail from "./scenes/BioQuantityDetail";

import PublicRoute from "components/PublicRoute";

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
        <PublicRoute
          component={BioQuantitiesList}
          fallback={`/${bioQuantitiesNames.url}/repository`}
        />
      </Switch>
    </>
  );
};

export default BioQuantitiesRoutes;
