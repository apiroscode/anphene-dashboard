import React from "react";

import { Controller } from "react-hook-form";

import { Button, FormControlLabel, TextField, Typography } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { GENERATE_SKU } from "@/graphql/mutations/products";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Template";

import { ColGrid } from "./components";

const GenerateSku = (props) => {
  const { watch, setValue } = props;
  const name = watch("name");

  const [generate] = useMutation(GENERATE_SKU);

  const handleClick = async () => {
    const {
      data: {
        productGetSku: { sku },
      },
    } = await generate({ variables: { name } });
    setValue("sku", sku);
  };

  return (
    <Button color="primary" onClick={handleClick}>
      GENERATE SKU
    </Button>
  );
};

export const FormInventory = (props) => {
  const { control, errors, product, variant } = props;
  const quantityAllocated = product ? `${product.quantityAllocated} allocated` : "";

  return (
    <Card title="Inventory" useMargin action={!product && !variant && <GenerateSku {...props} />}>
      <ColGrid align="start">
        <Controller
          as={TextField}
          control={control}
          name="sku"
          type="text"
          label="SKU"
          fullWidth
          error={!!errors.sku}
          helperText={errors.sku?.message}
        />
        <Controller
          as={TextField}
          control={control}
          name="quantity"
          type="text"
          label="Quantity"
          fullWidth
          error={!!errors.quantity}
          helperText={!!errors.quantity ? errors.quantity?.message : quantityAllocated}
        />
      </ColGrid>
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            name="trackInventory"
            type="checkbox"
            size="small"
          />
        }
        label={
          <>
            Track Inventory{" "}
            <Typography variant="caption">
              Active inventory tracking will automatically calculate changes of stock
            </Typography>
          </>
        }
      />
    </Card>
  );
};
