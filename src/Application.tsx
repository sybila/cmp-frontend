import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/general.scss";
import LoginPage from "./scenes/LoginPage/";
import HomePage from "./scenes/HomePage/";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import Portal from "./Portal";
import NotificationsProvider from "./components/NotificationsProvider";

export const history = createBrowserHistory();

class Application extends React.Component<any> {
  render() {
    return (
      <React.Fragment>
        <Portal>
          <NotificationsProvider />
        </Portal>
        <Loader />

        <Router history={history}>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Router>
      </React.Fragment>
    );
  }
}

export default Application;
