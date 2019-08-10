import { Action } from "redux";
import { ActionType } from "redux-promise-middleware";

import { UserModel } from "../models/User";

export interface LoginAction extends Action {
  user?: UserModel;
  error?: string;
}

interface UserState {
  user: UserModel;
  error: string;
  loggingIn: boolean;
}

export const ActionTypes = {
  LOGIN: "@@app/LOGIN",
  LOGOUT: "@@app/LOGOUT",
  TOKEN_LOGIN: "@@app/TOKEN_LOGIN"
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
    case `${ActionTypes.LOGIN}_${ActionType.Pending}`:
      return {
        ...state,
        loggingIn: true
      };
    case `${ActionTypes.LOGIN}_${ActionType.Fulfilled}`:
      return {
        ...state,
        user: action.user,
        loggingIn: false
      };
    case `${ActionTypes.LOGIN}_${ActionType.Rejected}`:
      return {
        ...state,
        error: action.error,
        loggingIn: false
      };
    case `${ActionTypes.TOKEN_LOGIN}_${ActionType.Pending}`:
      return {
        ...state,
        loggingIn: true
      };
    case `${ActionTypes.TOKEN_LOGIN}_${ActionType.Fulfilled}`:
      return {
        ...state,
        user: action.user,
        loggingIn: false
      };
    case `${ActionTypes.TOKEN_LOGIN}_${ActionType.Rejected}`:
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
