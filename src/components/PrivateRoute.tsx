import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userCookies } from "services/cookies";

const PrivateRoute = (props: any) => {
  const { component, ...rest } = props;
  const Component = component;
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          userCookies.getAuthToken() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    </React.Fragment>
  );
};

export default PrivateRoute;
