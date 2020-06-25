import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const ImageInformation = (props) => {
  const { control, errors } = props;

  return (
    <Card title="Image Information">
      <Controller
        as={TextField}
        control={control}
        name="alt"
        label="Description"
        fullWidth
        error={!!errors.alt}
        helperText={!!errors.alt ? errors.alt?.message : "Optional"}
      />
    </Card>
  );
};
