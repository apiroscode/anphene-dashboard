import React from "react";

import { Checkbox as CheckboxMui } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    colorSecondary: {
      "&.Mui-checked": {
        color: theme.palette.primary.main,
      },
    },
  }),
  { name: "Checkbox" }
);

export const Checkbox = (props) => {
  const classes = useStyles();
  return <CheckboxMui classes={{ colorSecondary: classes.colorSecondary }} {...props} />;
};
