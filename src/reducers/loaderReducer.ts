import { Action } from "redux";

export const ActionTypes = {
  SHOW_LOADER: "@@loader/SHOW_LOADER",
  HIDE_LOADER: "@@loader/HIDE_LOADER"
};

const initialState = {
  showLoader: false
};

const loaderReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: true
      };
    case ActionTypes.HIDE_LOADER:
      return {
        ...state,
        showLoader: false
      };
    default:
      return state;
  }
};

export default loaderReducer;
