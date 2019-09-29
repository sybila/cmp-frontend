import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { Model } from "models/Model";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

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
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Fulfilled}`]: (
    state: ModulesState,
    action: any
  ) => ({
    ...state,
    byId: action.payload.byId,
    all: action.payload.all,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_MODULES}_${ActionType.Rejected}`]: (
    state: ModulesState
  ) => ({
    ...state,
    isFetching: false,
    error: true
  }),
  [`${ActionTypes.LOAD_MODULE}_${ActionType.Pending}`]: (
    state: ModulesState
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_MODULE}_${ActionType.Fulfilled}`]: (
    state: ModulesState,
    action: any
  ) => ({
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: action.payload
    },
    all: Array.from(new Set([...state.all, action.payload.id])),
    isFetching: false
  }),
  [`${ActionTypes.LOAD_MODULE}_${ActionType.Rejected}`]: (
    state: ModulesState
  ) => ({
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
