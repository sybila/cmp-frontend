import { AnyAction } from "redux";

export const ActionTypes = {
  SHOW_LOADER: "@@loader/SHOW_LOADER",
  HIDE_LOADER: "@@loader/HIDE_LOADER",
  LOADER_NAME: "@@loader/LOADER_NAME"
};

const initialState = {
  show: false
};

const loaderReducer = (state = initialState, action: AnyAction) => {
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

export default loaderReducer;
