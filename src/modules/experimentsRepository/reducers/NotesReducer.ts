import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { moduleNames } from "./MainReducer";
import { ExperimentNote } from "models/Experiment";
import { NormalizedObject } from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export interface NotesAction extends AnyAction {
  payload: {
    experimentId: number;
    data: NormalizedObject<ExperimentNote>
  };
}

interface State {
  [key: number]: NormalizedObject<ExperimentNote>;
  isFetching: boolean;
  error?: boolean;
}

export const ActionTypes = {
  LOAD_NOTES: typeGenerator(moduleNames.store, "LOAD_NOTES")
};

const initialState: State = {
  isFetching: false
};

const actionHandler = {
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Pending}`]: (
    state: State
  ) => ({
    ...state,
    isFetching: true
  }),
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Fulfilled}`]: (
    state: State,
    action: NotesAction
  ) => ({
    ...state,
    [action.payload.experimentId]: action.payload.data,
    isFetching: false
  }),
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Rejected}`]: (
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
