import React from "react";

import clsx from "clsx";
import SVG from "react-inlinesvg";

import { Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/logo.svg";
import menuArrowIcon from "../assets/menu-arrow-icon.svg";

import { SidebarDrawer } from "./SidebarDrawer";
import { SidebarMenuList } from "./SidebarMenuList";

const useStyles = makeStyles(
  (theme) => ({
    isMenuSmall: {
      "& path": {
        fill: theme.palette.primary.main,
      },
      "& span": {
        margin: "0 8px",
      },
      "& svg": {
        marginTop: 8,
        transform: "rotate(180deg)",
      },
      "&:hover": {
        background: "#E6F3F3",
      },
      background: theme.palette.background.paper,
      border: `solid 1px #EAEAEA`,
      borderRadius: "50%",
      cursor: "pointer",
      height: 32,
      position: "absolute",
      right: -16,
      top: 65,
      transition: `background ${theme.transitions.duration.shorter}ms`,
      width: 32,
      zIndex: 99,
    },
    isMenuSmallDark: {
      "&:hover": {
        background: `linear-gradient(0deg, rgba(25, 195, 190, 0.1), rgba(25, 195, 190, 0.1)), ${theme.palette.background.paper}`,
      },
      border: `solid 1px #252728`,
      transition: `background  ${theme.transitions.duration.shorter}ms`,
    },
    isMenuSmallHide: {
      "& svg": {
        marginLeft: "3px",
        transform: "rotate(0deg)",
      },
    },
    logo: {
      "& svg": {
        width: 40,
        height: 40,
        marginRight: theme.spacing(1),
      },
      background: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 80,
      position: "relative",
      color: "#fff",
    },
    logoText: {
      letterSpacing: 4,
      fontWeight: theme.typography.fontWeightBold,
    },
    sideBar: {
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
      background: theme.palette.background.paper,
      padding: `0 ${theme.spacing(4)}px`,
    },
  }),
  { name: "Sidebar" }
);

export const Sidebar = (props) => {
  const { isMenuSmall, handleIsMenuSmall, isDark } = props;
  const classes = useStyles();

  return (
    <div className={classes.sideBar}>
      <SidebarDrawer {...props}>
        <div className={classes.logo}>
          <SVG src={logo} />
          <Hidden mdUp>
            <Typography variant="h5" className={classes.logoText}>
              ANPHENE
            </Typography>
          </Hidden>
          <Hidden smDown>
            {!isMenuSmall && (
              <Typography variant="h5" className={classes.logoText}>
                ANPHENE
              </Typography>
            )}
          </Hidden>
        </div>
        <Hidden smDown>
          <div
            className={clsx(classes.isMenuSmall, {
              [classes.isMenuSmallHide]: isMenuSmall,
              [classes.isMenuSmallDark]: isDark,
            })}
            onClick={handleIsMenuSmall}
          >
            <span>
              <SVG src={menuArrowIcon} />
            </span>
          </div>
        </Hidden>
        <SidebarMenuList {...props} />
      </SidebarDrawer>
    </div>
  );
};
