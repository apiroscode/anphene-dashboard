import React from "react";

import { Drawer, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { drawerWidth, drawerWidthExpanded, drawerWidthExpandedMobile } from "./consts";

const useStyles = makeStyles(
  (theme) => ({
    drawerDesktop: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      height: "100vh",
      overflow: "visible",
      padding: 0,
      position: "fixed",
      transition: "width 0.3s ease",
      width: drawerWidthExpanded,
    },
    drawerDesktopSmall: {
      overflow: "visible",
      transition: "width 0.2s ease",
      width: drawerWidth,
    },
    drawerMobile: {
      width: drawerWidthExpandedMobile,
    },
  }),
  { name: "SidebarDrawer" }
);

export const SidebarDrawer = (props) => {
  const { children, onClose, open, isMenuSmall } = props;
  const classes = useStyles();
  const small = !isMenuSmall;

  return (
    <>
      <Hidden smDown>
        <Drawer
          variant="persistent"
          open
          classes={{
            paper: small ? classes.drawerDesktop : classes.drawerDesktopSmall,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          onClose={onClose}
          open={open}
          classes={{ paper: classes.drawerMobile }}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};
