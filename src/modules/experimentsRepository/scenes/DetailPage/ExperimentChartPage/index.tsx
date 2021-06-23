import React, { useEffect, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Visualizer from "cmp-visualizer";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import service from "modules/experimentsRepository/services";
import { data as mockData } from "./data";

interface RouteParams {
  experimentId: string;
}

const ExperimentChartPage = () => {
  const [inputData, setInputData] = useState<any>({});
  const params = useParams<RouteParams>();
  const match = useRouteMatch();
  const location = useLocation<any>();

  console.log(match, location);

  useEffect(() => {
    params.experimentId &&
      service
        .fetchExperimentVisualizerData(params.experimentId)
        .then(({ data }) => {
          const { state } = location;
          if (state && state.graphset && params.experimentId === data.id)
            data.graphsets.unshift(state.graphset);
          setInputData({ ...inputData, [data.id]: data });
        });
  }, [params.experimentId]);

  const models = useMemo(() => {
    return Object.keys(inputData).map((key) => ({
      model: inputData[key].model,
      id: key,
    }));
  }, [inputData]);

  return (
    <>
      <BreadcrumbsItem to={`/${experimentsNames.url}/`}>
        View chart
      </BreadcrumbsItem>
      <section className="section">
        <div className="container">
          <div className="columns is-full-height">
            <div className="column">
              <div className="box is-full-height is-padding-extended">
                {Object.keys(inputData).length ? (
                  <Visualizer
                    inputData={inputData}
                    models={models}
                    width="75%"
                  />
                ) : (
                    <progress className="progress is-primary" max="100">
                      30%
                    </progress>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperimentChartPage;
