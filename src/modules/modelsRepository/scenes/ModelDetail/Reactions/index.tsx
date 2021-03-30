import React, { useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { moduleNames } from "../../../reducers/MainReducer";
import { default as Main } from "./Reactions";
import Reaction from "./Reaction";

const Reactions = () => {
  const {
    params: { modelId },
    path,
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-detail/${modelId}/reactions`,
    [modelId]
  );

  return (
    <>
      <BreadcrumbsItem to={url}>Reactions</BreadcrumbsItem>
      <Switch>
        <Route path={`${path}/reaction/:reactionId`} component={Reaction} />
        <Route component={Main} />
      </Switch>
    </>
  );
};

export default Reactions;
