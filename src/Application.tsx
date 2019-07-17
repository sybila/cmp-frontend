import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/general.scss";
import LoginPage from "./pages/LoginPage/";
import Loader from "./components/Loader";

export const history = createBrowserHistory();

// TOOD: Interceptor checking localStorage for token

class Application extends React.Component<any> {
  render() {
    return (
      <Router>
        <Loader />
        <Route path="/" component={LoginPage} />
      </Router>
    );
  }
}

export default Application;
