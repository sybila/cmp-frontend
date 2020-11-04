import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import service from "./services";
import { ActionTypes as MainActionTypes } from "./reducers/MainReducer";
import { ActionTypes as NotesActionTypes } from "./reducers/NotesReducer";
import { ActionTypes as VarsActionTypes } from "./reducers/VarsReducer";
import {
  experimentNormalize,
  ExperimentNote,
  ExperimentVariable,
} from "models/Experiment";
import { genericNormalize } from "models/GenericTypes";
import _ from "lodash";

export const loadExperiments = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_EXPERIMENTS,
      payload: new Promise((resolve, reject) =>
        service.fetchExperiments().then(
          (experiments) => {
            resolve(experimentNormalize(experiments));
          },
          (error: any) => {
            return reject(error);
          }
        )
      ),
    });
};

export const loadExperiment = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_EXPERIMENT,
      payload: new Promise((resolve, reject) =>
        service.fetchExperiment(id).then(
          (experiment) => {
            dispatch(mergeExperimentVars(experiment.variables, experiment.id));
            delete experiment.notes;
            delete experiment.variables;

            resolve(experiment);
          },
          (error: any) => {
            return reject(error);
          }
        )
      ),
    });
};

export const mergeExperimentNotes = (
  notes: ExperimentNote[],
  experimentId: number
) => ({
  type: `${NotesActionTypes.LOAD_NOTES}_${ActionType.Fulfilled}`,
  payload: {
    experimentId,
    data: genericNormalize(notes),
  },
});

export const loadExperimentNotes = (id: number | string) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: NotesActionTypes.LOAD_NOTES,
      payload: new Promise((resolve, reject) =>
        service.fetchExperimentNotes(id).then(
          (notes) => {
            const data = genericNormalize(_.sortBy(notes, ["time"]));

            resolve({
              experimentId: id,
              data,
            });
          },
          (error) => {
            reject({
              experimentId: id,
              error:
                error && error.response && error.response.data
                  ? error.response.data
                  : { message: "Error has occurred" },
            });
          }
        )
      ),
    });
};

export const mergeExperimentVars = (
  vars: ExperimentVariable[],
  experimentId: number
) => ({
  type: `${VarsActionTypes.LOAD_VARIABLES}_${ActionType.Fulfilled}`,
  payload: {
    experimentId,
    data: genericNormalize(vars),
  },
});

export const loadExperimentVars = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: VarsActionTypes.LOAD_VARIABLES,
      payload: new Promise((resolve) =>
        service.fetchExperimentVars(id).then((vars) => {
          resolve({
            experimentId: id,
            data: genericNormalize(vars),
          });
        })
      ),
    });
};

export const loadExperimentVariable = (
  expId: number | string,
  varId: number | string
) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: VarsActionTypes.LOAD_VARIABLE,
      payload: new Promise((resolve, reject) => {
        service.fetchExperimentVariable(expId, varId).then((variable) => {
          resolve({
            experimentId: expId,
            variable,
          });
        });
      }),
    });
};

export const loadExperimentVariablesValues = (id: number | string) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: VarsActionTypes.LOAD_VARIABLES_DETAILS,
      payload: new Promise((resolve) =>
        service.fetchExperimentVariableDetailed(id).then((vars) => {
          resolve({
            experimentId: id,
            data: genericNormalize(vars),
          });
        })
      ),
    });
};
