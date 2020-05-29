import React from "react";

import clsx from "clsx";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@/components/Button";

const useStyles = makeStyles(
  (theme) => ({
    rootTitle: {
      margin: 0,
      padding: theme.spacing(2),
    },
    content: {
      overflow: "hidden",
    },
  }),
  {
    name: "Dialog",
  }
);

export const Dialog = (props) => {
  const {
    open,
    handleOk,
    handleClose,
    children,
    content,
    title,
    okText = "SAVE",
    okStyle,
    cancelText = "BACK",
    cancelStyle,
    okProps = {},
    cancelProps = {},
    dialogProps = {
      fullWidth: true,
    },
    contentClass,
  } = props;
  const classes = useStyles();

  return (
    <MuiDialog open={open} onClose={handleClose} {...dialogProps}>
      <DialogTitle disableTypography className={classes.rootTitle}>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent
        dividers
        className={clsx(classes.content, { [contentClass]: !!contentClass })}
      >
        {content ? (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {content}
          </Typography>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} buttonStyle={cancelStyle} {...cancelProps}>
          {cancelText}
        </Button>
        <Button
          onClick={handleOk}
          buttonStyle={okStyle}
          color="primary"
          variant="contained"
          {...okProps}
        >
          {okText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
