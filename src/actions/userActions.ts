import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import { ActionTypes as LoginActionTypes } from "../reducers/authenticationReducer";
import userService from "../services/userServices";
import { history } from "../Application";
import { UserModel } from "../models/User";

const { LOGIN, LOGOUT, TOKEN_LOGIN } = LoginActionTypes;

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
    return userService.login(username, password).then(
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
    return { type: `${LOGIN}_${ActionType.Pending}` };
  }

  function success(user: UserModel) {
    return { type: `${LOGIN}_${ActionType.Fulfilled}`, user };
  }

  function failure(error: string) {
    return { type: `${LOGIN}_${ActionType.Rejected}`, error };
  }
}

export function logout() {
  userService.logout();
  return { type: LOGOUT };
}

export function tokenLogin(token: string) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // REVIEW: Optional refactoring based on final responses
    return userService.attemptLoginWithToken(token).then(
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
      return { type: `${TOKEN_LOGIN}_${ActionType.Pending}` };
    }

    function success(user: UserModel) {
      return { type: `${TOKEN_LOGIN}_${ActionType.Fulfilled}`, user };
    }

    function failure() {
      return { type: `${TOKEN_LOGIN}_${ActionType.Rejected}` };
    }
  };
}
