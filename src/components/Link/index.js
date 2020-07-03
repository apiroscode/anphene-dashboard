import React from "react";

import clsx from "clsx";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    primary: {
      color: theme.palette.primary.main,
    },
    root: {
      cursor: "pointer",
      display: "inline",
    },
    secondary: {
      color: theme.palette.primary.main,
    },
    underline: {
      textDecoration: "underline",
    },
  }),
  { name: "Link" }
);

export const Link = (props) => {
  const {
    className,
    children,
    color = "primary",
    underline = false,
    onClick,
    ...linkProps
  } = props;

  const classes = useStyles(props);

  return (
    <Typography
      component="a"
      className={clsx(className, {
        [classes.root]: true,
        [classes[color]]: true,
        [classes.underline]: underline,
      })}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      {...linkProps}
    >
      {children}
    </Typography>
  );
};
