import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes, Models } from "./reducers/MainReducer";
import { modelNormalize } from "models/Model";

export const loadModels = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_MODULES,
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
      type: MainActionTypes.LOAD_MODULE,
      payload: new Promise((resolve, reject) =>
        service.loadModel(id).then(model => resolve(model[0]))
      )
    });
};
