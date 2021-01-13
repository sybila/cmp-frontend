import { useApi } from "hooks/useApi";
import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import api from "services/api";

interface Props {
  description?: string;
}

const Model = (props: Props) => {
  const match = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelInterface = getModel(parseInt(match.params.modelId, 10));
  const [author] = useApi(
    useCallback(() => api.users.getUser(model.userId), [model])
  );

  return (
    <>
      <section className="section p-b-0">
        <div className="container">
          <div className="box ">
            <p>{model.description}</p>
            <p dangerouslySetInnerHTML={{ __html: model.notes }} />
            {author && (
              <p>
                <strong>
                  Author: {author.name} {author.surname}
                </strong>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Model;
