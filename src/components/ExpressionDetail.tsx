import React from "react";
import { Box, Flex, Text } from "rebass";
import LatexRenderer, { LatexWithExpand, LatexWrapper } from "./LatexRenderer";
import {
  Table,
  TableDataCell,
  TableRow,
  TableSection,
} from "./primitives/Table";
import { ExpressionDetail as ExpressionDetailType } from "../models/Model";
import { Expression } from "../models/GenericTypes";

type Props = {
  name: string;
  expression: Expression<ExpressionDetailType>;
};

const ExpressionDetail = ({ expression, name }: Props) => {
  return (
    <Flex mb={4} flexDirection="column">
      <Box mb={16}>
        <LatexWrapper fullwidth>
          <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
            {name}
          </p>
          {Object.keys(expression.detail.components.functionDefinitions)
            .length ? (
            <LatexWithExpand expanded={expression.detail.expandedLatex}>
              {expression.latex}
            </LatexWithExpand>
          ) : (
            <LatexRenderer>{expression.latex}</LatexRenderer>
          )}
        </LatexWrapper>
      </Box>
      <Box mb={16}>
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
            {Object.keys(expression.detail.components.parametes).map(
              (parameterKey) => {
                const parameter =
                  expression.detail.components.parametes[parameterKey];
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
      <Box mb={16}>
        <Text fontWeight="bold" mb={2}>
          Compartments
        </Text>
        <Table>
          <TableSection as="thead">
            <TableRow>
              <TableDataCell as="th">Alias</TableDataCell>
              <TableDataCell as="th">Size</TableDataCell>
            </TableRow>
          </TableSection>
          <TableSection as="tbody">
            {Object.keys(expression.detail.components.compartments).map(
              (key) => {
                const item = expression.detail.components.compartments[key];
                return (
                  <TableRow>
                    <TableDataCell>{item.alias}</TableDataCell>
                    <TableDataCell>{item.size}</TableDataCell>
                  </TableRow>
                );
              }
            )}
          </TableSection>
        </Table>
      </Box>
      <Box mb={16}>
        <Text fontWeight="bold" mb={2}>
          Species
        </Text>
        <Table>
          <TableSection as="thead">
            <TableRow>
              <TableDataCell as="th">Alias</TableDataCell>
              <TableDataCell as="th">Size</TableDataCell>
            </TableRow>
          </TableSection>
          <TableSection as="tbody">
            {Object.keys(expression.detail.components.species).map((key) => {
              const item = expression.detail.components.species[key];
              return (
                <TableRow>
                  <TableDataCell>{item.alias}</TableDataCell>
                  <TableDataCell>{item["initial amount"]}</TableDataCell>
                </TableRow>
              );
            })}
          </TableSection>
        </Table>
      </Box>
    </Flex>
  );
};

export default ExpressionDetail;
