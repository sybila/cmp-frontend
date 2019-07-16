import { AnyAction } from "redux";

export const ActionTypes = {
  SHOW_LOADER: "@@loader/SHOW_LOADER",
  HIDE_LOADER: "@@loader/HIDE_LOADER"
};

const initialState = {
  show: false
};

const loaderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        show: true,
        actionName: action.action
      };
    case ActionTypes.HIDE_LOADER:
      return {
        ...state,
        show: false,
        action: null
      };
    default:
      return state;
  }
};

export default loaderReducer;
