import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { ExperimentPartial, Experiment } from "models/Experiment";
import { NormalizedObject } from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export const moduleNames = {
  store: "module_experiments",
  url: "experiments-repo"
};

export interface ExperimentsAction extends Action {
  payload?: NormalizedObject<ExperimentPartial> | Experiment;
}

interface State extends NormalizedObject<ExperimentPartial> {
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_EXPERIMENTS: typeGenerator(moduleNames.store, "LOAD_EXPERIMENTS"),
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
  [`${ActionTypes.LOAD_EXPERIMENTS}_${ActionType.Rejected}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: false,
    error: true
  }),
};

const modulesReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default modulesReducer;
