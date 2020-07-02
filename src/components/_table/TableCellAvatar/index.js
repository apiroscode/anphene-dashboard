import React from "react";

import clsx from "clsx";

import { Avatar, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cached from "@material-ui/icons/Cached";

import Image from "../../_icons/Image";

const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      background: "none",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      color: "#bdbdbd",
      display: "inline-flex",
      padding: theme.spacing(0.5),
    },
    children: {
      alignSelf: "center",
      marginLeft: theme.spacing(2),
      width: "100%",
    },
    content: {
      alignItems: "center",
      display: "flex",
    },
    root: {
      "&:not(first-child)": {
        paddingLeft: 0,
      },
      paddingRight: theme.spacing(3),
      width: "1%",
    },
  }),
  { name: "TableCellAvatar" }
);

export const TableCellAvatar = (props) => {
  const { children, className, thumbnail, avatarProps, ...rest } = props;

  const classes = useStyles(props);

  return (
    <TableCell className={clsx(classes.root, className)} {...rest}>
      <div className={classes.content}>
        {thumbnail === undefined ? (
          <Avatar className={clsx(classes.avatar, avatarProps)}>
            <Cached color="primary" />
          </Avatar>
        ) : thumbnail === null ? (
          <Avatar className={clsx(classes.avatar, avatarProps)}>
            <Image color="primary" />
          </Avatar>
        ) : (
          <Avatar className={clsx(classes.avatar, avatarProps)} src={thumbnail} />
        )}
        <div className={classes.children}>{children}</div>
      </div>
    </TableCell>
  );
};
