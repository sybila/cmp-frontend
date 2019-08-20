import { AnyAction } from "redux";

import { ActionTypes } from "ApplicationActionTypes";

const initialState = {
  show: false
};

const LoaderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        show: true
      };
    case ActionTypes.HIDE_LOADER:
      return {
        ...state,
        show: false,
        actionName: null
      };
    case ActionTypes.LOADER_NAME:
      return {
        ...state,
        actionName: action.action
      };
    default:
      return state;
  }
};

export default LoaderReducer;
