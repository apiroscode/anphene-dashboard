import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: ({ reverse }) => ({
      display: "grid",
      gridRowGap: theme.spacing(3),
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: reverse ? "4fr 9fr" : "9fr 4fr",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        gridRowGap: theme.spacing(1),
        gridTemplateColumns: "1fr",
      },
    }),
  }),
  { name: "COL_GRID" }
);

export const ColGrid = ({ children, reverse, ...props }) => {
  const classes = useStyles({ reverse });

  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
};
