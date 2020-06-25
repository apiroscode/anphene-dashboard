import React from "react";

import { Controller } from "react-hook-form";

import { InputAdornment, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

import { ColGrid } from "./components";

export const FormWeight = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Weight">
      <ColGrid>
        <Controller
          as={TextField}
          control={control}
          name="weight"
          type="number"
          label="Weight"
          fullWidth
          error={!!errors.weight}
          helperText={errors.weight?.message}
          InputProps={{
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
          }}
        />
      </ColGrid>
    </Card>
  );
};
