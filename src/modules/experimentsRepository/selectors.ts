import { AppState } from "reducers/GlobalReducer";
import { createSelector } from "reselect";

export const getExperimentsObject = (state: AppState) =>
  state.module_experiments.experiments.byId;

export const getAllExperiments = (state: AppState) =>
  state.module_experiments.experiments.all.map(
    (i: any) => state.module_experiments.experiments.byId[i]
  );

export const getNotesForExperiment = (state: AppState, id: number) => 
  state.module_experiments.notes[id];

export const makeNotesSelectorForExperiment = () => createSelector(
  [getNotesForExperiment],
  (notes, itemId) => {
    if (notes && notes.byId) {
      return notes.byId[itemId]
    }
  }
);