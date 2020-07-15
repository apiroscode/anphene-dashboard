import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Card";

export const CustomerOverview = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Customer Overview" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="email"
        type="email"
        label="E-mail Address"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </Card>
  );
};
