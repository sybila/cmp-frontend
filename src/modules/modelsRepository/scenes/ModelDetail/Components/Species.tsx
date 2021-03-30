import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box, Flex } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";

const Species = () => {
  const {
    params: { modelId, compartmentId, speciesId },
  } = useRouteMatch<{
    modelId: string;
    compartmentId: string;
    speciesId: string;
  }>();

  const [species] = useApi(
    useCallback(() => api.loadSpecieDetail(modelId, compartmentId, speciesId), [
      modelId,
      compartmentId,
      speciesId,
    ])
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/components/compartment/${compartmentId}/species/${speciesId}`}
      >
        {species ? species.name : "Species"}
      </BreadcrumbsItem>
      {species && (
        <DetailSection title={species.name}>
          {species.notes && (
            <p dangerouslySetInnerHTML={{ __html: species.notes }} />
          )}
          <Disclosure
            caption="Annotations"
            noContent="This item has no annotations."
          >
            {species.annotations?.map((annotation) => {
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
        </DetailSection>
      )}
    </>
  );
};

export default Species;
