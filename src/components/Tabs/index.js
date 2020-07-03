import React from "react";

import clsx from "clsx";

import { Tabs as MuiTabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  { name: "Tabs" }
);

export const Tabs = (props) => {
  const { className } = props;
  const classes = useStyles();

  return (
    <MuiTabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={clsx({ [classes.root]: true, [className]: !!className })}
      {...props}
    />
  );
};
