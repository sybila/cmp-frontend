import { Dispatch } from "redux";

import { ActionTypes as LoginActionTypes } from "../reducers/authenticationReducer";
import userService from "../services/userServices";
import { history } from "../Application";

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = LoginActionTypes;

export function login(username: String, password: String) {
  return (dispatch: Dispatch) => {
    dispatch(request({ username }));

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

  function request(user: Object) {
    return { type: LOGIN_REQUEST, user };
  }

  function success(user: Object) {
    return { type: LOGIN_SUCCESS, user };
  }

  function failure(error: String) {
    return { type: LOGIN_FAILURE, error };
  }
}
