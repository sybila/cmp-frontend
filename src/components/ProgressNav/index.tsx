import React from "react";

const ProgressNav = () => {
  return (
    <>
      <div className="field has-addons">
        <p className="control">
          <button className="button">
            <span>Experiment info</span>
          </button>
        </p>
        <p className="control">
          <button className="button">
            <span>Protocol</span>
          </button>
        </p>
        <p className="control">
          <button className="button">
            <span>Import data</span>
          </button>
        </p>
      </div>
    </>
  );
};

export default ProgressNav;
