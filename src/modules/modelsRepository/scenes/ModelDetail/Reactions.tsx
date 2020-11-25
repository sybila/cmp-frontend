import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const Reactions = () => {
  const match = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelInterface = getModel(parseInt(match.params.modelId, 10));
};
