import React from "react";

import { Controller } from "react-hook-form";

import { InputAdornment, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormValue = (props) => {
  const { control, errors, watch } = props;
  const type = watch("type");

  return (
    <Card title="Value">
      <Controller
        as={TextField}
        control={control}
        name="value"
        type="number"
        label="Discount Value"
        fullWidth
        error={!!errors.value}
        helperText={errors.value?.message}
        InputProps={{
          startAdornment: type === "FIXED" && <InputAdornment position="start">Rp</InputAdornment>,
          endAdornment: type === "PERCENTAGE" && <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    </Card>
  );
};
