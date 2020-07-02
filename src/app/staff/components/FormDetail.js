import React from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, Switch, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormDetail = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Detail" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="note"
        type="text"
        label="Note about staff"
        fullWidth
        error={!!errors.note}
        helperText={errors.note?.message}
      />
      <FormControlLabel
        control={<Controller as={Switch} control={control} name="isActive" color="primary" />}
        label="Is Active"
      />
    </Card>
  );
};
