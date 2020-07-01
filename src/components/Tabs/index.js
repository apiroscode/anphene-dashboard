import React from "react";

import { Tabs as MuiTabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const Tabs = (props) => {
  const classes = useStyles();

  return (
    <MuiTabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.root}
      {...props}
    />
  );
};
