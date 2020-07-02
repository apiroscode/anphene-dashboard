import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormUserInformation = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Staff Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="email"
        type="email"
        label="Email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="name"
        type="text"
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Card>
  );
};
