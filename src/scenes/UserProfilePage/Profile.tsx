import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import { UserModel } from "models/User";
import Modal from "components/Modal";
import validation from "utils/formValidators";
import api from "services/api";

interface Props {
  user: UserModel;
}

const Profile = (props) => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [apiError, setApiError] = useState("");
  const { user } = props;

  const handleSubmitClick = (payload) => {
    return api.users.changeMail(payload).then(
      () => {
        setChangeEmail(false);
      },
      (error) => {
        if (error.response) {
          const { message } = error.response.data;
          setApiError(message ? message : "Submission error has occured.");
        } else {
          setApiError("Submission error has occured.");
        }
      }
    );
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div className="row profile-details">
        <div className="col-md-6">
          <p className="detail-row">
            <strong className="detail-row__name">Username:</strong>{" "}
            <span>{user.username}</span>
          </p>
          <p className="detail-row">
            <strong className="detail-row__name">First name:</strong>{" "}
            <span>{user.name}</span>
          </p>
          <p className="detail-row">
            <strong className="detail-row__name">Last name:</strong>{" "}
            <span>{user.surname}</span>
          </p>
          <p className="detail-row">
            <strong className="detail-row__name">E-mail:</strong>
            <span>{user.email} </span>
            <button
              onClick={() => setChangeEmail(true)}
              className="button is-small"
            >
              Change
            </button>
          </p>
          <p className="detail-row">
            <strong className="detail-row__name">User level:</strong>{" "}
            <span>{user.type.name}</span>
          </p>
          {user.about && (
            <div className={"mt-4"}>
              <h6>About</h6>-<p>{user.about}</p>
            </div>
          )}
        </div>
      </div>
      <Form
        onSubmit={handleSubmitClick}
        render={({ handleSubmit, submitting, pristine }) => (
          <Modal
            title="Change e-mail"
            isOpen={changeEmail}
            actions={
              <>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="button is-success"
                >
                  Submit
                </button>
              </>
            }
            close={() => setChangeEmail(false)}
          >
            <form>
              <Field name="email" validate={validation.basic.required}>
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

              {props.error && (
                <article className="message is-danger mt-4">
                  <div className="message-body" role="alert">
                    {props.error}
                  </div>
                </article>
              )}

              {apiError && (
                <article className="message is-danger mt-4">
                  <div className="message-body" role="alert">
                    {apiError}
                  </div>
                </article>
              )}
            </form>
          </Modal>
        )}
      />
    </div>
  );
};

export default Profile;
