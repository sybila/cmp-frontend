import useApi, { ApiStates } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box, Flex, Text } from "rebass/styled-components";
import api from "../../../services";
import { Table, TableSection } from "components/primitives/Table";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import DetailTableRow from "../../../components/DetailTableRow";
import { intToBoolean } from "services/dataTransform";
import { Tiles } from "@rebass/layout";
import RuleComponent, {
  EquationsWrapper,
} from "../../../components/RuleComponent";

const ParameterDetail = () => {
  const {
    params: { modelId, parameterId },
  } = useRouteMatch<{
    modelId: string;
    parameterId: string;
  }>();

  const [parameter, state] = useApi.useGet(
    useCallback(
      () =>
        api.loadParameterDetail(
          parseInt(modelId, 10),
          parseInt(parameterId, 10)
        ),
      [modelId, parameterId]
    )
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/parameters/${parameterId}`}
      >
        {parameter ? parameter.name : "Parameter"}
      </BreadcrumbsItem>
      {parameter && (
        <DetailSection title={parameter.name}>
          {parameter.notes && (
            <p dangerouslySetInnerHTML={{ __html: parameter.notes }} />
          )}
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Details
              </Text>
              <Table>
                <TableSection>
                  <DetailTableRow name="Alias" value={parameter.alias} />
                  <DetailTableRow name="SBO term" value={parameter.sboTerm} />
                  <DetailTableRow
                    name="Constant"
                    value={intToBoolean(parameter.constant).toString()}
                  />
                  <DetailTableRow name="Value" value={parameter.value} />
                </TableSection>
              </Table>
            </Box>
          </Tiles>
          {parameter?.rule?.expression?.latex ? (
            <EquationsWrapper>
              <RuleComponent
                rule={{
                  id: parameter.rule.id,
                  equation: parameter.rule.expression,
                }}
              />
            </EquationsWrapper>
          ) : (
            ""
          )}
          <Disclosure
            caption="Annotations"
            noContent="This item has no annotations."
          >
            {parameter.annotations?.map((annotation) => {
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
      {state === ApiStates.REJECTED && (
        <section className="section p-b-0">
          <div className="container">
            <article className="message is-danger mt-4">
              <div className="message-body" role="alert">
                Error: Failed to load parameter.
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
};

export default ParameterDetail;
