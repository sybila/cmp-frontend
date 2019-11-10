import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes } from "./reducers/MainReducer";
import { modelNormalize } from "models/Model";

export const loadModels = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_MODELS,
      payload: new Promise((resolve, reject) =>
        service.load().then(models => {
          resolve(modelNormalize(models));
        })
      )
    });
};

export const loadModel = (id: number) => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_MODEL,
      payload: new Promise((resolve, reject) =>
        service.loadModel(id).then(model => resolve(model[0]))
      )
    });
};
