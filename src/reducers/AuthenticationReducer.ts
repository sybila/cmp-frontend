import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { UserModel } from "../models/User";
import { ActionTypes } from "ApplicationActionTypes";
import { reducerGenerator } from "utils/reduxGenerators";
import { AsyncAction } from "models/GenericTypes";

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

const initialState: UserState = {
  user: null,
  error: null,
  authToken: null,
  refreshToken: null,
};

const actionHandler = {
  [`${ActionTypes.LOGIN}_${ActionType.Fulfilled}`]: (state: UserState, action: AsyncAction<LoginAction>) => ({
    ...state,
    authToken: action.payload.authToken,
    refreshToken: action.payload.refreshToken
  }),
  [`${ActionTypes.LOGIN}_${ActionType.Rejected}`]: (state: UserState, action: AsyncAction<LoginAction>) => ({
    ...state,
    error: action.payload.error
  }),
  [`${ActionTypes.SET_USER}_${ActionType.Fulfilled}`]: (state: UserState, action: AsyncAction<UserAction>) => ({
    ...state,
    user: action.payload.user
  }),
  [`${ActionTypes.SET_USER}_${ActionType.Rejected}`]: (state: UserState, action: AsyncAction<UserAction>) => ({
    ...state,
    error: action.payload.error
  }),
  [`${ActionTypes.TOKEN_LOGIN}_${ActionType.Fulfilled}`]: (state: UserState, action: AsyncAction<UserAction>) => ({
    ...state,
    user: action.payload.user
  }),
  [`${ActionTypes.TOKEN_LOGIN}_${ActionType.Rejected}`]: (state: UserState, action: AsyncAction<LoginAction>) => ({
    ...state,
    error: action.payload.error
  }),
  [`${ActionTypes.LOGOUT}`]: (state: UserState) => ({
    ...state,
    user: {},
    error: null,
    authToken: null,
    refreshToken: null,
  })
}

const AuthenticationReducer = reducerGenerator(
  "app",
  actionHandler,
  initialState
)

export default AuthenticationReducer;
