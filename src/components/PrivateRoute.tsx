import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "ApplicationSelectors";
import { AppState } from "reducers/GlobalReducer";

class PrivateRoute extends React.Component<any> {
  render() {
    const { component, user, ...rest } = this.props;
    const Component = component;

    return (
      <React.Fragment>
        <Route
          {...rest}
          render={(props) =>
            user ? (
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
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(PrivateRoute);
