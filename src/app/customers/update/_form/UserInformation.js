import React from "react";

import dayjs from "dayjs";
import { Controller } from "react-hook-form";

import { TextField, FormControlLabel } from "@material-ui/core";

import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";

export const UserInformation = (props) => {
  const { control, errors, customer } = props;

  return (
    <Card
      title="User Information"
      subTitle={`Active member since ${dayjs(customer.dateJoined).format("DD MMM YYYY")}`}
      useMargin
    >
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
      <FormControlLabel
        control={<Controller as={Checkbox} name="isActive" type="checkbox" control={control} />}
        label="Is Active"
      />
      <Controller
        as={TextField}
        control={control}
        name="note"
        type="text"
        label="Note"
        fullWidth
        error={!!errors.note}
        helperText={errors.note?.message}
        multiline
      />
    </Card>
  );
};
