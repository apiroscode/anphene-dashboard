import React from "react";

import { Controller } from "react-hook-form";

import { TextField, Typography } from "@material-ui/core";

import { Card } from "@/components/Card";

export const Notes = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Notes" useMargin>
      <Typography>Enter any extra information regarding this customer.</Typography>
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
