import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
        "& > *:first-child": {
          marginBottom: theme.spacing(2),
        },
      },
    },
    action: {
      display: "grid",
      gridGap: theme.spacing(1),
      gridAutoFlow: "column",
      [theme.breakpoints.down("sm")]: {
        gridAutoFlow: "row",
      },
    },
    title: {
      flex: 1,
      lineHeight: 1,
      fontSize: theme.spacing(3),
    },
  }),
  { name: "Header" }
);

export const Header = (props) => {
  const { title, actions } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      {actions ? <div className={classes.action}>{actions}</div> : null}
    </div>
  );
};
