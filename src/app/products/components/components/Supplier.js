import React, { useEffect } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useStyles } from "./styles";

export const Supplier = (props) => {
  const { suppliers, watch, register, unregister, setValue, errors } = props;
  const classes = useStyles();
  const supplier = watch("supplier");

  useEffect(() => {
    register("supplier");
    return () => {
      unregister("supplier");
    };
  }, [register, unregister]);

  return (
    <Autocomplete
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      options={suppliers}
      value={suppliers.find((x) => x.node.id === supplier) || null}
      getOptionLabel={(item) => item?.node?.name}
      getOptionSelected={(option) => option.node.id === supplier}
      onChange={(_, value) => {
        setValue("supplier", value?.node?.id || undefined);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Supplier"
          variant="outlined"
          error={!!errors.supplier}
          helperText={errors.supplier?.message}
        />
      )}
    />
  );
};
