import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Flex, Text } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import LatexRenderer, {
  LatexWithExpand,
  LatexWrapper,
} from "components/LatexRenderer";
import {
  Table,
  TableDataCell,
  TableRow,
  TableSection,
} from "components/primitives/Table";
import styled, { css } from "styled-components";
import { rem } from "polished";
import {
  makeReactionEquation,
  reactionItemToTreeItem,
} from "modules/modelsRepository/helpers";
import { intToBoolean } from "services/dataTransform";
import { Tiles } from "@rebass/layout";
import Tree from "components/Tree";
import DetailTableRow from "../../../components/DetailTableRow";

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
  const history = useHistory();

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

  const reactionItemsTree = useMemo(
    () =>
      reaction
        ? reaction.reactionItems.map((comp) => reactionItemToTreeItem(comp))
        : [],
    [reaction]
  );

  const handleNodeClick = useCallback(
    (id: number) => {
      history.push(`${url}/reactionItem/${id}`);
    },
    [history]
  );

  return (
    <>
      <BreadcrumbsItem to={url}>
        {reaction ? reaction.name : "Reaction"}
      </BreadcrumbsItem>
      {reaction && (
        <DetailSection title={reaction.name}>
          <Tiles mb={4} columns={[1, null, 1]} gap={36}>
            <Box>
              <LatexWrapper fullwidth>
                <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
                  Reaction
                </p>
                <LatexRenderer>{reactionEquation}</LatexRenderer>
              </LatexWrapper>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Reaction items
              </Text>
              <Tree data={reactionItemsTree} onNodeClick={handleNodeClick} />
            </Box>
          </Tiles>
          <Tiles mb={4} columns={[1, null, 1]} gap={36}>
            <Box>
              <LatexWrapper fullwidth>
                <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
                  Kinetic law
                </p>
                {Object.keys(
                  reaction.rate.detail.components.functionDefinitions
                ).length ? (
                  <LatexWithExpand
                    expanded={reaction.rate.detail.expandedLatex}
                  >
                    {reaction.rate.latex}
                  </LatexWithExpand>
                ) : (
                  <LatexRenderer>{reaction.rate.latex}</LatexRenderer>
                )}
              </LatexWrapper>
            </Box>
            <Tiles mb={4} columns={[1, null, 2]} gap={36}>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Parameters
                </Text>
                <Table>
                  <TableSection as="thead">
                    <TableRow>
                      <TableDataCell as="th">Alias</TableDataCell>
                      <TableDataCell as="th">Value</TableDataCell>
                    </TableRow>
                  </TableSection>
                  <TableSection as="tbody">
                    {Object.keys(reaction.rate.detail.components.parametes).map(
                      (parameterKey) => {
                        const parameter =
                          reaction.rate.detail.components.parametes[
                            parameterKey
                          ];
                        return (
                          <TableRow>
                            <TableDataCell>{parameter.alias}</TableDataCell>
                            <TableDataCell>{parameter.value}</TableDataCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableSection>
                </Table>
              </Box>
            </Tiles>
          </Tiles>

          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Details
              </Text>
              <Table>
                <TableSection>
                  <DetailTableRow name="Alias" value={reaction.alias} />
                  <DetailTableRow name="ID" value={reaction.id} />
                  <DetailTableRow name="Model ID" value={reaction.modelId} />
                  <DetailTableRow
                    name="Compartment ID"
                    value={reaction.compartmentId}
                  />
                  <DetailTableRow name="SBO term" value={reaction.sboTerm} />
                  <DetailTableRow
                    name="Reversible"
                    value={intToBoolean(reaction.isReversible).toString()}
                  />
                </TableSection>
              </Table>
            </Box>
            {reaction.notes && (
              <Box mb={6}>
                <p dangerouslySetInnerHTML={{ __html: reaction.notes }} />
              </Box>
            )}
          </Tiles>

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
