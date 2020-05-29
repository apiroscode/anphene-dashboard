import React from "react";

import { SortableElement } from "react-sortable-hoc";

import { TableRow } from "@material-ui/core";

import { SortableHandle } from "./SortableHandle";

export const SortableTableRow = SortableElement(({ children, ...props }) => (
  <TableRow {...props}>
    <SortableHandle />
    {children}
  </TableRow>
));
