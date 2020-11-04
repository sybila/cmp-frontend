import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Form, Field } from "react-final-form";
import validation from "utils/formValidators";
import api from "services/api";
import { useSelector } from "react-redux";
import { getUser } from "ApplicationSelectors";

const EditProfile = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useSelector(getUser);

  const handleSubmitClick = (payload) => {
    setError("");

    if (user) {
      api.users.edit(payload, user.id).then(
        () => {
          setSuccess("User info was updated.");
        },
        (err) => {
          setError(
            err &&
              err.response &&
              err.response.data &&
              err.response.data.message
              ? err.response.data.message
              : "Submission error has occured."
          );
        }
      );
    } else {
      setError("User object is not defined.");
    }
  };

  return (
    <div>
      <BreadcrumbsItem to="/profile/edit">Edit</BreadcrumbsItem>
      <h2>Edit Profile</h2>

      <div className="columns m-t-25">
        <Form
          onSubmit={handleSubmitClick}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className="column is-8">
              {/* ----- First and Last name ----- */}
              <div className={"field"}>
                <div className="field-body">
                  {/* ----- First name ----- */}

                  <Field name="firstname">
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
                  <Field name="surname">
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
                validate={validation.composeValidators(validation.basic.email)}
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
                  <Field name="username">
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
                  <Field name="password">
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

              <div className="control">
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className={"button is-primary m-t-20"}
                >
                  Edit profile
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
    </div>
  );
};

export default EditProfile;
