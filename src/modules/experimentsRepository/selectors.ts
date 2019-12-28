import { AppState } from "reducers/GlobalReducer";
import { createSelector } from "reselect";

export const getExperimentsObject = (state: AppState) =>
  state.module_experiments.experiments.byId;

export const getAllExperiments = (state: AppState) =>
  state.module_experiments.experiments.all.map(
    (i: any) => state.module_experiments.experiments.byId[i]
  );

export const getAllNotesById = (state: AppState) => 
  state.module_experiments.notes;

const getExperimentId = (state: AppState, id: number) => id;

export const getVariablesById = createSelector(
  [getExperimentsObject, getExperimentsObject],
  (experiments, id) => {
    if (!experiments[id]) return;

    return experiments[id].variables
  }
);

export const getNotesById = createSelector(
  [getAllNotesById, getExperimentId],
  (notes, id) => {
    if (!notes[id]) return;

    return notes[id].all.map(
    (i: any) => notes[id].byId[i]
  )}
);