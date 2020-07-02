import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

export const AttributeValue = (props) => {
  const { errors, control } = props;

  return (
    <>
      <Controller
        as={TextField}
        control={control}
        style={{ marginBottom: 16 }}
        name="name"
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="value"
        label="Additional Information"
        helperText="If you want add color you can add hex code like #EOEOEO"
        fullWidth
      />
    </>
  );
};
