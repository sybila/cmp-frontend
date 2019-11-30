import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes } from "./reducers/MainReducer";
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
