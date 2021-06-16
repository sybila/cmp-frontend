import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "ApplicationSelectors";
import { AppState } from "reducers/GlobalReducer";

class PublicRoute extends React.Component<any> {
  render() {
    const { fallback, user, to, path } = this.props;

    return (
      <React.Fragment>
        <Route
          path={path}
          exact
          render={(props) =>
            user ? (
              <Redirect
                to={{ pathname: to, state: { from: props.location } }}
              />
            ) : (
              <Redirect
                to={{ pathname: fallback, state: { from: props.location } }}
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

export default connect(mapStateToProps)(PublicRoute);
