import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "grid",
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr",
      [theme.breakpoints.down("sm")]: {
        gridRowGap: theme.spacing(1),
      },
    },
  }),
  { name: "RowGrid" }
);

export const RowGrid = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
};
