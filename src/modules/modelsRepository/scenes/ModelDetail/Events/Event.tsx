import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box, Flex, Text } from "rebass/styled-components";
import api from "../../../services";
import {
  Table,
  TableDataCell,
  TableRow,
  TableSection,
} from "components/primitives/Table";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import DetailTableRow from "../../../components/DetailTableRow";
import { intToBoolean } from "services/dataTransform";
import { Tiles } from "@rebass/layout";
import {
  EquationsWrapper,
  EquationComponent,
} from "../../../components/RuleComponent";
import LatexRenderer, { LatexWrapper } from "components/LatexRenderer";
import ExpressionDetail from "components/ExpressionDetail";

const Event = () => {
  const {
    params: { modelId, eventId },
  } =
    useRouteMatch<{
      modelId: string;
      eventId: string;
    }>();

  const [detail] = useApi(
    useCallback(
      () => api.loadEventDetail(parseInt(modelId, 10), parseInt(eventId, 10)),
      [modelId, eventId]
    )
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/events/${eventId}`}
      >
        {detail ? detail.alias : "Event"}
      </BreadcrumbsItem>
      {detail && (
        <DetailSection title={detail.alias}>
          {detail.notes && (
            <p dangerouslySetInnerHTML={{ __html: detail.notes }} />
          )}
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Details
              </Text>
              <Table>
                <TableSection>
                  <DetailTableRow name="Alias" value={detail.alias} />
                  <DetailTableRow name="SBO term" value={detail.sboTerm} />

                  <DetailTableRow
                    name="Evaluate on trigger"
                    value={intToBoolean(detail.evaluateOnTrigger).toString()}
                  />
                    {detail.trigger && (
                        <ExpressionDetail
                            expression={detail.trigger}
                            name={`Trigger`}
                        />
                    )}
                </TableSection>
              </Table>
            </Box>
            <Box>
              {detail.delay && detail.delay.latex && (
                <EquationsWrapper>
                  <EquationComponent name="Delay" latex={detail.delay.latex} />
                </EquationsWrapper>
              )}
              {detail.eventAssignments &&
              detail.eventAssignments.map(function (ass) {
                return <ExpressionDetail
                    expression={ass.formula}
                    name={`Event assignment - ${ass.variableType} - ${ass.variable}`}
                />
              })}
              {detail.priority && detail.priority.latex && (
                <EquationsWrapper>
                  <EquationComponent name="Delay" latex={detail.delay.latex} />
                </EquationsWrapper>
              )}
            </Box>
          </Tiles>
          <Disclosure
            caption="Annotations"
            noContent="This item has no annotations."
          >
            {detail.annotations?.map((annotation) => {
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

export default Event;
