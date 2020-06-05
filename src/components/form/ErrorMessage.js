import React from "react";

import { ErrorMessage as EMR } from "react-hook-form";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Alert as AlertMUI } from "@material-ui/lab";

const useStyles = makeStyles(
  (theme) => ({
    root: (props) => ({
      marginTop: props.useMarginTop ? theme.spacing(1) : 0,
      marginBottom: props.useMarginBottom ? theme.spacing(1) : 0,
    }),
  }),
  { name: "FormAlert" }
);

export const ErrorMessage = (props) => {
  const { useMarginTop = true, useMarginBottom = true } = props;
  const classes = useStyles({ useMarginTop, useMarginBottom });
  return (
    <EMR {...props}>
      {({ message }) => {
        return (
          message && (
            <AlertMUI severity="error" className={classes.root}>
              {Array.isArray(message) ? (
                message.map((item, idx) => (
                  <Typography variant="body2" color="textSecondary" key={idx}>
                    {item}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {message}
                </Typography>
              )}
            </AlertMUI>
          )
        );
      }}
    </EMR>
  );
};
