import React from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, TextField, Typography } from "@material-ui/core";

import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";

export const PluginSettings = (props) => {
  const { control, errors, plugin } = props;
  const { configuration } = plugin;

  const apiKey = configuration.find((config) => config.name === "api_key");
  const fetchShippingCost = configuration.find((config) => config.name === "fetch_shipping_cost");
  const fetchWaybill = configuration.find((config) => config.name === "fetch_waybill");

  return (
    <Card title="Plugin Settings" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="apiKey"
        type="text"
        label={apiKey.label}
        fullWidth
        error={!!errors.apiKey}
        helperText={!!errors.apiKey ? errors.apiKey?.message : apiKey.helpText}
      />
      <div>
        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              name="fetchShippingCost"
              type="checkbox"
              control={control}
              color="primary"
            />
          }
          label={
            <>
              {fetchShippingCost.label}
              <Typography variant="caption">{fetchShippingCost.helpText}</Typography>
            </>
          }
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              name="fetchWaybill"
              type="checkbox"
              control={control}
              color="primary"
            />
          }
          label={
            <>
              {fetchWaybill.label}
              <Typography variant="caption">{fetchWaybill.helpText}</Typography>
            </>
          }
        />
      </div>
    </Card>
  );
};
