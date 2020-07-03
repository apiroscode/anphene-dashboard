import React from "react";

import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

import { Card } from "@/components/Card";

export const GeneralInformation = (props) => {
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
