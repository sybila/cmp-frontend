import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import Visualizer from "../../../../../utils/visualizer";

const ExperimentChartPage = () => {
  return (
    <>
      <BreadcrumbsItem to={`/${experimentsNames.url}/repository`}>
        View chart
      </BreadcrumbsItem>
      <section className="section">
        <div className="container">
          <div className="columns is-full-height">
            <div className="column">
              <div className="box is-full-height is-padding-extended">
                <Visualizer
                  models={[{ model: true, id: "anotherModel" }]}
                  width="50%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperimentChartPage;
