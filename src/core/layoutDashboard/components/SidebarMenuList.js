import React, { useState } from "react";

import clsx from "clsx";
import { useStoreState } from "easy-peasy";
import SVG from "react-inlinesvg";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";

import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { maybe } from "@/utils";
import { menuItems } from "../menuItems";

import { SidebarMenuNested } from "./SidebarMenuNested";
import { SidebarMenuConfiguration } from "./SidebarMenuConfiguration";

const useStyles = makeStyles(
  (theme) => ({
    menu: {
      background: theme.palette.background.paper,
      height: "100vh",
      padding: "25px 20px",
    },
    menuSmall: {
      background: theme.palette.background.paper,
      height: "100vh",
      overflow: "hidden",
      padding: 25,
    },
    menuIcon: {
      "& svg": {
        height: 32,
        width: 32,
      },
      display: "inline-block",
      position: "relative",
      top: 8,
    },
    menuIconDark: {
      "& path": {
        fill: theme.palette.common.white,
      },
    },
    menuIconSmall: {
      left: -5,
    },
    menuIsActive: {
      boxShadow: "0px 0px 12px 1px rgba(0,0,0,0.2)",
    },
    menuItemHover: {
      "& p": {
        fontSize: 14,
        transition: "color 0.5s ease, opacity 0.3s ease-out",
      },
      "& path": {
        transition: "fill 0.5s ease",
      },
      "&:hover": {
        "& p": {
          color: theme.palette.primary.main,
        },
        "& path": {
          fill: theme.palette.primary.main,
        },
        "&:before": {
          borderLeft: `solid 2px ${theme.palette.primary.main}`,
          content: "''",
          height: 33,
          left: -20,
          position: "absolute",
          top: 8,
        },
        color: theme.palette.primary.main,
      },
      cursor: "pointer",
      position: "relative",
    },
    menuList: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      marginLeft: theme.spacing(4),
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
    menuListItem: {
      alignItems: "center",
      display: "block",
      marginBottom: theme.spacing(5),
      paddingLeft: 0,
      textDecoration: "none",
      transition: theme.transitions.duration.standard + "ms",
    },
    menuListItemActive: {
      "& $menuListItemText": {
        color: theme.palette.primary.main,
      },
      "& path": {
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
      },
    },
    menuListItemOpen: {
      "&:after": {
        borderBottom: `10px solid transparent`,
        borderLeft: `10px solid ${theme.palette.background.paper}`,
        borderTop: `10px solid transparent`,
        content: "''",
        height: 0,
        position: "absolute",
        right: -30,
        top: 15,
        width: 0,
      },
      "&:before": {
        borderLeft: `solid 2px ${theme.palette.primary.main}`,
        content: "''",
        height: 33,
        left: -20,
        position: "absolute",
        top: 8,
      },
      position: "relative",
    },
    menuListItemText: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
      bottom: 0,
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: 500,
      left: 30,
      opacity: 1,
      paddingLeft: 16,
      position: "absolute",
      textTransform: "uppercase",
      transition: "opacity 0.5s ease",
    },
    menuListItemTextHide: {
      bottom: 0,
      left: 30,
      opacity: 0,
      position: "absolute",
    },
    subMenu: {
      padding: "0 15px",
    },
    subMenuDrawer: {
      background: "#000",
      cursor: "pointer",
      height: "100vh",
      left: 0,
      opacity: 0.2,
      position: "absolute",
      top: 0,
      width: 0,
      zIndex: -2,
    },
    subMenuDrawerOpen: {
      width: `100vw`,
    },
  }),
  { name: "SidebarMenuList" }
);

