import React, { useEffect, useState } from "react";

import { FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from "@material-ui/core";

import { Card } from "@/components/Card";

export const MinimumRequirements = (props) => {
  const { errors, setValue, voucher, register, unregister, watch } = props;
  const [state, setState] = useState(
    voucher?.minSpentAmount > 0
      ? "value"
      : voucher?.minCheckoutItemsQuantity > 0
      ? "quantity"
      : "none"
  );
  const minSpentAmount = watch("minSpentAmount");
  const minCheckoutItemsQuantity = watch("minCheckoutItemsQuantity");

  useEffect(() => {
    register("minSpentAmount");
    register("minCheckoutItemsQuantity");

    return () => {
      unregister("minSpentAmount");
      unregister("minCheckoutItemsQuantity");
    };
  }, [register, unregister]);

  const handleChange = (e) => {
    if (e.target.value === "none") {
      setValue("minSpentAmount", 0, { shouldValidate: true, shouldDirty: true });
      setValue("minCheckoutItemsQuantity", 0, { shouldValidate: true, shouldDirty: true });
    } else if (e.target.value === "value") {
      setValue("minCheckoutItemsQuantity", 0, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("minSpentAmount", 0, { shouldValidate: true, shouldDirty: true });
    }
    setState(e.target.value);
  };

  return (
    <Card title="Minimum Requirements" useMargin>
      <RadioGroup value={state} onChange={handleChange}>
        <FormControlLabel value="none" control={<Radio color="primary" />} label="None" />
        <FormControlLabel
          value="value"
          control={<Radio color="primary" />}
          label="Minimal order value"
        />
        <FormControlLabel
          value="quantity"
          control={<Radio color="primary" />}
          label="Minimum quantity of items"
        />
      </RadioGroup>
      {state === "value" && (
        <TextField
          name="minSpentAmount"
          type="number"
          label="Minimal order value"
          fullWidth
          error={!!errors.minSpentAmount}
          helperText={errors.minSpentAmount?.message}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
          value={minSpentAmount}
          onChange={(e) =>
            setValue("minSpentAmount", e.target.value, { shouldValidate: true, shouldDirty: true })
          }
        />
      )}
      {state === "quantity" && (
        <TextField
          name="minCheckoutItemsQuantity"
          type="number"
          label="Minimum quantity of items"
          fullWidth
          error={!!errors.minCheckoutItemsQuantity}
          helperText={errors.minCheckoutItemsQuantity?.message}
          value={minCheckoutItemsQuantity}
          onChange={(e) =>
            setValue("minCheckoutItemsQuantity", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      )}
    </Card>
  );
};
