import React from "react";
import RenewalForm from "./RenewalForm";

const RenewalPage = () => {
  return (
    <div className="login-form section">
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className={"box"}>
              <RenewalForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalPage;
