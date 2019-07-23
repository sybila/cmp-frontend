import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/general.scss";

import LoginPage from "./scenes/LoginPage/";
import HomePage from "./scenes/HomePage/";
import NotFoundPage from "./scenes/NotFoundPage/";

import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import Portal from "./Portal";
import NotificationsProvider from "./components/NotificationsProvider";

import TopMenu from "./components/TopMenu";

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
          <TopMenu />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Application;
