import React from "react";

import clsx from "clsx";

import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import { darken, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    marginRight: theme.spacing(1),
    color: theme.palette.grey[400],
  },
  error: {
    "&:hover": {
      backgroundColor: darken(theme.palette.error.main, 0.3),
    },
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

export const Button = (props) => {
  const { loading, children, disabled, buttonStyle = undefined, ...restProps } = props;
  const classes = useStyles();

  return (
    <MuiButton
      {...restProps}
      disabled={disabled || loading}
      className={clsx({ [classes[buttonStyle]]: !!buttonStyle })}
    >
      {loading && <CircularProgress size={16} className={classes.buttonProgress} />}
      {children}
    </MuiButton>
  );
};
