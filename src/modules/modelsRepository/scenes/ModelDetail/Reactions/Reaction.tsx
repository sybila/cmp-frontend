import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box, Flex } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";

const Reaction = () => {
  const {
    params: { modelId, reactionId },
    path,
  } = useRouteMatch<{ modelId: string; reactionId: string }>();
  const url = useMemo(
    () =>
      `/${moduleNames.url}/model-detail/${modelId}/reactions/reaction/${reactionId}`,
    [modelId]
  );

  const [reaction] = useApi(
    useCallback(
      () =>
        api.loadReactionDetail(parseInt(modelId, 10), parseInt(reactionId, 10)),
      [modelId, reactionId]
    )
  );

  return (
    <>
      <BreadcrumbsItem to={url}>
        {reaction ? reaction.name : "Reaction"}
      </BreadcrumbsItem>
      {reaction && (
        <DetailSection title={reaction.name}>
          {reaction.notes && (
            <p dangerouslySetInnerHTML={{ __html: reaction.notes }} />
          )}
          <Disclosure
            caption="Annotations"
            noContent="This item has no annotations."
          >
            {reaction.annotations?.map((annotation) => {
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

export default Reaction;
