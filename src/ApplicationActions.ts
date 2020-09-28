import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import api from "services/api";
import { history } from "./Application";
import { UserModel } from "models/User";
import { ActionTypes } from "ApplicationActionTypes";
import { userCookies } from "services/cookies";

export const addRequest = (requestName) => ({
  type: ActionTypes.ADD_REQUEST,
  requestName,
});

export const showLoader = () => ({
  type: ActionTypes.SHOW_LOADER,
});

export const hideLoader = (requestName = "") => ({
  type: ActionTypes.HIDE_LOADER,
  requestName,
});

const mockUser = {
  id: 0,
  username: "admin",
  permissions: {
    id: 1,
    tier: "2",
    name: "Administrator",
  },
  email: "admin@test.com",
  about: "I like cats, that's all",
  firstName: "John",
  lastName: "Doe",
};

export const login = (username: string, password: string) => {
  return (dispatch) => {
    return dispatch({
      type: ActionTypes.LOGIN,
      payload: new Promise((resolve, reject) => {
        return api.users.login(username, password).then(
          ({ data }) => {
            userCookies.setAuthToken(data.access_token);
            userCookies.setRefreshToken(data.refresh_token);
            resolve({
              authToken: data.access_token,
              refreshToken: data.refresh_token,
            });
            dispatch(setUser(mockUser));
          },
          (error) => {
            return reject(error);
          }
        );
      }),
    });
  };
};

export const setUser = (user: UserModel) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.SET_USER,
      payload: new Promise((resolve, reject) => {
        return resolve({ user });
      }),
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
        // TEMP: Remove when /user endpoint finished
        // TEMP: Add refresh token logic
        return resolve({ user: mockUser });
        // return api.users.attemptLoginWithToken(token).then(
        //   (user: any) => {
        //     return resolve(user);
        //   },
        //   (error: any) => reject(error)
        // );
      }),
    });
};
