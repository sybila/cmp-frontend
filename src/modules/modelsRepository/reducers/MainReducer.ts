import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { Model } from "models/Model";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export const moduleNames = {
  store: "model_models",
  url: "models-repo"
};

export interface Models {
  byId: {
    [key: number]: Model;
  };
  all: number[];
}

export interface ModelsAction extends Action {
  payload?: Models | Model;
}

interface ModelsState extends Models {
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_MODELS: typeGenerator(moduleNames.store, "LOAD_MODELS"),
  LOAD_MODEL: typeGenerator(moduleNames.store, "LOAD_MODEL")
};

const initialState: ModelsState = {
  byId: {},
  all: [],
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_MODELS}_${ActionType.Pending}`]: (
    state: ModelsState
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_MODELS}_${ActionType.Fulfilled}`]: (
    state: ModelsState,
    action: any
  ) => ({
    ...state,
    byId: {
      ...action.payload.byId,
      ...state.byId
    },
    all: action.payload.all,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_MODELS}_${ActionType.Rejected}`]: (
    state: ModelsState
  ) => ({
    ...state,
    isFetching: false,
    error: true
  }),
  [`${ActionTypes.LOAD_MODEL}_${ActionType.Pending}`]: (
    state: ModelsState
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_MODEL}_${ActionType.Fulfilled}`]: (
    state: ModelsState,
    action: any
  ) => {
    console.log({
      ...state.byId[action.payload.id],
      ...action.payload
    });

    return {
      ...state,
      byId: {
        ...state.byId,
        [action.payload.id]: {
          ...state.byId[action.payload.id],
          ...action.payload
        }
      },
      all: Array.from(new Set([...state.all, action.payload.id])),
      isFetching: false
    };
  },
  [`${ActionTypes.LOAD_MODEL}_${ActionType.Rejected}`]: (
    state: ModelsState
  ) => ({
    ...state,
    isFetching: false,
    error: true
  })
};

const modelsReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default modelsReducer;
