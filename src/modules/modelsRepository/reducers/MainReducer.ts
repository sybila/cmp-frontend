import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { Model } from "../models/Model";
import { typeGenerator, reducerGenerator } from "../../../ReduxGenerators";

export const moduleNames = {
  store: "module_models",
  url: "models-repo"
};

export interface Models {
  byId: {
    [key: number]: Model;
  };
  all: number[];
}

export interface ModulesAction extends Action {
  payload?: Models;
}

interface ModulesState extends Models {
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_MODULES: typeGenerator(moduleNames.store, "LOAD_MODULES")
};

const initialState: ModulesState = {
  byId: {},
  all: [],
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Pending}`]: state => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Fulfilled}`]: (state, action) => ({
    ...state,
    byId: action.payload.byId,
    all: action.payload.all,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Rejected}`]: state => ({
    ...state,
    isFetching: false,
    error: true
  })
};

const modulesReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default modulesReducer;
