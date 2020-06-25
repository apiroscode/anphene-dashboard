import React from "react";

import { Controller } from "react-hook-form";

import { InputAdornment, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

import { ColGrid } from "./components";

export const FormPricing = (props) => {
  const { control, errors } = props;

  return (
    <Card title="Pricing">
      <ColGrid>
        <Controller
          as={TextField}
          control={control}
          name="price"
          type="number"
          label="Price"
          fullWidth
          error={!!errors.price}
          helperText={
            !!errors.price ? errors.price?.message : "The base selling price of your product"
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
        />
        <Controller
          as={TextField}
          control={control}
          name="cost"
          type="number"
          label="Cost"
          fullWidth
          error={!!errors.cost}
          helperText={
            !!errors.cost ? errors.cost?.message : "The costs you incur for this product"
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
        />
      </ColGrid>
    </Card>
  );
};
