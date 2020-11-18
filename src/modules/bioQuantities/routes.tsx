import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { moduleNames as bioQuantitiesNames } from "./reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import PublicRoute from "components/PublicRoute";

const BioQuantitiesRoutes = () => {
  return (
    <>
      <BreadcrumbsItem to={`/${bioQuantitiesNames.url}`}>
        BioQuantities
      </BreadcrumbsItem>
      <Switch></Switch>
    </>
  );
};

export default BioQuantitiesRoutes;
