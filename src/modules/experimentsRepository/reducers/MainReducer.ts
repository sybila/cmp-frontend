import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { Model } from "models/Model";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export const moduleNames = {
  store: "module_experiments",
  url: "experiments-repo"
};

export interface Models {
  byId: {
    [key: number]: Model;
  };
  all: number[];
}

export interface ModulesAction extends Action {
  payload?: Models | Model;
}

interface ModulesState extends Models {
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_MODULES: typeGenerator(moduleNames.store, "LOAD_MODULES"),
  LOAD_MODULE: typeGenerator(moduleNames.store, "LOAD_MODULE")
};

const initialState: ModulesState = {
  byId: {},
  all: [],
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Pending}`]: (
    state: ModulesState
  ) => ({
    ...state,
    isFetching: true
  }),
};

const modulesReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default modulesReducer;
