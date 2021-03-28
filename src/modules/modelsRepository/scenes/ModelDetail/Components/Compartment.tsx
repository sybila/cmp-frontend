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
  TableBody,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import { intToBoolean } from "services/dataTransform";
import Tree, { TreeItem } from "components/Tree";
import { speciesToTreeItem } from ".";

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
          {compartment.notes && <p>{compartment.notes}</p>}
          <Tiles mb={4} columns={[1, null, 2]} gap={36}>
            <Table>
              <TableBody>
                {compartment.alias && (
                  <TableRow>
                    <TableDataCell as="th">Alias</TableDataCell>
                    <TableDataCell>{compartment.alias}</TableDataCell>
                  </TableRow>
                )}
                {compartment.id && (
                  <TableRow>
                    <TableDataCell as="th">ID</TableDataCell>
                    <TableDataCell>{compartment.id}</TableDataCell>
                  </TableRow>
                )}
                {compartment.isConstant !== null && (
                  <TableRow>
                    <TableDataCell as="th">Constant</TableDataCell>
                    <TableDataCell>
                      {intToBoolean(compartment.isConstant).toString()}
                    </TableDataCell>
                  </TableRow>
                )}
                {compartment.sboTerm && (
                  <TableRow>
                    <TableDataCell as="th">SBO term</TableDataCell>
                    <TableDataCell>{compartment.sboTerm}</TableDataCell>
                  </TableRow>
                )}
                {compartment.size !== null && (
                  <TableRow>
                    <TableDataCell as="th">Size</TableDataCell>
                    <TableDataCell>{compartment.size}</TableDataCell>
                  </TableRow>
                )}
                {compartment.spatialDimensions !== null && (
                  <TableRow>
                    <TableDataCell as="th">Spatial dimensions</TableDataCell>
                    <TableDataCell>
                      {compartment.spatialDimensions}
                    </TableDataCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
          </Tiles>
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
