import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes } from "./reducers/MainReducer";
import { ActionTypes as NotesActionTypes } from "./reducers/NotesReducer";
import { ActionTypes as VarsActionTypes } from "./reducers/VarsReducer";
import { experimentNormalize } from "models/Experiment";
import { genericNormalize } from "models/GenericTypes";

export const loadExperiments = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_EXPERIMENTS,
      payload: new Promise((resolve, reject) =>
        service.fetchExperiments().then(
          experiments => {
            resolve(experimentNormalize(experiments));
          },
          (error: any) => {
            return reject(error);
          }
        )
      )
    });
};

export const loadExperiment = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_EXPERIMENT,
      payload: new Promise((resolve, reject) =>
        service.fetchExperiment(id).then(
          (experiment) => {
            resolve({
              ...experiment,
              variables: genericNormalize(experiment.variables).byId
            });
          },
          (error: any) => {
            return reject(error);
          }
        )
      )
    });
};

export const loadExperimentNotes = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: NotesActionTypes.LOAD_NOTES,
      payload: new Promise(resolve =>
        service.fetchExperimentNotes(id).then(notes => {
          resolve({
            experimentId: id,
            data: genericNormalize(notes)
          });
        })
      )
    });
};

export const loadExperimentVars = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: VarsActionTypes.LOAD_VARIABLES,
      payload: new Promise(resolve =>
        service.fetchExperimentVars(id).then(vars => {
          resolve({
            experimentId: id,
            data: genericNormalize(vars)
          });
        })
      )
    });
};
