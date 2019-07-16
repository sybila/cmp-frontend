import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles/general.scss";
import LoginPage from "./pages/LoginPage/";

// TOOD: Interceptor checking localStorage for token

class Application extends React.Component<any> {
  render() {
    return (
      <Router>
        <Route path="/" component={LoginPage} />
      </Router>
    );
  }
}

export default Application;
