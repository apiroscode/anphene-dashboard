import React, { useEffect, useState } from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, FormGroup, TextField } from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";

export const UsageLimit = (props) => {
  const { control, errors, voucher, setValue, register, unregister, watch } = props;
  const [open, setOpen] = useState(voucher ? voucher.usageLimit > 0 : false);
  const usageLimit = watch("usageLimit");

  useEffect(() => {
    register("usageLimit");
    return () => {
      unregister("usageLimit");
    };
  }, [register, unregister]);

  const handleChecked = (e) => {
    const newChecked = e.target.checked;
    setOpen(newChecked);
    if (!newChecked) {
      setValue("usageLimit", 0);
    }
  };

  return (
    <Card title="Usage Limit" useMargin>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              control={control}
              type="checkbox"
              size="small"
              checked={open}
              onChange={handleChecked}
            />
          }
          label="Limit number of times this discount can be used in total"
        />
        {open && (
          <TextField
            name="usageLimit"
            label="Limit of uses"
            type="number"
            fullWidth
            error={!!errors.storefrontSearchPosition}
            helperText={errors.storefrontSearchPosition?.message}
            value={usageLimit}
            onChange={(e) => setValue("usageLimit", e.target.value)}
          />
        )}
        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              control={control}
              name="applyOncePerCustomer"
              type="checkbox"
              size="small"
            />
          }
          label="Limit to one use per customer"
        />
      </FormGroup>
    </Card>
  );
};
