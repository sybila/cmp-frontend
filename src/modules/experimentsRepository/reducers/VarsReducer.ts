import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { moduleNames } from "./MainReducer";
import { ExperimentVariable } from "models/Experiment";
import { NormalizedObject } from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export interface VarsAction extends AnyAction {
  payload: {
    experimentId: number;
    variable?: ExperimentVariable;
    data: NormalizedObject<ExperimentVariable>;
  };
}

interface State {
  [key: number]: NormalizedObject<ExperimentVariable>;
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_VARIABLES: typeGenerator(moduleNames.store, "LOAD_VARIABLES"),
  LOAD_VARIABLE: typeGenerator(moduleNames.store, "LOAD_VARIABLE")
};

const initialState: State = {
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Pending}`]: (state: State) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Fulfilled}`]: (
    state: State,
    action: VarsAction
  ) => ({
    ...state,
    [action.payload.experimentId]: action.payload.data,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Rejected}`]: (state: State) => ({
    ...state,
    isFetching: false,
    error: true
  }),
  [`${ActionTypes.LOAD_VARIABLE}_${ActionType.Pending}`]: (state: State) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_VARIABLE}_${ActionType.Fulfilled}`]: (
    state: State,
    action: VarsAction
  ) => {
    const experiment = state[action.payload.experimentId];
    const { id } = action.payload.variable;
    const all = new Set(experiment.all);
    all.add(id);

    const byId = {
      ...experiment.byId,
      [id]: {
        ...experiment.byId[id],
        ...action.payload.variable
      }
    };

    return {
      ...state,
      [action.payload.experimentId]: {
        byId,
        all: Array.from(all)
      },
      isFetching: false
    };
  },
  [`${ActionTypes.LOAD_VARIABLE}_${ActionType.Rejected}`]: (state: State) => ({
    ...state,
    isFetching: false,
    error: true
  })
};

const VarsReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default VarsReducer;
