import React from "react";

import LoginForm from "./LoginForm";

interface Props {}

class LoginPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>Login page</h3>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
