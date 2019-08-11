import React from "react";
import { Form, Field } from "react-final-form";

export interface Values {
  password: string;
  username: string;
}

interface Props {
  submitLogin: (payload: Values) => void;
  error?: string;
}

const LoginForm = (props: Props) => (
  <div>
    <h2>Login</h2>
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
              placeholder="type here"
              className="form-control"
            />
          </div>
          <div className={"form-group"}>
            <label htmlFor={"password"}>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="type here"
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
