import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: ({ align }) => ({
      display: "grid",
      gridRowGap: theme.spacing(2),
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr",
      alignItems: align,
      [theme.breakpoints.down("sm")]: {
        gridRowGap: theme.spacing(2),
        gridTemplateColumns: "1fr",
      },
    }),
  }),
  { name: "SimpleColGrid" }
);

export const SimpleColGrid = ({ children, align = "center", ...props }) => {
  const classes = useStyles({ align });

  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
};
