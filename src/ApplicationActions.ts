import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import api from "services/api";
import config from "config";
import { UserModel } from "models/User";
import { ActionTypes } from "ApplicationActionTypes";
import { userCookies } from "services/cookies";
import { AxiosPromise } from "axios";
import { userCache } from "services/storageCache";
import { GlobalNoticeInterface } from "reducers/GlobalNoticeReducer";

const NOT_VERIFIED_ID = "not-verified";

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

export const login = (username: string, password: string) => {
  return (dispatch): AxiosPromise => {
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
            dispatch(fetchCurrentUser());
          },
          ({ response: { data } }) => {
            return reject({ error: data.message });
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

export const setTokens = (tokens: {
  access_token: string;
  refresh_token: string;
}) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.LOGIN,
      payload: new Promise((resolve, reject) => {
        return resolve({
          authToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });
      }),
    });
};

export const logout = () => {
  userCookies.deleteAuthToken();
  userCookies.deleteRefreshToken();
  userCache.user.remove();

  return { type: ActionTypes.LOGOUT };
};

export const checkUserConfirmation = (dispatch, user) => {
  if (user) {
    if (!user.type || user.type.tier === config.permissions.UNVERIFIED) {
      dispatch(
        addGlobalNotice({
          id: NOT_VERIFIED_ID,
          message:
            "Your account has to be verified to take full advantage of registration. Please confirm your email.",
          heading: "Account is not verified",
          type: "danger",
        })
      );
    }
  } else {
    dispatch(removeGlobalNotice(NOT_VERIFIED_ID));
  }
};

export const fetchCurrentUser = () => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.TOKEN_LOGIN,
      payload: new Promise((resolve, reject) => {
        return api.users.getCurrentUser().then(
          ({ data: { data } }) => {
            return resolve({ user: data });
          },
          (error: any) => {
            dispatch(logout());
            reject(error);
          }
        );
      }),
    });
};

export const addGlobalNotice = (notice: GlobalNoticeInterface) => {
  return {
    type: ActionTypes.ADD_GLOBAL_NOTICE,
    payload: notice,
  };
};

export const removeGlobalNotice = (id: string | number) => {
  return {
    type: ActionTypes.REMOVE_GLOBAL_NOTICE,
    payload: { id },
  };
};
