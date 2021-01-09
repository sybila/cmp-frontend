import { useApi } from "hooks/useApi";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useRouteMatch } from "react-router-dom";

import { Card, List } from "components/Cards";

import { moduleNames } from "../../reducers/MainReducer";
import api from "../../services";

const Components = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-details/${modelId}/components`,
    [modelId]
  );

  const [compartmentsList] = useApi(
    useCallback(() => api.loadCompartments(parseInt(modelId, 10)), [modelId])
  );

  return (
    <>
      <BreadcrumbsItem to={url}>Components</BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <div className="box is-padding-extended">
            <div className="columns">
              <div className="column">
                <p className="subtitle is-6 is-uppercase">Compartments</p>
                <List>
                  {compartmentsList &&
                    compartmentsList.map((compartment) => (
                      <Link to={`${url}/compartment/${compartment.id}`}>
                        <Card subtitle={compartment.name} />
                      </Link>
                    ))}
                </List>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Components;
