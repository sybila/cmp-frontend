import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import RegistrationForm from "./RegistrationForm";
import { AppState } from "reducers/GlobalReducer";
import { RegisterPayload } from "models/User";
import api from "services/api";
import { AxiosError, AxiosResponse } from "axios";

const isError = (e: AxiosError | AxiosResponse): e is AxiosError => {
  return (e as AxiosError).isAxiosError !== undefined;
};

const RegistrationPage = () => {
  const [successEmail, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleError = useCallback(({ response }) => {
    const message = response?.data?.message;
    setError(message ? message : "Submission error has occured.");
  }, []);

  const handleSubmit = (payload: RegisterPayload) => {
    return api.users
      .register(payload)
      .then((e: AxiosResponse<any> | AxiosError<any>) => {
        if (isError(e)) {
          handleError(e);
          console.log(e.toJSON());
        } else setSuccess(payload.email);
      }, handleError);
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
