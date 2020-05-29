import React from "react";

import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import SVG from "react-inlinesvg";

import { Hidden, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import menuArrowIcon from "../assets/menu-arrow-icon.svg";

import { drawerNestedMenuWidth, drawerWidthExpandedMobile } from "./consts";

const useStyles = makeStyles(
  (theme) => ({
    menuListNested: {
      background: theme.palette.background.paper,
      height: "100vh",
      position: "absolute",
      right: 0,
      top: 0,
      transition: `right  ${theme.transitions.duration.shorter}ms ease`,
      width: drawerNestedMenuWidth,
      zIndex: -1,
    },
    menuListNestedClose: {
      "& svg": {
        fill: theme.palette.primary.main,
        left: 11,
        position: "relative",
        top: 1,
      },
      border: `solid 1px #EAEAEA`,
      borderRadius: "100%",
      cursor: "pointer",
      height: 32,
      position: "absolute",
      right: 32,
      top: 35,
      transform: "rotate(180deg)",
      width: 32,
    },
    menuListNestedCloseDark: {
      border: `solid 1px #252728`,
    },
    menuListNestedHide: {
      opacity: 0,
    },
    menuListNestedIcon: {
      "& path": {
        fill: "initial",
      },
      "& svg": { height: 32, position: "relative", top: 7, width: 32 },
    },
    menuListNestedIconDark: {
      "& path": {
        fill: theme.palette.common.white,
      },
    },
    menuListNestedItem: {
      "&:hover": {
        "& p": {
          color: theme.palette.primary.main,
        },
      },
      display: "block",
      marginBottom: theme.spacing(2),
      padding: "0px 30px",
      textDecoration: "none",
    },
    menuListNestedOpen: {
      [theme.breakpoints.down("sm")]: {
        right: 0,
        width: drawerWidthExpandedMobile,
        zIndex: 2,
      },
      right: -drawerNestedMenuWidth,
      width: drawerNestedMenuWidth,
      zIndex: -1,
    },
    subHeader: {
      borderBottom: "solid 1px #EAEAEA",
      margin: "30px",
      marginBottom: 39,
      paddingBottom: 22,
    },
    subHeaderDark: {
      borderBottom: "solid 1px #252728",
    },
    subHeaderTitle: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: 0,
      },
      display: "inline",
      paddingLeft: 10,
    },
  }),
  { name: "SidebarMenuNested" }
);

export const SidebarMenuNested = (props) => {
  const {
    activeItem,
    userPermissions,
    closeSubMenu,
    menuItem,
    title,
    isDark,
    icon,
    onClose,
  } = props;
  const classes = useStyles(props);

  const menuItems = menuItem.children;
  return (
    <div
      className={clsx(classes.menuListNested, {
        [classes.menuListNestedOpen]: activeItem.label === menuItem.label && activeItem.isActive,
      })}
    >
      <Typography
        className={clsx(classes.subHeader, {
          [classes.subHeaderDark]: isDark,
        })}
        variant="h5"
      >
        <Hidden mdUp>
          <span
            className={clsx(classes.menuListNestedIcon, {
              [classes.menuListNestedIconDark]: isDark,
            })}
          >
            <SVG src={icon} />
          </span>
        </Hidden>
        <div className={classes.subHeaderTitle}>{title}</div>
        <Hidden mdUp>
          <div
            className={clsx(classes.menuListNestedClose, {
              [classes.menuListNestedCloseDark]: isDark,
            })}
            onClick={() =>
              closeSubMenu({
                isActive: false,
                label: null,
              })
            }
          >
            <SVG src={menuArrowIcon} />
          </div>
        </Hidden>
      </Typography>
      {menuItems.map((item) => {
        if (item.permission && !userPermissions.includes(item.permission)) {
          return null;
        }

        return (
          <Link
            component={RouterLink}
            color="inherit"
            className={clsx(classes.menuListNestedItem)}
            to={item.url}
            onClick={() => {
              closeSubMenu();
              onClose();
            }}
            key={item.label}
          >
            <Typography>{item.label}</Typography>
          </Link>
        );
      })}
    </div>
  );
};
