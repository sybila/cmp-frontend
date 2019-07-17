import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/general.scss";
import LoginPage from "./pages/LoginPage/";
import HomePage from "./pages/HomePage/";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";

export const history = createBrowserHistory();

// TODO: Interceptor checking localStorage for token
// TODO: PrivateRoute nesting
class Application extends React.Component<any> {
  render() {
    return (
      <Router history={history}>
        <Loader />

        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    );
  }
}

export default Application;
