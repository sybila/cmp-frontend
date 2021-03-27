import React from "react";
import { Box, BoxProps } from "rebass";

/*
  Rebass doesn't support table elements yet.
  It comes with some default styling, that can be overridden in the usual ways (variant, sx, ...)
*/

export interface TableProps
  extends BoxProps,
    Omit<React.TableHTMLAttributes<HTMLTableElement>, keyof BoxProps> {}

export const Table: React.ComponentType<TableProps> = React.forwardRef(
  (props, ref) => <Box ref={ref} as="table" variant="table" {...props} />
);

export interface TableBodyProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof BoxProps> {}

export const TableBody: React.ComponentType<TableBodyProps> = React.forwardRef(
  (props, ref) => <Box ref={ref} as="tbody" variant="tbody" {...props} />
);

export interface TableRowProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLTableRowElement>, keyof BoxProps> {}

export const TableRow: React.ComponentType<TableRowProps> = React.forwardRef(
  (props, ref) => <Box ref={ref} as="tr" variant="tr" {...props} />
);

export interface TableDataCellProps
  extends BoxProps,
    Omit<React.TdHTMLAttributes<HTMLTableDataCellElement>, keyof BoxProps> {}

export const TableDataCell: React.ComponentType<TableDataCellProps> = React.forwardRef(
  (props, ref) => (
    <Box
      ref={ref}
      as="td"
      variant="td"
      {...props}
      sx={{
        borderWidth: "0 0 1px",
        borderColor: "greyLighter",
        verticalAlign: "top",
      }}
    />
  )
);
