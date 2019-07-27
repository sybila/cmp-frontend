import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../selectors/userSelectors";
import { AppState } from "../reducers/globalReducer";

// REVIEW: May cause problems when user is authenticated and refreshes page
// because PrivateRoute is based on Redux state, which needs to by async. filled
// after intercepting request with Access Token, it will probably redirect user
// to login page even though he is authenticated
class PrivateRoute extends React.Component<any> {
  render() {
    const { component, user, ...rest } = this.props;
    const Component = component;
    return (
      <React.Fragment>
        <Route
          {...rest}
          render={props =>
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
  user: getUser(state)
});

export default connect(mapStateToProps)(PrivateRoute);
