import React from "react";

import { Controller } from "react-hook-form";
import slugify from "slugify";

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Template";

export const FormGeneralInformation = (props) => {
  const { isCreate, control, errors, watch } = props;
  const name = watch("name");

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Default Label"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="slug"
        label="Attribute Code"
        placeholder={slugify(name, { lower: true })}
        fullWidth
        error={!!errors.slug}
        helperText={
          !!errors.slug
            ? errors.slug?.message
            : "This is used internally. Make sure you don’t use spaces"
        }
      />
      <FormControl variant="outlined" fullWidth disabled={!isCreate}>
        <InputLabel id="input-type">Catalog input type for Store Owner</InputLabel>
        <Controller as={Select} control={control} labelId="input-type" name="inputType">
          <MenuItem value="DROPDOWN">Dropdown</MenuItem>
          <MenuItem value="MULTISELECT">Multiple Select</MenuItem>
        </Controller>
      </FormControl>

      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            name="valueRequired"
            type="checkbox"
            size="small"
          />
        }
        label="Value Required"
      />
    </Card>
  );
};
