import React from "react";

import { Controller } from "react-hook-form";

import { Divider, FormControlLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";

const useStyles = makeStyles(() => ({ title: { fontSize: 14 } }));

export const PluginInfo = (props) => {
  const { control, plugin } = props;
  const classes = useStyles();

  return (
    <Card title="Plugin Information and Status" useMargin>
      {plugin.name && (
        <div>
          <Typography variant="h6" className={classes.title}>
            Plugin Name
          </Typography>
          <Typography variant="body1">{plugin.name}</Typography>
        </div>
      )}
      {plugin.description && (
        <div>
          <Typography variant="h6" className={classes.title}>
            Description
          </Typography>
          <Typography variant="body1">{plugin.description}</Typography>
        </div>
      )}
      <Divider />
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            name="active"
            type="checkbox"
            control={control}
            color="primary"
          />
        }
        label="Set plugin as active"
      />
    </Card>
  );
};
