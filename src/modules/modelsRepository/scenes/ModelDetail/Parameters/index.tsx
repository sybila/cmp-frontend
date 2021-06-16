import React, { useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { moduleNames } from "../../../reducers/MainReducer";
import Parameters from "./Parameters";
import ParameterDetail from "./ParameterDetail";

const Reactions = () => {
  const {
    params: { modelId },
    path,
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-detail/${modelId}/parameters`,
    [modelId]
  );

  return (
    <>
      <BreadcrumbsItem to={url}>Parameters</BreadcrumbsItem>
      <Switch>
        <Route path={`${path}/:parameterId`} component={ParameterDetail} />
        <Route component={Parameters} />
      </Switch>
    </>
  );
};

export default Reactions;
