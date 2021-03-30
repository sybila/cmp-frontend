import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box, Flex } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import LatexRenderer, { LatexWrapper } from "components/LatexRenderer";
import styled, { css } from "styled-components";
import { rem } from "polished";
import { makeReactionEquation } from "modules/modelsRepository/helpers";
import { intToBoolean } from "services/dataTransform";

const EquationsWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    margin-bottom: ${rem(theme.custom.sizes["size-4"])};

    ${LatexWrapper} {
      margin-right: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

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

  const reactionEquation = useMemo(
    () =>
      reaction
        ? makeReactionEquation(
            reaction.reactionItems,
            intToBoolean(reaction.isReversible)
          )
        : "",
    [reaction]
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

          <EquationsWrapper>
            <LatexWrapper>
              <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
                Kinetic law
              </p>
              <LatexRenderer>{reaction.rate.latex}</LatexRenderer>
            </LatexWrapper>

            <LatexWrapper>
              <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
                Reaction
              </p>
              <LatexRenderer>{reactionEquation}</LatexRenderer>
            </LatexWrapper>
          </EquationsWrapper>

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
