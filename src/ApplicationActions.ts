import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import api from "services/api";
import { history } from "./Application";
import { UserModel } from "models/User";
import { ActionTypes } from "ApplicationActionTypes";

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

export function login(username: string, password: string) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // TEMP: Credentials for testing without API request
    if (username === "admin" && password === "test") {
      const user = {
        id: 0,
        username,
        permissions: 0,
        email: "admin@test.com",
        about: "I like cats, that's all",
        firstName: "John",
        lastName: "Doe"
      };
      dispatch(success(user));
      localStorage.setItem("user", JSON.stringify("12345"));
      return Promise.resolve(user);
    }

    // REVIEW: Optional refactoring based on final responses
    return api.users.login(username, password).then(
      (user: any) => {
        dispatch(success(user));
        return user;
      },
      (error: any) => {
        dispatch(failure("Error: Incorrect username or password."));
        return Promise.reject(error);
      }
    );
  };

  function request() {
    return { type: `${ActionTypes.LOGIN}_${ActionType.Pending}` };
  }

  function success(user: UserModel) {
    return { type: `${ActionTypes.LOGIN}_${ActionType.Fulfilled}`, user };
  }

  function failure(error: string) {
    return { type: `${ActionTypes.LOGIN}_${ActionType.Rejected}`, error };
  }
}

export function logout() {
  api.users.logout();
  return { type: ActionTypes.LOGOUT };
}

export function tokenLogin(token: string) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // REVIEW: Optional refactoring based on final responses
    return api.users.attemptLoginWithToken(token).then(
      (user: any) => {
        dispatch(success(user));
        history.push("/");
        return user;
      },
      (error: any) => {
        dispatch(failure());
        return Promise.reject(error);
      }
    );

    function request() {
      return { type: `${ActionTypes.TOKEN_LOGIN}_${ActionType.Pending}` };
    }

    function success(user: UserModel) {
      return {
        type: `${ActionTypes.TOKEN_LOGIN}_${ActionType.Fulfilled}`,
        user
      };
    }

    function failure() {
      return { type: `${ActionTypes.TOKEN_LOGIN}_${ActionType.Rejected}` };
    }
  };
}
