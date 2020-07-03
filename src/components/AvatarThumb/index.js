import React from "react";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cached } from "@material-ui/icons";

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
  }),
  { name: "AvatarThumb" }
);

export const AvatarThumb = (props) => {
  const { thumbnail } = props;

  const classes = useStyles();

  return thumbnail ? (
    <Avatar className={classes.avatar} src={thumbnail} />
  ) : (
    <Avatar className={classes.avatar}>
      <Cached color="primary" />
    </Avatar>
  );
};
