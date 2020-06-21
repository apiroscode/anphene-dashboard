import React, { useEffect } from "react";

import { Controller } from "react-hook-form";

import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Template";

export const FormValue = (props) => {
  const { control, errors, watch, setValue } = props;
  const type = watch("type");
  const discountType = watch("discountType");

  useEffect(() => {
    if (type === "SHIPPING") {
      setValue("discountType", "FIXED");
    }
  }, [setValue, type]);

  return (
    <Card title="Value" useMargin>
      <FormControl component="fieldset">
        <FormLabel component="legend" color="secondary">
          Discount Type
        </FormLabel>
        <Controller
          as={
            <RadioGroup aria-label="discount-type" disabled>
              <FormControlLabel
                value="PERCENTAGE"
                control={<Radio color="primary" />}
                label="Percentage"
                disabled={type === "SHIPPING"}
              />
              <FormControlLabel
                value="FIXED"
                control={<Radio color="primary" />}
                label="Fixed Amount"
                disabled={type === "SHIPPING"}
              />
            </RadioGroup>
          }
          name="discountType"
          control={control}
        />
      </FormControl>
      <Divider />
      <Controller
        as={TextField}
        control={control}
        name="discountValue"
        type="number"
        label="Discount Value"
        fullWidth
        error={!!errors.value}
        helperText={errors.value?.message}
        InputProps={{
          startAdornment: discountType === "FIXED" && (
            <InputAdornment position="start">Rp</InputAdornment>
          ),
          endAdornment: discountType === "PERCENTAGE" && (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <Divider />
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            name="applyOncePerOrder"
            type="checkbox"
            size="small"
          />
        }
        label={
          <>
            Only once per order{" "}
            <Typography variant="caption">
              If this option is disabled, discount will be counted for every eligible product
            </Typography>
          </>
        }
      />
    </Card>
  );
};
