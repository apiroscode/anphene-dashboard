import React, { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { useLocalStorage } from "@/utils/hooks";

import { AppLoader, Container, Header, Sidebar } from "./components";
import { drawerWidth, drawerWidthExpanded } from "./components/consts";

const useStyles = makeStyles(
  (theme) => ({
    appAction: {
      [theme.breakpoints.down("sm")]: {
        left: 0,
        width: "100%",
      },
      bottom: 0,
      gridColumn: 2,
      position: "sticky",
      zIndex: 10,
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
      paddingLeft: drawerWidthExpanded,
      transition: "padding-left 0.5s ease",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    contentToggle: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
      paddingLeft: drawerWidth,
    },
    root: {
      width: `100%`,
    },
    view: {
      backgroundColor: theme.palette.background.default,
      flex: 1,
      flexGrow: 1,
      marginLeft: 0,
      paddingBottom: theme.spacing(),
      [theme.breakpoints.up("sm")]: {
        paddingBottom: theme.spacing(3),
      },
    },
    viewContainer: {
      display: "flex",
      flexGrow: 1,
    },
  }),
  {
    name: "AppLayout",
  }
);

export default () => {
  const appActionRef = useRef(null);
  const setAppActionRef = useStoreActions((actions) => actions.app.setAppActionRef);
  const appTheme = useStoreState((state) => state.app.theme);
  const setAppTheme = useStoreActions((actions) => actions.app.updateTheme);
  const [isDrawerOpened, setDrawerState] = useState(false);
  const [isMenuSmall, setMenuSmall] = useLocalStorage("isMenuSmall", false);
  const classes = useStyles();
  const isDark = appTheme === "dark";

  useEffect(() => {
    setAppActionRef(appActionRef);
    return () => {
      setAppActionRef(undefined);
    };
  }, [setAppActionRef, appActionRef]);

  const handleIsMenuSmall = () => {
    setMenuSmall(!isMenuSmall);
  };

  const toggleTheme = () => {
    setAppTheme(isDark ? "light" : "dark");
  };

  const sideBarProps = {
    isMenuSmall,
    isDark,
    handleIsMenuSmall,
    toggleTheme,
    onClose: () => setDrawerState(false),
    open: isDrawerOpened,
  };

  const headerProps = {
    isDark,
    toggleTheme,
    isDrawerOpened,
    setDrawerState,
  };

  return (
    <div className={classes.root}>
      <Sidebar {...sideBarProps} />
      <div
        className={clsx(classes.content, {
          [classes.contentToggle]: isMenuSmall,
        })}
      >
        <AppLoader />
        <div className={classes.viewContainer}>
          <Container>
            <Header {...headerProps} />
            <main className={classes.view}>
              <Outlet />
            </main>
          </Container>
        </div>
        <div className={classes.appAction} ref={appActionRef} />
      </div>
    </div>
  );
};
