import React from "react";

import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MoonIcon from "@/components/icons/Moon";
import SunIcon from "@/components/icons/Sun";

const useStyles = makeStyles(
  (theme) => ({
    checked: {
      "& svg": {
        background: theme.palette.primary.main,
        color: theme.palette.background.paper,
      },
    },
    colorPrimary: {},
    root: {
      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
      },
      marginRight: theme.spacing(2),
      "& svg": {
        background: theme.palette.primary.main,
        borderRadius: "100%",
        height: 20,
        width: 20,
      },
    },
    track: {
      "$colorPrimary$checked + &": {
        backgroundColor: theme.palette.background.paper,
      },
    },
  }),
  {
    name: "HeaderThemeSwitch",
  }
);

export const HeaderThemeSwitch = (props) => {
  const classes = useStyles(props);

  return (
    <Switch
      {...props}
      classes={classes}
      color="primary"
      icon={<SunIcon />}
      checkedIcon={<MoonIcon />}
    />
  );
};
