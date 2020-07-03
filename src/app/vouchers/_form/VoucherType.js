import React from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";

import { Card } from "@/components/Card";

export const VoucherType = (props) => {
  const { control, isCreate } = props;

  return (
    <Card title="Voucher Specific Information">
      <Controller
        as={
          <RadioGroup aria-label="discount-type">
            <FormControlLabel
              value="ENTIRE_ORDER"
              control={<Radio color="primary" />}
              label="Entire Order"
            />
            <FormControlLabel
              value="SPECIFIC_PRODUCT"
              control={<Radio color="primary" />}
              label={
                <>
                  Specific product{" "}
                  {isCreate && (
                    <Typography variant="caption">
                      The products can be assign after this voucher created
                    </Typography>
                  )}
                </>
              }
            />
            <FormControlLabel
              value="SHIPPING"
              control={<Radio color="primary" />}
              label={
                <>
                  Free Shipping
                  <Typography variant="caption">
                    Set the value to 0 if you want to make entire shipping free
                  </Typography>
                </>
              }
            />
          </RadioGroup>
        }
        name="type"
        control={control}
      />
    </Card>
  );
};
