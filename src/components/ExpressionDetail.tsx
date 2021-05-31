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

type DetailsTableProps = {
  name: string;
  valueCaption: string;
  valueAccessor: string;
  detail: Record<string, any>;
};

const DetailsTable = ({
  name,
  valueCaption,
  valueAccessor,
  detail,
}: DetailsTableProps) => {
  const keys = Object.keys(detail);

  if (!keys.length) return null;

  return (
    <Box mb={16}>
      <Text fontWeight="bold" mb={2}>
        {name}
      </Text>
      <Table>
        <TableSection as="thead">
          <TableRow>
            <TableDataCell as="th">Alias</TableDataCell>
            <TableDataCell as="th">{valueCaption}</TableDataCell>
          </TableRow>
        </TableSection>
        <TableSection as="tbody">
          {keys.map((key) => {
            const parameter = detail[key];
            return (
              <TableRow>
                <TableDataCell>{parameter.alias}</TableDataCell>
                <TableDataCell>{parameter[valueAccessor]}</TableDataCell>
              </TableRow>
            );
          })}
        </TableSection>
      </Table>
    </Box>
  );
};

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
      <DetailsTable
        name="Parameters"
        valueAccessor="value"
        valueCaption="Value"
        detail={expression.detail.components.parametes}
      />
      <DetailsTable
        name="Compartments"
        valueAccessor="size"
        valueCaption="Size"
        detail={expression.detail.components.compartments}
      />
      <DetailsTable
        name="Species"
        valueAccessor="initial amount"
        valueCaption="Size"
        detail={expression.detail.components.species}
      />
    </Flex>
  );
};

export default ExpressionDetail;
