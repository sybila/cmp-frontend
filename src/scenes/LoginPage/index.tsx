import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm, { Values } from "./LoginForm";
import { login } from "ApplicationActions";
import { getAuthError } from "ApplicationSelectors";
import { history } from "../../Application";
import { Link, useLocation } from "react-router-dom";
import { useTokenLogin } from "hooks/useTokenLogin";

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage = () => {
  const location = useLocation<LocationState>();
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();
  useTokenLogin(location);

  const handleSubmitLogin = useCallback(
    async (payload: { username: string; password: string }) => {
      const from =
        location.state && location.state.from
          ? location.state.from.pathname
          : "/";

      dispatch(login(payload.username, payload.password));
      history.push(from);
    },
    [location, dispatch]
  );

  return (
    <div className="login-form section">
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className={"box"}>
              <LoginForm submitLogin={handleSubmitLogin} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
