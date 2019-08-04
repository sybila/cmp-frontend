import { Action } from "redux";
import { Model } from "../models/Model";

export interface ModulesAction extends Action {
  models?: Model[];
}

interface ModulesState {
  modules: {
    byId: {
      [key: number]: Model;
    };
    all: number[];
  };
  isFetching: boolean;
}

export const ActionTypes = {
  LOAD_MODULES_REQUEST: "@@app/LOAD_MODULES_REQUEST",
  LOAD_MODULES_SUCCESS: "@@app/LOAD_MODULES_SUCCESS",
  LOAD_MODULES_FAILURE: "@@app/LOAD_MODULES_FAILURE"
};

const initialState: ModulesState = {
  modules: null,
  isFetching: false
};

const modulesReducer = (
  state = initialState,
  action: ModulesAction
): ModulesState => {
  switch (action.type) {
    case ActionTypes.LOAD_MODULES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.LOAD_MODULES_SUCCESS:
    default:
      return state;
  }
};

export default modulesReducer;
