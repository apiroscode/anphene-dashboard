import React from "react";

import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormGeneralInformation = (props) => {
  const { control, errors } = props;
  return (
    <Card title="General Information">
      <Controller
        as={TextField}
        control={control}
        name="name"
        type="text"
        label="Group Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Card>
  );
};
