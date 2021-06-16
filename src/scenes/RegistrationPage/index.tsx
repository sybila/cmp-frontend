import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import RegistrationForm from "./RegistrationForm";
import { AppState } from "reducers/GlobalReducer";
import { RegisterPayload } from "models/User";
import api from "services/api";

const RegistrationPage = () => {
  const [successEmail, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (payload: RegisterPayload) => {
    return api.users.register(payload).then(
      () => {
        setSuccess(payload.email);
      },
      ({
        response: {
          data: { message },
        },
      }) => {
        setError(message ? message : "Submission error has occured.");
      }
    );
  };

  return (
    <div className="registration-form section">
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className={"box"}>
              {successEmail ? (
                `Your registration was complete. Please check your email (${successEmail})`
              ) : (
                <RegistrationForm submit={handleSubmit} error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
