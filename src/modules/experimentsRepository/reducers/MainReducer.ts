import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { ExperimentPartial, Experiment } from "models/Experiment";
import { NormalizedObject } from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export const moduleNames = {
  store: "module_experiments",
  url: "experiments"
};

export interface ExperimentsAction extends AnyAction {
  payload: NormalizedObject<ExperimentPartial>;
}

export interface ExperimentAction extends AnyAction {
  payload: Experiment;
}

interface State extends NormalizedObject<ExperimentPartial> {
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_EXPERIMENTS: typeGenerator(moduleNames.store, "LOAD_EXPERIMENTS"),
  LOAD_EXPERIMENT: typeGenerator(moduleNames.store, "LOAD_EXPERIMENT")
};

const initialState: State = {
  byId: {},
  all: [],
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_EXPERIMENTS}_${ActionType.Pending}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_EXPERIMENTS}_${ActionType.Fulfilled}`]: (
    state: State,
    action: ExperimentsAction
  ) => ({
    ...state,
    byId: {
      ...action.payload.byId,
      ...state.byId
    },
    all: action.payload.all,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_EXPERIMENTS}_${ActionType.Rejected}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: false,
    error: true
  }),
  [`${ActionTypes.LOAD_EXPERIMENT}_${ActionType.Pending}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_EXPERIMENT}_${ActionType.Fulfilled}`]: (
    state: State,
    action: ExperimentAction
  ) => {
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
  [`${ActionTypes.LOAD_EXPERIMENT}_${ActionType.Rejected}`]: (
    state: State
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
