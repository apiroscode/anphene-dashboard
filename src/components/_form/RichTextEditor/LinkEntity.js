import React from "react";

import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { Link } from "../../Link";

const useStyles = makeStyles(
  (theme) => ({
    anchor: {
      display: "inline-block",
    },
    container: {
      alignItems: "center",
      display: "flex",
    },
    inline: {
      display: "inline-block",
    },
    popover: {
      zIndex: 1,
    },
    root: {
      alignItems: "center",
      display: "flex",
      minHeight: 72,
      padding: theme.spacing(1.5, 1.5, 1.5, 3),
    },
    separator: {
      backgroundColor: theme.palette.grey[300],
      display: "inline-block",
      height: 30,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(),
      width: 1,
    },
  }),
  { name: "LinkEntity" }
);

export const LinkEntity = (props) => {
  const { children, contentState, entityKey, onEdit, onRemove } = props;
  const classes = useStyles(props);

  const [isOpened, setOpenStatus] = React.useState(false);
  const anchor = React.useRef();

  const disable = () => setOpenStatus(false);
  const toggle = () => setOpenStatus(!isOpened);

  return (
    <>
      <div className={classes.anchor} ref={anchor}>
        <Popper
          className={classes.popover}
          open={isOpened}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="bottom"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement,
              }}
            >
              <Paper className={classes.root}>
                <ClickAwayListener onClickAway={disable} mouseEvent="onClick">
                  <div className={classes.container}>
                    <Typography className={classes.inline} variant="body1">
                      {contentState.getEntity(entityKey).getData().url}
                    </Typography>
                    <span className={classes.separator} />
                    <Button
                      onClick={() => {
                        disable();
                        onEdit(entityKey);
                      }}
                      color="primary"
                    >
                      Edit
                    </Button>
                    <IconButton onClick={() => onRemove(entityKey)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Link href={contentState.getEntity(entityKey).getData().url} onClick={toggle}>
        {children}
      </Link>
    </>
  );
};
