import React from "react";

import { SortableContainer } from "react-sortable-hoc";

import { TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const InnerSortableTableBody = SortableContainer(({ children, ...props }) => (
  <TableBody {...props}>{children}</TableBody>
));

const useStyles = makeStyles(
  (theme) => ({
    ghost: {
      "& td": {
        borderBottom: "none",
      },
      background: theme.palette.background.paper,
      fontFamily: theme.typography.fontFamily,
      opacity: 0.5,
    },
  }),
  { name: "SortableTableBody" }
);

export const SortableTableBody = (props) => {
  const classes = useStyles();

  return (
    <InnerSortableTableBody
      helperClass={classes.ghost}
      axis="y"
      lockAxis="y"
      useDragHandle
      {...props}
    />
  );
};
