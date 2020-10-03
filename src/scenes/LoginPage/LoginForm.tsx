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
    <h2 className="mb-4">Sign in</h2>
    <Form
      onSubmit={props.submitLogin}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div className={"field"}>
            <label htmlFor={"username"} className="label">
              Username
            </label>
            <div className="control">
              <Field
                name="username"
                component="input"
                type="text"
                placeholder="type here"
                className="input"
              />
            </div>
          </div>
          <div className={"field"}>
            <label htmlFor={"password"} className="label">
              Password
            </label>
            <div className="control">
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="type here"
                className="input"
              />
            </div>
          </div>
          <div className="control">
            <button
              type="submit"
              disabled={submitting || pristine}
              className={"button is-primary"}
            >
              Submit
            </button>
          </div>
          {props.error && (
            <article className="message is-danger mt-4">
              <div className="message-body" role="alert">
                {props.error}
              </div>
            </article>
          )}
        </form>
      )}
    />
  </div>
);

export default LoginForm;
