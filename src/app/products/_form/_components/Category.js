import React, { useEffect } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useStyles } from "./styles";

export const Category = (props) => {
  const { categories, watch, register, unregister, setValue, errors } = props;
  const classes = useStyles();
  const category = watch("category");

  useEffect(() => {
    register("category");
    return () => {
      unregister("category");
    };
  }, [register, unregister]);

  return (
    <Autocomplete
      disableClearable
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      options={categories}
      value={categories.find((x) => x.node.id === category) || null}
      getOptionLabel={(item) => `${"-".repeat(item.node?.level)}${item?.node?.name}`}
      getOptionSelected={(option) => option.node.id === category}
      onChange={(_, value) => {
        setValue("category", value?.node?.id || undefined, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          variant="outlined"
          error={!!errors.category}
          helperText={errors.category?.message}
        />
      )}
    />
  );
};
