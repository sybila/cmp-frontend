import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Flex, Text } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import {
  Table,
  TableSection,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import { Tiles } from "@rebass/layout";
import DetailTableRow from "../../../components/DetailTableRow";

const ReactionItem = () => {
  const {
    params: { modelId, reactionId, reactionItemId },
    path,
  } = useRouteMatch<{
    modelId: string;
    reactionId: string;
    reactionItemId: string;
  }>();
  const url = useMemo(() => `/${path}/reactionItem/${reactionItemId}`, [
    modelId,
  ]);

  const [reactionItem] = useApi(
    useCallback(
      () =>
        api.loadReactionItemDetail(
          parseInt(modelId, 10),
          parseInt(reactionId, 10),
          parseInt(reactionItemId, 10)
        ),
      [modelId, reactionId, reactionItemId]
    )
  );

  return (
    <>
      <BreadcrumbsItem to={url}>
        {reactionItem ? reactionItem.name : "Reaction item"}
      </BreadcrumbsItem>
      {reactionItem && (
        <DetailSection title={reactionItem.name}>
          {reactionItem.notes && (
            <Box mb={6}>
              <p dangerouslySetInnerHTML={{ __html: reactionItem.notes }} />
            </Box>
          )}

          <Text fontWeight="bold" mb={2}>
            Details
          </Text>
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Table>
              <TableSection>
                <DetailTableRow name="Alias" value={reactionItem.alias} />
                <DetailTableRow name="SBO term" value={reactionItem.sboTerm} />
                <DetailTableRow
                  name="Stochiometry"
                  value={reactionItem.stoichiometry}
                />
                <DetailTableRow name="Type" value={reactionItem.type} />
              </TableSection>
            </Table>
          </Tiles>
          <Disclosure
            caption="Annotations"
            noContent="This item has no annotations."
          >
            {reactionItem.annotations?.map((annotation) => {
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

export default ReactionItem;
