import React, { useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { moduleNames } from "../../../reducers/MainReducer";
import Main from "./Events";

const Events = () => {
  const {
    params: { modelId },
    path,
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-detail/${modelId}/events`,
    [modelId]
  );

  return (
    <>
      <BreadcrumbsItem to={url}>Events</BreadcrumbsItem>
      <Switch>
        <Route component={Main} />
      </Switch>
    </>
  );
};

export default Events;
