import React from "react";

import clsx from "clsx";

import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { HeaderThemeSwitch } from "./HeaderThemeSwitch";
import { HeaderUserMenu } from "./HeaderUserMenu";
import { HeaderBackMenu } from "./HeaderBackMenu";

const useStyles = makeStyles(
  (theme) => ({
    header: {
      [theme.breakpoints.down("sm")]: {
        height: 88,
        marginBottom: 0,
        alignItems: "flex-start",
      },
      display: "flex",
      height: 40,
      marginBottom: theme.spacing(3),
      alignItems: "center",
    },
    menuIcon: {
      "& span": {
        "&:nth-child(1)": {
          top: 15,
        },
        "&:nth-child(2), &:nth-child(3)": {
          top: 20,
        },
        "&:nth-child(4)": {
          top: 25,
        },
        background: theme.palette.secondary.light,
        display: "block",
        height: 1,
        left: "20%",
        opacity: 1,
        position: "absolute",
        transform: "rotate(0deg)",
        transition: ".25s ease-in-out",
        width: "60%",
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        left: 0,
      },
      background: theme.palette.background.paper,
      borderRadius: "50%",
      cursor: "pointer",
      height: 42,
      left: theme.spacing(),
      marginRight: theme.spacing(2),
      position: "relative",
      transform: "rotate(0deg)",
      transition: `${theme.transitions.duration.shorter}ms ease-in-out`,
      width: 42,
    },
    menuIconDark: {
      "& span": {
        background: theme.palette.common.white,
      },
    },
    menuIconOpen: {
      "& span": {
        "&:nth-child(1), &:nth-child(4)": {
          left: "50%",
          top: 20,
          width: 0,
        },
        "&:nth-child(2)": {
          transform: "rotate(45deg)",
        },
        "&:nth-child(3)": {
          transform: "rotate(-45deg)",
        },
      },
      left: 280,
      position: "absolute",
      zIndex: 1999,
    },
    spacer: {
      flex: 1,
    },
    userBar: {
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-end",
        flexDirection: "column-reverse",
        overflow: "hidden",
      },
      alignItems: "center",
      display: "flex",
    },
  }),
  {
    name: "Header",
  }
);

export const Header = (props) => {
  const { isDark, toggleTheme, isDrawerOpened, setDrawerState } = props;
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div
        className={clsx(classes.menuIcon, {
          [classes.menuIconOpen]: isDrawerOpened,
          [classes.menuIconDark]: isDark,
        })}
        onClick={() => setDrawerState(!isDrawerOpened)}
      >
        <span />
        <span />
        <span />
        <span />
      </div>
      <Hidden smDown>
        <HeaderBackMenu />
      </Hidden>
      <div className={classes.spacer} />
      <div className={classes.userBar}>
        <HeaderThemeSwitch checked={isDark} onClick={toggleTheme} />
        <HeaderUserMenu />
      </div>
    </div>
  );
};
