import React from "react";
import { Controller } from "react-hook-form";

import { FormControlLabel, Switch, TextField } from "@material-ui/core";

import { Card } from "@/components/Card";

export const GeneralInformation = (props) => {
  const { control, errors } = props;
  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Product Type Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <FormControlLabel
        control={<Controller as={Switch} control={control} name="hasVariants" color="primary" />}
        label="Product type uses variants attributes"
      />
    </Card>
  );
};
