import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import validation from "utils/formValidators";
import api from "services/api";
import { useRouteMatch } from "react-router-dom";

export interface Values {
  password: string;
  username: string;
}

interface Props {
  error?: string;
}

interface RouteParams {
  email: string;
  hash: string;
}

const INITIAL_MSG = { error: "", success: "" };

const RenewalForm = (props: Props) => {
  const [{ error, success }, setMsg] = useState<{
    error?: string;
    success?: string;
  }>(INITIAL_MSG);
  const match = useRouteMatch<RouteParams>();

  const handleSubmitRenewal = (payload) => {
    setMsg(INITIAL_MSG);

    if (payload.password !== payload["password-again"]) {
      setMsg({ error: "Passwords do not match." });
      return;
    }

    api.users
      .submitRenewal(match.params.email, match.params.hash, payload.password)
      .then(
        () => {
          setMsg({ success: "Password was successfully changed." });
        },
        (err) => {
          setMsg({
            error:
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message
                ? err.response.data.message
                : "Submission error has occured.",
          });
        }
      );
  };

  return (
    <div>
      <h2 className="mb-4">Password Renewal</h2>
      <p>Change your password</p>
      <Form
        onSubmit={handleSubmitRenewal}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={"field"}>
              <div className="control">
                <Field name="password" validate={validation.basic.required}>
                  {({ input, meta }) => (
                    <div className="field">
                      <label className="label">New password</label>
                      <div className="control">
                        <input
                          {...input}
                          className={`input${
                            meta.error && meta.touched ? " is-danger" : ""
                          }`}
                          type="password"
                          placeholder="type here"
                        />
                        {meta.error && meta.touched && (
                          <p className="help is-danger">{meta.error}</p>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className={"field"}>
              <div className="control">
                <Field
                  name="password-again"
                  validate={validation.basic.required}
                >
                  {({ input, meta }) => (
                    <div className="field">
                      <label className="label">New password again</label>
                      <div className="control">
                        <input
                          {...input}
                          className={`input${
                            meta.error && meta.touched ? " is-danger" : ""
                          }`}
                          type="password"
                          placeholder="type here"
                        />
                        {meta.error && meta.touched && (
                          <p className="help is-danger">{meta.error}</p>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
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
            {error && (
              <article className="message is-danger mt-4">
                <div className="message-body" role="alert">
                  {error}
                </div>
              </article>
            )}
            {success && (
              <article className="message is-success mt-4">
                <div className="message-body" role="alert">
                  {success}
                </div>
              </article>
            )}
          </form>
        )}
      />
    </div>
  );
};

export default RenewalForm;