export const SidebarMenuList = (props) => {
  const { isMenuSmall: small, isDark, onClose } = props;
  const location = useLocation();
  const classes = useStyles();
  const [activeSubMenu, setActiveSubMenu] = useState({
    isActive: false,
    label: null,
  });
  const user = useStoreState((state) => state.auth.user);
  const userPermissions = user.userPermissions.map((perm) => perm.code);
  const isMenuSmall = !small;

  const handleSubMenu = (itemLabel) => {
    setActiveSubMenu({
      isActive: itemLabel === activeSubMenu.label ? !activeSubMenu.isActive : true,
      label: itemLabel,
    });
  };

  const closeSubMenu = () => {
    setActiveSubMenu({
      isActive: false,
      label: null,
    });
  };
  return (
    <div
      className={clsx(!isMenuSmall ? classes.menuSmall : classes.menu, {
        [classes.menuIsActive]: activeSubMenu.isActive,
      })}
    >
      {menuItems.map((menuItem) => {
        const isActive = (menuItem) => !!matchPath(menuItem.url.split("?")[0], location.pathname);
        const menuItemChildren = maybe(() => menuItem.children, []);

        if (menuItemChildren.length > 0) {
          const allChildrenPermission = menuItemChildren.map((item) => item.permission);
          const checkPermissions = (permission) => {
            if (permission === undefined) {
              return true;
            }
            return userPermissions.includes(permission);
          };
          const gotPermissions = allChildrenPermission.some(checkPermissions);
          if (!gotPermissions) {
            return null;
          }
        } else {
          if (menuItem.permission && !userPermissions.includes(menuItem.permission)) {
            return null;
          }
        }

        if (!menuItem.url) {
          const isAnyChildActive = menuItem.children.reduce(
            (acc, child) => acc || isActive(child),
            false
          );

          return (
            <div
              className={clsx(classes.menuListItem, {
                [classes.menuListItemActive]: isAnyChildActive,
              })}
              key={menuItem.label}
            >
              <div
                className={clsx(classes.menuItemHover, {
                  [classes.menuListItemOpen]:
                    menuItem.label === activeSubMenu.label && activeSubMenu.isActive,
                })}
                data-tc={menuItem.label}
                onClick={() => handleSubMenu(menuItem.label)}
              >
                <SVG
                  className={clsx(classes.menuIcon, {
                    [classes.menuIconDark]: isDark,
                    [classes.menuIconSmall]: !isMenuSmall,
                  })}
                  src={menuItem.icon}
                />
                <Typography
                  className={clsx(classes.menuListItemText, {
                    [classes.menuListItemTextHide]: !isMenuSmall,
                  })}
                >
                  {menuItem.label}
                </Typography>
              </div>
              <SidebarMenuNested
                isDark={isDark}
                activeItem={activeSubMenu}
                closeSubMenu={closeSubMenu}
                menuItem={menuItem}
                handleSubMenu={handleSubMenu}
                title={menuItem.label}
                icon={menuItem.icon}
                userPermissions={userPermissions}
                onClose={onClose}
              />
              <div
                onClick={closeSubMenu}
                className={clsx(classes.subMenuDrawer, {
                  [classes.subMenuDrawerOpen]: activeSubMenu.isActive,
                })}
              />
            </div>
          );
        }
        return (
          <Link
            component={RouterLink}
            color="inherit"
            className={clsx(classes.menuListItem, {
              [classes.menuListItemActive]: isActive(menuItem),
            })}
            to={menuItem.url}
            onClick={closeSubMenu}
            key={menuItem.label}
          >
            <div className={classes.menuItemHover}>
              <SVG
                className={clsx(classes.menuIcon, {
                  [classes.menuIconDark]: isDark,
                  [classes.menuIconSmall]: !isMenuSmall,
                })}
                src={menuItem.icon}
              />
              <Typography
                className={clsx(classes.menuListItemText, {
                  [classes.menuListItemTextHide]: !isMenuSmall,
                })}
              >
                {menuItem.label}
              </Typography>
            </div>
          </Link>
        );
      })}
      <SidebarMenuConfiguration
        classes={classes}
        closeSubMenu={closeSubMenu}
        isDark={isDark}
        isMenuSmall={isMenuSmall}
        userPermissions={userPermissions}
      />
    </div>
  );
};
