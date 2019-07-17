import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
