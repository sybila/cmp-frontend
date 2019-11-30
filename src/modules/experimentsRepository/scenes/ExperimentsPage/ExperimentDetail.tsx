import React from "react";
import { ExperimentPartial } from "models/Experiment";
import moment from "moment";

interface Props {
  experiment?: ExperimentPartial;
}

const ExperimentDetail = (props: Props) => {
  const { experiment } = props;

  return (
    experiment ? <>
      <h3 className="title is-3">{experiment.name}</h3>
      <table className="table">
        <tbody>
          <tr><th>Status</th><td>{experiment.status}</td></tr>
          <tr><th>Inserted</th><td>{moment(experiment.inserted).format("YYYY/MM/DD HH:mm")}</td></tr>
          <tr><th>Started</th><td>{moment(experiment.started).format("YYYY/MM/DD HH:mm")}</td></tr>
        </tbody>
      </table>
      <p>{experiment.description}</p>
      <button className="button is-primary m-t-20">View detail</button>
    </> : <>
    <h3 className="title is-3">Select an experiment please.</h3>
    </>
  );
}

export default ExperimentDetail;