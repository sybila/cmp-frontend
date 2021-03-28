import React, { useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { moduleNames } from "../../../reducers/MainReducer";
import { default as Main } from "./Components";
import Compartment from "./Compartment";
import Species from "./Species";
import { ModelCompartment, Species as SpeciesModel } from "models/Model";
import { TreeItem } from "components/Tree";

export enum TreeItemComponent {
  Specie,
  Compartment,
}

export const speciesToTreeItem = (species: SpeciesModel): TreeItem => {
  return {
    id: species.id,
    caption: species.name,
    meta: TreeItemComponent.Specie,
  };
};

export const transformCompartmentToTreeItem = (
  compartment: ModelCompartment,
  species: SpeciesModel[]
): TreeItem => {
  return {
    id: compartment.id,
    caption: compartment.name,
    children: species ? species.map(speciesToTreeItem) : [],
    meta: TreeItemComponent.Compartment,
  };
};

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
