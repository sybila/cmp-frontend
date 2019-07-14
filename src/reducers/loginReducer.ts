import { Action } from "redux";

export interface LoginAction extends Action {}

export const ActionTypes = {
  LOGIN_REQUEST: "@@app/LOGIN_REQUEST",
  LOGIN_SUCCESS: "@@app/LOGIN_SUCCESS",
  LOGIN_FAILURE: "@@app/LOGIN_FAILURE"
};

const initialState = {};

const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default loginReducer;
