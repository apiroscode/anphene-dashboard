import React from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.up("lg")]: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: theme.breakpoints.width("lg"),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 3),
      },
      padding: theme.spacing(0, 1),
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      width: "100%",
    },
  }),
  {
    name: "Container",
  }
);

export const Container = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles(props);

  return <div className={clsx(classes.root, className)} {...rest} />;
};
