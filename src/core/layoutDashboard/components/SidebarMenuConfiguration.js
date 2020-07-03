import React from "react";

import clsx from "clsx";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";

import { Link, Typography } from "@material-ui/core";

import { menuItems as configurationMenuItems } from "@/app/configuration/menuItems";

import configureIcon from "../assets/menu-configure-icon.svg";

const getPermissions = (menuItems) => {
  const permissions = [];
  menuItems.forEach((item) => {
    if (item.children !== undefined) {
      permissions.push(...getPermissions(item.children));
    } else {
      permissions.push(item.permission);
    }
  });

  return permissions;
};

const configurationPermissions = [...new Set(getPermissions(configurationMenuItems))];

export const SidebarMenuConfiguration = (props) => {
  const { classes, closeSubMenu, isDark, isMenuSmall, userPermissions } = props;
  const location = useLocation();

  const isActive = !!matchPath("/configuration".split("?")[0], location.pathname.split("?")[0]);

  const gotPermissions = configurationPermissions.some((permission) =>
    userPermissions.includes(permission)
  );

  return gotPermissions ? (
    <Link
      component={RouterLink}
      color="inherit"
      className={clsx(classes.menuListItem, {
        [classes.menuListItemActive]: isActive,
      })}
      to="configuration"
      onClick={closeSubMenu}
      key="configuration"
    >
      <div className={classes.menuItemHover}>
        <SVG
          className={clsx(classes.menuIcon, {
            [classes.menuIconDark]: isDark,
            [classes.menuIconSmall]: !isMenuSmall,
          })}
          src={configureIcon}
        />
        <Typography
          className={clsx(classes.menuListItemText, {
            [classes.menuListItemTextHide]: !isMenuSmall,
          })}
        >
          Configuration
        </Typography>
      </div>
    </Link>
  ) : null;
};
