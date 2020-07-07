import React from "react";

import dayjs from "dayjs";

import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    wrapper: {
      padding: theme.spacing(3),
    },
  }),
  { name: "CustomerHistory" }
);

export const CustomerHistory = ({ lastLogin }) => {
  const classes = useStyles();
  return (
    <Card title="Customer History" useDense>
      <div className={classes.wrapper}>
        <Typography variant="caption">Last login</Typography>
        <Typography variant="h6">{lastLogin ? dayjs(lastLogin).fromNow() : "-"}</Typography>
      </div>
      <Divider />
      <div className={classes.wrapper}>
        <Typography variant="caption">Last order</Typography>
        <Typography variant="h6">-</Typography>
      </div>
    </Card>
  );
};
