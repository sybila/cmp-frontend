import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router";
import { moduleNames } from "../../reducers/MainReducer";

const Simulation = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/parameters`}
      >
        Parameters
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <div className="box is-padding-extended">Simulation</div>
        </div>
      </section>
    </>
  );
};

export default Simulation;
