import { Action } from "redux";

export interface LoginAction extends Action {
  user: Object;
  error?: String;
}

export const ActionTypes = {
  LOGIN_REQUEST: "@@app/LOGIN_REQUEST",
  LOGIN_SUCCESS: "@@app/LOGIN_SUCCESS",
  LOGIN_FAILURE: "@@app/LOGIN_FAILURE",
  LOGOUT: "@@app/LOGOUT"
};

let token = JSON.parse(localStorage.getItem("user") as string);

const initialState = {};

const authenticationReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        user: action.user
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case ActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authenticationReducer;
