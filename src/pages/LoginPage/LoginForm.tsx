import React from "react";
import { Form, Field } from "react-final-form";

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = (values: any) => {
  sleep(300);
  window.alert(JSON.stringify(values));
};

const LoginForm = () => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label>Password</label>
          <Field
            name="password"
            component="input"
            type="text"
            placeholder="Password"
          />
        </div>
        <div className="buttons">
          <button type="submit" disabled={submitting || pristine}>
            Submit
          </button>
          <button
            type="button"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values)}</pre>
      </form>
    )}
  />
);

export default LoginForm;
