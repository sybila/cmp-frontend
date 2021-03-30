import React, { useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { moduleNames } from "../../../reducers/MainReducer";
import { default as Main } from "./Components";
import Compartment from "./Compartment";
import Species from "./Species";

const Components = () => {
  const {
    params: { modelId },
    path,
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-detail/${modelId}/components`,
    [modelId]
  );

  return (
    <>
      <BreadcrumbsItem to={url}>Components</BreadcrumbsItem>
      <Switch>
        <Route
          path={`${path}/compartment/:compartmentId/species/:speciesId`}
          component={Species}
        />
        <Route
          path={`${path}/compartment/:compartmentId`}
          component={Compartment}
        />
        <Route component={Main} />
      </Switch>
    </>
  );
};

export default Components;
