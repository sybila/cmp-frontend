import { useApi } from "hooks/useApi";
import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React, { useCallback } from "react";
import { Flex, Box } from "rebass/styled-components";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import api from "services/api";
import Disclosure from "components/Disclosure";

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
          <div className="box is-padding-extended">
            <h3 className="title is-5 is-uppercase">Description</h3>
            <p>{model.description}</p>
            <h3 className="title is-5 is-uppercase">Notes</h3>
            <p dangerouslySetInnerHTML={{ __html: model.notes }} />
            {author && (
              <p>
                <strong>
                  Author: {author.name} {author.surname}
                </strong>
              </p>
            )}
            <Disclosure
              caption="Annotations"
              noContent="This item has no annotations."
            >
              {model.annotations?.map((annotation) => {
                return (
                  <Flex my={1}>
                    <Box mr={2}>{annotation.id}</Box>
                    <Box as="a" mr={2} href={annotation.link} target="_blank">
                      {annotation.link}
                    </Box>
                  </Flex>
                );
              })}
            </Disclosure>
          </div>
        </div>
      </section>
    </>
  );
};

export default Model;
