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
import Pager from "components/Pager";

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
          {model && (
            <Pager countOnPage={5}>
              {model.parameters && model.parameters.length ? (
                model.parameters.map((item, i) => (
                  <div className="box variable-item" key={`note-${i}`}>
                    <span>{item.id} |</span>
                    <strong className="m-r-5">{item.name}</strong>
                  </div>
                ))
              ) : (
                <article className="message is-danger mt-4">
                  <div className="message-body" role="alert">
                    No parameters found for selected model.
                  </div>
                </article>
              )}
            </Pager>
          )}
        </div>
      </section>
    </>
  );
};

export default Parameters;
