import React from "react";

import { Controller } from "react-hook-form";

import { Button, FormControlLabel, TextField, Typography } from "@material-ui/core";

import { useMutation } from "@/utils/hooks";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";
import { SimpleColGrid } from "@/components/SimpleColGrid";

import { GenerateSku as GenerateSkuMutation } from "../mutations";

const GenerateSku = (props) => {
  const { watch, setValue } = props;
  const name = watch("name");

  const [generate] = useMutation(GenerateSkuMutation);

  const handleClick = async () => {
    const {
      data: {
        productGetSku: { sku },
      },
    } = await generate({ variables: { name } });
    setValue("sku", sku, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <Button color="primary" onClick={handleClick}>
      GENERATE SKU
    </Button>
  );
};

export const Inventory = (props) => {
  const { control, errors, useGenerator, variant } = props;
  const quantityAllocated = variant ? `${variant.quantityAllocated} allocated` : "";

  return (
    <Card title="Inventory" useMargin action={useGenerator && <GenerateSku {...props} />}>
      <SimpleColGrid align="start">
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
      </SimpleColGrid>
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
            Track Inventory
            <Typography variant="caption">
              Active inventory tracking will automatically calculate changes of stock
            </Typography>
          </>
        }
      />
    </Card>
  );
};
