import React from "react";

import { Table } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.up("sm")]: {
        "& table": {
          tableLayout: "fixed",
        },
      },
      "& table": {
        tableLayout: "auto",
      },
      overflowX: "auto",
      width: "100%",
    },
  }),
  {
    name: "ResponsiveTable",
  }
);

export const ResponsiveTable = (props) => {
  const { children, className } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Table className={className}>{children}</Table>
    </div>
  );
};
