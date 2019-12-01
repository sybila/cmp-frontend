import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes } from "./reducers/MainReducer";
import { ActionTypes as NotesActionTypes } from "./reducers/NotesReducer";
import { experimentNormalize } from "models/Experiment";

export const loadExperiments = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_EXPERIMENTS,
      payload: new Promise((resolve, reject) =>
        service.fetchExperiments().then(experiments => {
          resolve(experimentNormalize(experiments));
        })
      )
    });
};

export const loadExperiment = (id: number) => {
  return async (dispatch: Dispatch) =>
  dispatch({
    type: MainActionTypes.LOAD_EXPERIMENT,
    payload: new Promise((resolve, reject) =>
      service.fetchExperiment(id).then(experiment => {
        resolve(experiment);
      })
    )
  });
};

export const loadExperimentNotes = (id: number) => {
  return async (dispatch: Dispatch) => 
  dispatch({
    type: NotesActionTypes.LOAD_NOTES,
    payload: new Promise((resolve) =>
      service.fetchExperimentNotes(id).then(notes => {
        resolve({
          experimentId: id,
          data: experimentNormalize(notes),
        });
      })
    )
  });  
}