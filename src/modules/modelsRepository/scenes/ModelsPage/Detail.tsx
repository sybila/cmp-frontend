import React from "react";
import { Link } from "react-router-dom";

import { moduleNames as modelsNames } from "../../reducers/MainReducer";
import { Model } from "models/Model";

interface Props {
  model?: Model;
}

const Detail = (props: Props) => {
  const { model } = props;

  return model ? (
    <>
      <h3 className="title is-3">{model.name}</h3>
      <table className="table">
        <tbody>
          <tr>
            <th>Status</th>
            <td>{model.status}</td>
          </tr>
        </tbody>
      </table>
      <p>{model.description}</p>
      <Link
        to={`/${modelsNames.url}/repository/detail/${model.id}`}
        className="button is-primary m-t-20"
      >
        View detail
      </Link>
    </>
  ) : (
    <>
      <h3 className="title is-3">Select a model please.</h3>
    </>
  );
};

export default Detail;
