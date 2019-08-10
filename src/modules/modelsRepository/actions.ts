import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes, Models } from "./reducers/MainReducer";
import { modelNormalize } from "./models/Model";

export const loadModels = () => {
  return async (dispatch: Dispatch) =>
    dispatch({
      type: MainActionTypes.LOAD_MODULES,
      payload: new Promise((resolve, reject) =>
        service.load().then(models => {
          console.log(modelNormalize(models));
          resolve(modelNormalize(models));
        })
      )
    });
};
