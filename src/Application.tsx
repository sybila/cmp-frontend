import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/general.scss";

import LoginPage from "./scenes/LoginPage/";
import HomePage from "./scenes/HomePage/";
import NotFoundPage from "./scenes/NotFoundPage/";
import UserProfilePage from "./scenes/UserProfilePage";

import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import PrivateComponent from "./components/PrivateComponent";
import Portal from "./Portal";
import NotificationsProvider from "./components/NotificationsProvider";
import Toolbar from "./components/Toolbar";
import Inbox from "./components/Inbox";
import { intercept } from "./interceptors/inlineInterceptor";
import { getUser } from "./selectors/userSelectors";
import { tokenLogin, login } from "./actions/userActions";
import dataService from "./services/dataService";

import TopMenu from "./components/TopMenu";

/**
 * Master Page
 *
 * Application layout/logic component. Pages that
 * doesn't inherit layout should be defined by
 * themselves.
 */

const WrapperSwitch = (props: any) => {
  return (
    <Switch>
      <Route
        exact
        path={`/`}
        render={() => <div className="app-wrapper home">{props.children}</div>}
      />
      <Route
        path={`/`}
        render={() => <div className="app-wrapper">{props.children}</div>}
      />
    </Switch>
  );
};

class MasterPage extends React.Component {
  render() {
    return (
      <div className="theme-default">
        <WrapperSwitch>
          <TopMenu />
          <div className="container mt-5">{this.props.children}</div>
        </WrapperSwitch>
      </div>
    );
  }
}

/**
 * Intecrepts Access token a logs in user if the token is valid
 */
const InterceptLogin = intercept((state, dispatch) => {
  // TEMP: User stays logged in (dev purposes)
  /*return dataService.get("/models").then(payload => {
    console.log(payload);
    dispatch<any>(login("admin", "test"));

    return true;
  });*/

  if (getUser(state)) {
    // Do something if user exists
    return true;
  }

  const token = localStorage.getItem("user");
  if (token) {
    return dispatch<any>(tokenLogin(token))
      .then(() => {
        // TODO: Optional redirect to previous location
        return true;
      })
      .catch(() => {
        return () => history.push("/login");
      });
  }

  return false;
});

export const history = createBrowserHistory();

class Application extends React.Component<any> {
  render() {
    return (
      <React.Fragment>
        {/* Interceptors */}
        <InterceptLogin />

        {/* Portal block, for components with absolute positioning */}
        <Portal>
          <PrivateComponent>
            <Inbox />
            <NotificationsProvider />
            <Toolbar />
          </PrivateComponent>
          <Loader />
        </Portal>

        {/* Application routing (with root master page defining basic layout)*/}
        <Router history={history}>
          <Route
            path="/"
            render={({ match: { url } }) => (
              <MasterPage>
                <Switch>
                  <Route exact path={`${url}`} component={HomePage} />
                  <Route path={`${url}login`} component={LoginPage} />
                  <PrivateRoute
                    path={`${url}profile/:subPage?`}
                    component={UserProfilePage}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </MasterPage>
            )}
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default Application;
