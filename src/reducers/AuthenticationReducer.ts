import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { UserModel } from "../models/User";
import { ActionTypes } from "ApplicationActionTypes";
import { reducerGenerator } from "utils/reduxGenerators";
import { AsyncAction } from "models/GenericTypes";
import { userCookies } from "services/cookies";
import { userCache } from "services/storageCache";

export interface LoginAction extends AnyAction {
  authToken?: string;
  refreshToken?: string;
  error?: string;
}

export interface UserAction extends AnyAction {
  user?: UserModel;
  error?: string;
}

interface UserState {
  user: UserModel;
  authToken: string;
  refreshToken: string;
  error: string;
}

const accessToken = userCookies.getAuthToken();
const refreshToken = userCookies.getRefreshToken();

const preloadedUser = userCache.user.get();

const initialState: UserState = {
  user: preloadedUser ? preloadedUser : null,
  error: null,
  authToken: accessToken ? accessToken : null,
  refreshToken: refreshToken ? refreshToken : null,
};

const actionHandler = {
  [`${ActionTypes.LOGIN}_${ActionType.Fulfilled}`]: (
    state: UserState,
    action: AsyncAction<LoginAction>
  ) => ({
    ...state,
    authToken: action.payload.authToken,
    refreshToken: action.payload.refreshToken,
  }),
  [`${ActionTypes.LOGIN}_${ActionType.Rejected}`]: (
    state: UserState,
    action: AsyncAction<LoginAction>
  ) => ({
    ...state,
    error: action.payload.error,
  }),
  [`${ActionTypes.SET_USER}_${ActionType.Fulfilled}`]: (
    state: UserState,
    action: AsyncAction<UserAction>
  ) => ({
    ...state,
    user: action.payload.user,
  }),
  [`${ActionTypes.SET_USER}_${ActionType.Rejected}`]: (
    state: UserState,
    action: AsyncAction<UserAction>
  ) => ({
    ...state,
    error: action.payload.error,
  }),
  [`${ActionTypes.TOKEN_LOGIN}_${ActionType.Fulfilled}`]: (
    state: UserState,
    action: AsyncAction<UserAction>
  ) => ({
    ...state,
    user: action.payload.user,
  }),
  [`${ActionTypes.TOKEN_LOGIN}_${ActionType.Rejected}`]: (
    state: UserState,
    action: AsyncAction<LoginAction>
  ) => ({
    ...state,
    error: action.payload.error,
  }),
  [`${ActionTypes.LOGOUT}`]: (state: UserState) => ({
    ...state,
    user: null,
    error: null,
    authToken: null,
    refreshToken: null,
  }),
};

const AuthenticationReducer = reducerGenerator(
  "app",
  actionHandler,
  initialState
);

export default AuthenticationReducer;
