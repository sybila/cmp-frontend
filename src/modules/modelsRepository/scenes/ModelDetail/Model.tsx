import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

interface Props {
  description?: string;
}

const Model = (props: Props) => {
  const match = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelInterface = getModel(parseInt(match.params.modelId, 10));

  return (
    <>
      <section className="section p-b-0">
        <div className="container">
          <div className="box ">
            <h4 className="title is-4 m-b-10">Model</h4>
            <p>{model.notes}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Model;
