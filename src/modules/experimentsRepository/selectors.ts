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

export const getAllVarsById = (state: AppState) =>
  state.module_experiments.variables;

const getExperimentId = (state: AppState, id: number) => id;

export const getVarsById = createSelector(
  [getAllVarsById, getExperimentId],
  (vars, id) => {
    if (!vars[id]) return;

    return vars[id].all.map(
    (i: any) => vars[id].byId[i]
  )}
);

export const getNotesById = createSelector(
  [getAllNotesById, getExperimentId],
  (notes, id) => {
    if (!notes[id]) return;

    return notes[id].all.map(
    (i: any) => notes[id].byId[i]
  )}
);