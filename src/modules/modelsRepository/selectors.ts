import { createSelector } from "reselect";
import _ from "lodash";
import { AppState } from "reducers/GlobalReducer";

export const getModelsObject = (state: AppState) =>
  state.module_models.models.byId;

export const getAllModels = (state: AppState) =>
  state.module_models.models.all.map(
    (i: any) => state.module_models.models.byId[i]
  );

export const getModelById = createSelector(
  getModelsObject,
  (models: any) => _.memoize((id: number) => models[id])
);
