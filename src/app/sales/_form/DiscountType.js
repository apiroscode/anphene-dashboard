import React from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

import { Card } from "@/components/Card";

export const DiscountType = (props) => {
  const { control } = props;

  return (
    <Card title="Discount Type">
      <Controller
        as={
          <RadioGroup aria-label="discount-type">
            <FormControlLabel
              value="PERCENTAGE"
              control={<Radio color="primary" />}
              label="Percentage"
            />
            <FormControlLabel
              value="FIXED"
              control={<Radio color="primary" />}
              label="Fixed Amount"
            />
          </RadioGroup>
        }
        name="type"
        control={control}
      />
    </Card>
  );
};
