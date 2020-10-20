import React from "react";
import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { RegisterPayload } from "models/User";
import validation from "utils/formValidators";
import { Link } from "react-router-dom";

interface Props {
  submit: (payload: RegisterPayload) => void;
  error?: string;
}

const RegistrationForm = (props: Props) => (
  <div>
    <h2 className="mb-4">Sign up</h2>
    <Form
      onSubmit={props.submit}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          {/* ----- First and Last name ----- */}
          <div className={"field"}>
            <div className="field-body">
              {/* ----- First name ----- */}

              <Field name="firstname" validate={validation.basic.required}>
                {({ input, meta }) => (
                  <div className="field">
                    <label className="label">First name</label>
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

              {/* ----- Last name ----- */}
              <Field name="surname" validate={validation.basic.required}>
                {({ input, meta }) => (
                  <div className="field">
                    <label className="label">Last name</label>
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

          {/* ----- Email ----- */}
          <Field
            name="email"
            validate={validation.composeValidators(
              validation.basic.required,
              validation.basic.email
            )}
          >
            {({ input, meta }) => (
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
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
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
              </div>
            )}
          </Field>

          {/* ----- Username and password ----- */}
          <div className={"field"}>
            <div className="field-body">
              {/* ----- Username ----- */}
              <Field name="username" validate={validation.basic.required}>
                {({ input, meta }) => (
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left">
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
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                  </div>
                )}
              </Field>

              {/* ----- Password ----- */}
              <Field name="password" validate={validation.basic.required}>
                {({ input, meta }) => (
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
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
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>
                )}
              </Field>
            </div>
          </div>

          <Field name="isPublic" type="checkbox">
            {({ input }) => (
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input {...input} type="checkbox" /> Make my profile{" "}
                    <strong>public</strong>
                  </label>
                </div>
              </div>
            )}
          </Field>

          <Field
            name="termsAndConditions"
            type="checkbox"
            validate={validation.basic.required}
          >
            {({ input, meta }) => (
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input {...input} /> I agree with provided{" "}
                    <Link to="/page/terms-and-conditions">
                      terms and conditions
                    </Link>
                  </label>
                  {meta.error && meta.touched && (
                    <p className="help is-danger">{meta.error}</p>
                  )}
                </div>
              </div>
            )}
          </Field>

          <Field
            name="dataUsePolicy"
            type="checkbox"
            validate={validation.basic.required}
          >
            {({ input, meta }) => (
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input {...input} /> I agree with{" "}
                    <Link to="/page/data-use-policy">data use policy</Link>
                  </label>
                  {meta.error && meta.touched && (
                    <p className="help is-danger">{meta.error}</p>
                  )}
                </div>
              </div>
            )}
          </Field>

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

export default RegistrationForm;
