import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "grid",
      gridRowGap: theme.spacing(3),
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "9fr 4fr",
      [theme.breakpoints.down("sm")]: {
        gridRowGap: theme.spacing(1),
        gridTemplateColumns: "1fr",
      },
    },
  }),
  { name: "COL_GRID" }
);

export const ColGrid = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
};
