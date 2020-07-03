import React, { useRef, useState } from "react";

import clsx from "clsx";
import { useStoreActions, useStoreState } from "easy-peasy";

import {
  Chip,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList as Menu,
  Paper,
  Popper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Face } from "@material-ui/icons";

import { useQS } from "@/utils/hooks";

import ArrowDropdown from "@/components/_icons/ArrowDropdown";

import { HeaderChangePassword } from "./HeaderChangePassword";

const useStyles = makeStyles(
  (theme) => ({
    userMenuContainer: {
      position: "relative",
    },
    userMenuItem: {
      textAlign: "right",
    },
    userChip: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 24,
      color: theme.palette.text.primary,
      height: 40,
      padding: theme.spacing(0.5),
    },
    arrow: {
      marginLeft: theme.spacing(0.5),
      transition: theme.transitions.duration.standard + "ms",
    },
    rotate: {
      transform: "rotate(180deg)",
    },
    label: {
      display: "flex",
      alignItems: "center",
    },
    popover: {
      zIndex: 1,
    },
  }),
  {
    name: "HeaderUserMenu",
  }
);
export const HeaderUserMenu = () => {
  const user = useStoreState((state) => state.auth.user);
  const logout = useStoreActions((actions) => actions.auth.logout);
  const classes = useStyles();
  const anchor = useRef();
  const [isMenuOpened, setMenuState] = useState(false);
  const [params, setParams] = useQS({ action: undefined });

  const handleLogout = () => {
    setMenuState(false);
    logout();
  };

  const handleOpen = () => {
    setParams({ action: "change-password" });
  };

  const handleClose = () => {
    setParams({ action: undefined });
  };

  return (
    <div className={classes.userMenuContainer} ref={anchor}>
      <Chip
        icon={<Face />}
        classes={{ label: classes.label }}
        className={classes.userChip}
        label={
          <>
            <span>{user.email}</span>
            <ArrowDropdown
              className={clsx(classes.arrow, {
                [classes.rotate]: isMenuOpened,
              })}
            />
          </>
        }
        onClick={() => setMenuState(!isMenuOpened)}
      />
      <Popper
        className={classes.popover}
        open={isMenuOpened}
        anchorEl={anchor.current}
        transition
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "right top" : "right bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setMenuState(false)} mouseEvent="onClick">
                <Menu>
                  <MenuItem className={classes.userMenuItem} onClick={handleOpen}>
                    Change Password
                  </MenuItem>
                  <MenuItem className={classes.userMenuItem} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <HeaderChangePassword params={params} handleClose={handleClose} />
    </div>
  );
};
