import { useApi } from "hooks/useApi";
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
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Details
              </Text>
              <Table>
                <TableSection>
                  <DetailTableRow name="Alias" value={species.alias} />
                  <DetailTableRow name="ID" value={species.id} />
                  <DetailTableRow name="SBO term" value={species.sboTerm} />
                  <DetailTableRow
                    name="Boundary condition"
                    value={species.boundaryCondition}
                  />
                  <DetailTableRow
                    name="Constant"
                    value={intToBoolean(species.constant).toString()}
                  />
                  <DetailTableRow
                    name="Has only substance units"
                    value={intToBoolean(
                      species.hasOnlySubstanceUnits
                    ).toString()}
                  />
                  <DetailTableRow
                    name="Initial expression"
                    value={species.initialExpression}
                  />
                </TableSection>
              </Table>
            </Box>
          </Tiles>
          {species.rules && species.rules.length ? (
            <EquationsWrapper>
              {species.rules.map((rule) => (
                <RuleComponent key={`rule-${rule.id}`} rule={rule} />
              ))}
            </EquationsWrapper>
          ) : (
            ""
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
