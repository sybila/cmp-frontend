import { Dispatch } from "redux";

import { ActionTypes as LoginActionTypes } from "../reducers/authenticationReducer";
import userService from "../services/userServices";
import { history } from "../Application";
import { UserModel } from "../models/User";

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TOKEN_LOGIN_REQUEST,
  TOKEN_LOGIN_SUCCESS,
  TOKEN_LOGIN_FAILURE
} = LoginActionTypes;

export function login(username: string, password: string) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // TEMP: Credentials for testing without API request
    if (username === "admin" && password === "test") {
      dispatch(
        success({
          id: 0,
          username,
          permissions: 0,
          email: "admin@test.com",
          about: "I like cats, that's all"
        })
      );
      localStorage.setItem("user", JSON.stringify("12345"));
      history.goBack();
      return;
    }

    // REVIEW: Optional refactoring based on final responses
    return userService.login(username, password).then(
      (user: any) => {
        dispatch(success(user));
        // TODO: Forward back to previous location
        // history.push("/");
        return user;
      },
      (error: any) => {
        dispatch(failure("Error: Incorrect username or password."));
        return Promise.reject(error);
      }
    );
  };

  function request() {
    return { type: LOGIN_REQUEST };
  }

  function success(user: UserModel) {
    return { type: LOGIN_SUCCESS, user };
  }

  function failure(error: string) {
    return { type: LOGIN_FAILURE, error };
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
      return { type: TOKEN_LOGIN_REQUEST };
    }

    function success(user: UserModel) {
      return { type: TOKEN_LOGIN_SUCCESS, user };
    }

    function failure() {
      return { type: TOKEN_LOGIN_FAILURE };
    }
  };
}
