import { createSelector } from "reselect";
import _ from "lodash";
import { AppState } from "reducers/GlobalReducer";

export const getExperimentsObject = (state: AppState) =>
  state.module_experiments.experiments.byId;

export const getAllExperiments = (state: AppState) =>
  state.module_experiments.experiments.all.map(
    (i: any) => state.module_experiments.experiments.byId[i]
  );

export const getExperimentById = createSelector(
  getExperimentsObject,
  (experiments: any) => _.memoize((id: number) => experiments[id])
);
