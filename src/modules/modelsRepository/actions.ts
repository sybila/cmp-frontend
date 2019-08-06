import React from "react";
import { Dispatch } from "redux";

import service from "./services";
import { ActionTypes as MainActionTypes, Models } from "./reducers/MainReducer";
import { modelNormalize } from "./models/Model";

import { asyncAction } from "../../Helpers";

export const loadModels = () => {
  return (dispatch: Dispatch) => {
    dispatch(request());

    return service.load().then(models => {
      console.log(modelNormalize(models));
      dispatch(success(modelNormalize(models)));
    });
  };

  function request() {
    return { type: asyncAction.request(MainActionTypes.LOAD_MODULES) };
  }

  function success(models: Models) {
    return {
      type: asyncAction.success(MainActionTypes.LOAD_MODULES),
      models
    };
  }

  function failure() {
    return { type: asyncAction.failure(MainActionTypes.LOAD_MODULES) };
  }
};
