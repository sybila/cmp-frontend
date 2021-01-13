import { useApi } from "hooks/useApi";
import { ModelDetail } from "models/Model";
import React, { useCallback, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import { Card, List } from "components/Cards";

import { moduleNames } from "../../reducers/MainReducer";
import api from "../../services";
import { getModelById } from "modules/modelsRepository/selectors";

const Parameters = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelDetail = getModel(parseInt(modelId, 10));

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/parameters`}
      >
        Parameters
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <div className="box is-padding-extended">
            {model &&
              (model.parameters.length ? (
                <List>
                  {model.parameters.map((compartment) => (
                    <Card headerTitle={compartment.name}></Card>
                  ))}
                </List>
              ) : (
                <article className="message is-danger mt-4">
                  <div className="message-body" role="alert">
                    No parameters found for selected model.
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Parameters;
