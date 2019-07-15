import { Action, AnyAction } from "redux";

export interface LoginAction extends Action {
  token: string;
}

export const ActionTypes = {
  LOGIN_REQUEST: "@@app/LOGIN_REQUEST",
  LOGIN_SUCCESS: "@@app/LOGIN_SUCCESS",
  LOGIN_FAILURE: "@@app/LOGIN_FAILURE",
  LOGOUT: "@@app/LOGOUT"
};

let user = JSON.parse(localStorage.getItem("user") as string);

const initialState = user ? { loggedIn: true, user } : {};

const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.token
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.token
      };
    case ActionTypes.LOGIN_FAILURE:
      return {};
    case ActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginReducer;
