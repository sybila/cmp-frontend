import React, { useEffect } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Visualizer from "cmp-visualizer";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { useParams } from "react-router-dom";
import service from "modules/experimentsRepository/services";

interface RouteParams {
  experimentId: string;
}

const ExperimentChartPage = () => {
  const params = useParams<RouteParams>();

  useEffect(() => {
    params.experimentId &&
      service.fetchExperimentVisualizerData(params.experimentId);
  }, [params.experimentId]);

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
                  inputData={{}}
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
