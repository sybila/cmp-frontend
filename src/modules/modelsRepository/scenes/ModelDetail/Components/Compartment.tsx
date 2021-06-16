import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Tiles } from "@rebass/layout";
import { Box, Text, Flex } from "rebass/styled-components";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Disclosure from "components/Disclosure";
import {
  Table,
  TableSection,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import { intToBoolean } from "services/dataTransform";
import Tree from "components/Tree";
import { speciesToTreeItem } from "../../../helpers";
import DetailTableRow from "../../../components/DetailTableRow";
import RuleComponent, {
  EquationsWrapper,
} from "modules/modelsRepository/components/RuleComponent";

const Compartment = () => {
  const {
    params: { modelId, compartmentId },
  } = useRouteMatch<{ modelId: string; compartmentId: string }>();

  const history = useHistory();

  const [compartment] = useApi(
    useCallback(() => api.loadCompartmentDetail(modelId, compartmentId), [
      modelId,
      compartmentId,
    ])
  );

  const species = useMemo(() => compartment?.species?.map(speciesToTreeItem), [
    compartment,
  ]);

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/components/compartment/${compartmentId}`}
      >
        {compartment ? compartment.name : "Compartment"}
      </BreadcrumbsItem>
      {compartment && (
        <DetailSection title={compartment.name}>
          {compartment.notes && (
            <Box mb={6}>
              <p dangerouslySetInnerHTML={{ __html: compartment.notes }} />
            </Box>
          )}
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Details
              </Text>
              <Table>
                <TableSection>
                  <DetailTableRow name="Alias" value={compartment.alias} />
                  <DetailTableRow
                    name="Constant"
                    value={intToBoolean(compartment.isConstant).toString()}
                  />
                  <DetailTableRow name="SBO term" value={compartment.sboTerm} />
                  <DetailTableRow name="Size" value={compartment.size} />
                  <DetailTableRow
                    name="Spatial dimensions"
                    value={compartment.spatialDimensions}
                  />
                </TableSection>
              </Table>
            </Box>
            {species.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Species
                </Text>
                <Tree
                  data={species}
                  onNodeClick={(id: number) =>
                    history.push(`${compartmentId}/species/${id}`)
                  }
                />
              </Box>
            )}
          </Tiles>
          {compartment.rules && compartment.rules.length ? (
            <EquationsWrapper>
              {compartment.rules.map((rule) => (
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
            {compartment.annotations?.map((annotation) => {
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

export default Compartment;
