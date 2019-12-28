import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import api from "services/api";
import { history } from "./Application";
import { UserModel } from "models/User";
import { ActionTypes } from "ApplicationActionTypes";
import { userCookies } from "services/cookies";

export const addRequest = (requestName) => ({
  type: ActionTypes.ADD_REQUEST,
  requestName
})

export const showLoader = () => ({
  type: ActionTypes.SHOW_LOADER
});

export const hideLoader = (requestName = "") => ({
  type: ActionTypes.HIDE_LOADER,
  requestName
});

const mockUser = {
  id: 0,
  username: "admin",
  permissions: 0,
  email: "admin@test.com",
  about: "I like cats, that's all",
  firstName: "John",
  lastName: "Doe"
};

export const login = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypes.LOGIN,
      payload: new Promise((resolve, reject) => {
        // TEMP: Credentials for testing without API request
        if (username === "admin" && password === "test") {
          userCookies.setAuthToken("12345");
          return resolve({ authToken: "12345" });
        }

        return api.users.login(username, password).then(
          (payload: any) => resolve(payload),
          (error: any) => {
            return reject(error);
          }
        );
      })
    });
  };
};

export const setUser = () => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: ActionTypes.SET_USER,
      payload: new Promise((resolve, reject) => {
        //: TEMP: temporary
        resolve(mockUser);
      })
    });
};

export const logout = () => {
  api.users.logout();
  return { type: ActionTypes.LOGOUT };
};

export const tokenLogin = (token: string) => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: ActionTypes.TOKEN_LOGIN,
      payload: new Promise((resolve, reject) => {
        if (token === "12345") {
          return resolve({ user: mockUser});
        }
        api.users.attemptLoginWithToken(token).then(
          (user: any) => {
            return resolve(user);
          },
          (error: any) => reject(error)
        );
      })
    });
};
