import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const FormSupplierInformation = (props) => {
  const { control, errors } = props;

  return (
    <Card title="Supplier Information" useMargin>
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
        name="phone"
        type="text"
        label="Phone"
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="address"
        type="text"
        label="Address"
        fullWidth
        error={!!errors.address}
        helperText={errors.address?.message}
      />
    </Card>
  );
};
