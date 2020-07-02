import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormGeneralInformation = (props) => {
  const { control, errors, isCreate } = props;

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="code"
        type="text"
        label="Discount Code"
        fullWidth
        error={!!errors.code}
        helperText={errors.code?.message}
        disabled={!isCreate}
        onChange={(e) => e.target.value.toUpperCase()}
      />
    </Card>
  );
};
