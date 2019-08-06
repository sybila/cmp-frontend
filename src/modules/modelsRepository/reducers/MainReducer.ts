import { Action } from "redux";
import { Model } from "../models/Model";

import { asyncAction } from "../../../Helpers";

export interface Models {
  byId: {
    [key: number]: Model;
  };
  all: number[];
}

export interface ModulesAction extends Action {
  models?: Models;
}

interface ModulesState extends Models {
  isFetching: boolean;
}

export const ActionTypes = {
  LOAD_MODULES: "LOAD_MODULES"
};

const initialState: ModulesState = {
  byId: {},
  all: [],
  isFetching: false
};

const modulesReducer = (
  state = initialState,
  action: ModulesAction
): ModulesState => {
  switch (action.type) {
    case asyncAction.request(ActionTypes.LOAD_MODULES):
      return {
        ...state,
        isFetching: true
      };
    case asyncAction.success(ActionTypes.LOAD_MODULES):
      return {
        ...state,
        byId: action.models.byId,
        all: action.models.all,
        isFetching: false
      };
    case asyncAction.failure(ActionTypes.LOAD_MODULES):
    default:
      return state;
  }
};

export default modulesReducer;
