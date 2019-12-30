import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { moduleNames } from "./MainReducer";
import { ExperimentVariable } from "models/Experiment";
import { NormalizedObject } from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export interface NotesAction extends AnyAction {
  payload: {
    experimentId: number;
    data: NormalizedObject<ExperimentVariable>
  };
}

interface State {
  [key: number]: NormalizedObject<ExperimentVariable>;
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_VARIABLES: typeGenerator(moduleNames.store, "LOAD_VARIABLES")
};

const initialState: State = {
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Pending}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Fulfilled}`]: (
    state: State,
    action: NotesAction
  ) => ({
    ...state,
    [action.payload.experimentId]: action.payload.data,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_VARIABLES}_${ActionType.Rejected}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: false,
    error: true
  }),
};

const VarsReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default VarsReducer;
