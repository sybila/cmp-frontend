import React, { useEffect, useState } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import api from "services/api";

interface MatchParams {
  id?: string;
  email?: string;
}

const EmailConfirm = () => {
  const [message, setMessage] = useState("Waiting for server response");
  const { id, email } = useParams<MatchParams>();

  useEffect(() => {
    if (id && email)
      api.users.confirmEmail(email, id).then(
        ({ data: { data } }) => {
          setMessage(data[0]);
        },
        ({
          response: {
            data: { message },
          },
        }) => {
          message
            ? setMessage(message)
            : setMessage(
                "Error occured, please try again with different link."
              );
        }
      );
  }, [id, email]);

  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className={"box"}>
              <h2 className="mb-4">Email confirmation</h2>
              <p>{message}</p>
              <Link to="/login">Go to login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
