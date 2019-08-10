import { createSelector } from "reselect";
import _ from "lodash";
import { AppState } from "../../reducers/globalReducer";

export const getModelsObject = (state: AppState) =>
  state.module_models.models.byId;

export const getAllModels = (state: AppState) =>
  state.module_models.models.all.map(
    (i: any) => state.module_models.models.byId[i]
  );

export const getModelById = (id: number) => {
  return createSelector(
    getModelsObject,
    (models: any) => models[id]
  );
};
