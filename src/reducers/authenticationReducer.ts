import { Action } from "redux";
import { UserModel } from "../models/User";

export interface LoginAction extends Action {
  user: UserModel;
  error?: string;
}

interface UserState {
  user: UserModel;
  error: string;
  loggingIn: boolean;
}

export const ActionTypes = {
  LOGIN_REQUEST: "@@app/LOGIN_REQUEST",
  LOGIN_SUCCESS: "@@app/LOGIN_SUCCESS",
  LOGIN_FAILURE: "@@app/LOGIN_FAILURE",
  LOGOUT: "@@app/LOGOUT",
  TOKEN_LOGIN_REQUEST: "@@app/TOKEN_LOGIN_REQUEST",
  TOKEN_LOGIN_SUCCESS: "@@app/TOKEN_LOGIN_SUCCESS",
  TOKEN_LOGIN_FAILURE: "@@app/TOKEN_LOGIN_FAILURE"
};

const initialState: UserState = {
  user: null,
  error: null,
  loggingIn: false
};

const authenticationReducer = (
  state = initialState,
  action: LoginAction
): UserState => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggingIn: false
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loggingIn: false
      };
    case ActionTypes.TOKEN_LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case ActionTypes.TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggingIn: false
      };
    case ActionTypes.TOKEN_LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default authenticationReducer;
