import { TableDataCell, TableRow } from "components/primitives/Table";
import React from "react";

type Props = {
  value: unknown;
  name: string;
};

const DetailTableRow = ({ value, name }: Props) => {
  return value !== null ? (
    <TableRow>
      <TableDataCell as="th">{name}</TableDataCell>
      <TableDataCell>{value}</TableDataCell>
    </TableRow>
  ) : null;
};

export default DetailTableRow;
