import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginPage from "./pages/LoginPage/";

class Application extends React.Component<any> {
  render() {
    return (
      <Router>
        <div>
          <Link to="/login">Log in</Link>
        </div>

        <Route path="/login" component={LoginPage} />
      </Router>
    );
  }
}

export default Application;
