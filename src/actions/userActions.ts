import { Dispatch } from "redux";

import { ActionTypes as LoginActionTypes } from "../reducers/authenticationReducer";
import userService from "../services/userServices";
import { history } from "../Application";
import { UserModel } from "../models/User";

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} = LoginActionTypes;

export function login(username: String, password: String) {
  return (dispatch: Dispatch) => {
    dispatch(request({ username }));

    // TEMP: Credentials for testing without API request
    if (username === "admin" && password === "test") {
      dispatch(success({ username }));
      localStorage.setItem("user", JSON.stringify("12345"));
      history.push("/");
      return;
    }

    // REVIEW: Optional refactoring based on final responses
    userService.login(username, password).then(
      (user: any) => {
        dispatch(success(user));
        history.push("/");
        // TODO: Redirect user somewhere, '/' most likely
      },
      (error: any) => {
        dispatch(failure("Error: Incorrect username or password."));
        // TODO: Alert here or any other kind of handling
      }
    );
  };

  function request(user: UserModel) {
    return { type: LOGIN_REQUEST, user };
  }

  function success(user: UserModel) {
    return { type: LOGIN_SUCCESS, user };
  }

  function failure(error: String) {
    return { type: LOGIN_FAILURE, error };
  }
}

export function logout() {
  userService.logout();
  return { type: LOGOUT };
}
