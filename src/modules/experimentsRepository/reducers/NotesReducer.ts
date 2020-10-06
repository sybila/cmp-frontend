import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { moduleNames } from "./MainReducer";
import { ExperimentNote } from "models/Experiment";
import {
  ByIdObject,
  NormalizedObject,
  ResponseError,
} from "models/GenericTypes";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export interface NotesAction extends AnyAction {
  payload: {
    experimentId: number;
    data?: NormalizedObject<ExperimentNote>;
    error: ResponseError;
  };
}

interface ExperimentNoteExtended extends ExperimentNote {
  errorMsg?: string;
}

interface State {
  [key: number]: NormalizedObject<ExperimentNoteExtended>;
  isFetching: boolean;
  errors: ByIdObject<ResponseError>;
}

export const ActionTypes = {
  LOAD_NOTES: typeGenerator(moduleNames.store, "LOAD_NOTES"),
};

const initialState: State = {
  isFetching: false,
  errors: {},
};

const actionHandler = {
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Pending}`]: (state: State) => ({
    ...state,
    isFetching: true,
  }),
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Fulfilled}`]: (
    state: State,
    action: NotesAction
  ) => ({
    ...state,
    [action.payload.experimentId]: action.payload.data,
    isFetching: false,
  }),
  [`${ActionTypes.LOAD_NOTES}_${ActionType.Rejected}`]: (
    state: State,
    action: NotesAction
  ) => ({
    ...state,
    errors: {
      ...state.errors,
      [action.payload.experimentId]: action.payload.error,
    },
    isFetching: false,
  }),
};

const NotesReducer = reducerGenerator(
  moduleNames.store,
  actionHandler,
  initialState
);

export default NotesReducer;
