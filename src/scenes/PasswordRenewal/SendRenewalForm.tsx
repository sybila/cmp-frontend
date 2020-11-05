import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import validation from "utils/formValidators";
import api from "services/api";

export interface Values {
  password: string;
  username: string;
}

interface Props {}

const SendRenewalForm = (props: Props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmitRenewal = (payload) => {
    setError("");
    api.users.sendPasswordRenewal(payload.email).then(
      () => {
        setSuccess("Renewal email was sent.");
      },
      (err) => {
        setError(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Submission error has occured."
        );
      }
    );
  };

  return (
    <div>
      <h2 className="mb-4">Password Renewal</h2>
      <p>Send password renewal link to your email.</p>
      <Form
        onSubmit={handleSubmitRenewal}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={"field"}>
              <div className="control">
                <Field name="email" validate={validation.basic.email}>
                  {({ input, meta }) => (
                    <div className="field">
                      <label className="label">E-mail</label>
                      <div className="control">
                        <input
                          {...input}
                          className={`input${
                            meta.error && meta.touched ? " is-danger" : ""
                          }`}
                          type="text"
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

export default SendRenewalForm;
