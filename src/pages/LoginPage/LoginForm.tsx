import React from "react";
import { Form, Field } from "react-final-form";

export interface Values {
  password: String;
  username: String;
}

interface Props {
  submitLogin: (payload: Values) => void;
  error?: String;
}

const LoginForm = (props: Props) => (
  <div className={"col-md-6 offset-md-3"}>
    <h3>Login</h3>
    <Form
      onSubmit={props.submitLogin}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div className={"form-group"}>
            <label htmlFor={"username"}>Username</label>
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className={"form-group"}>
            <label htmlFor={"password"}>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div className="buttons">
            <button
              type="submit"
              disabled={submitting || pristine}
              className={"btn btn-primary"}
            >
              Submit
            </button>
          </div>
          {props.error && (
            <div className="alert alert-danger user-alert" role="alert">
              {props.error}
            </div>
          )}
        </form>
      )}
    />
  </div>
);

export default LoginForm;
