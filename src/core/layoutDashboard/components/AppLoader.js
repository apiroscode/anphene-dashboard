import React from "react";

import { useStoreState } from "easy-peasy";

import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { appLoaderHeight } from "./consts";

const useStyles = makeStyles(
  (theme) => ({
    appLoader: {
      height: appLoaderHeight,
      marginBottom: theme.spacing(2),
      zIndex: 1201,
    },
    appLoaderPlaceholder: {
      height: appLoaderHeight,
      marginBottom: theme.spacing(2),
    },
  }),
  { name: "AppLoader" }
);

export const AppLoader = () => {
  const loading = useStoreState((state) => state.app.loading);
  const classes = useStyles();

  if (loading) {
    return <LinearProgress className={classes.appLoader} color="primary" />;
  } else {
    return <div className={classes.appLoaderPlaceholder} />;
  }
};
