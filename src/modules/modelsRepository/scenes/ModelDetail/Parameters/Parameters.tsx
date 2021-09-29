import useApi, { ApiStates } from "hooks/useApi";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components/macro";

import { moduleNames } from "../../../reducers/MainReducer";
import api from "../../../services";
import { getModelById } from "modules/modelsRepository/selectors";
import Pager from "components/Pager";
import { Flex, Text } from "rebass";
import { intToBoolean } from "services/dataTransform";

const BoxLink = styled(Link)(
  ({ theme }) => css`
    :hover {
      text-decoration: none;
    }
  `
);

const Parameters = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();

  const [parameters, loadingState] = useApi.useGet(
    useCallback(() => api.loadParameters(parseInt(modelId, 10)), [modelId])
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/parameters`}
      >
        Parameters
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <Pager countOnPage={5}>
            {parameters && parameters.length
              ? parameters.map((item, i) => (
                  <BoxLink
                    to={`/${moduleNames.url}/model-detail/${modelId}/parameters/${item.id}`}
                    className="box variable-item"
                    key={`note-${i}`}
                  >
                    <Flex justifyContent="space-between" width="100%">
                      <Flex>
                        <Text fontWeight="bold">{item.alias}</Text>
                      </Flex>
                      <Flex>
                        <Text>
                          Is constant:{" "}
                          <Text fontWeight="bold" as="span">
                            {intToBoolean(item.constant).toString()}
                          </Text>
                        </Text>
                        <Text mx={2}>|</Text>
                        <Text>
                          value:{" "}
                          <Text fontWeight="bold" as="span">
                            {item.value}
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                  </BoxLink>
                ))
              : loadingState === ApiStates.REJECTED && (
                  <article className="message is-danger mt-4">
                    <div className="message-body" role="alert">
                      No parameters found for selected model.
                    </div>
                  </article>
                )}
          </Pager>
        </div>
      </section>
    </>
  );
};

export default Parameters;
