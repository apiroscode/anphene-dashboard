import React, { useEffect } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useStyles } from "./styles";

export const ProductType = (props) => {
  const { productTypes, watch, register, unregister, setValue, errors } = props;
  const classes = useStyles();
  const productType = watch("productType");

  useEffect(() => {
    register("productType");
    return () => {
      unregister("productType");
    };
  }, [register, unregister]);

  return (
    <Autocomplete
      disableClearable
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      options={productTypes}
      value={productTypes.find((x) => x.node.id === productType) || null}
      getOptionLabel={(item) => item?.node?.name}
      getOptionSelected={(option) => option.node.id === productType}
      onChange={(_, value) => {
        setValue("productType", value?.node?.id || undefined, {
          shouldValidate: true,
          shouldDirty: true,
        });
        if (value?.node?.productAttributes.length > 0) {
          setValue(
            "attributes",
            value?.node?.productAttributes.map((item) => ({ id: item.id, values: [] })),
            { shouldValidate: true, shouldDirty: true }
          );
        } else {
          setValue("attributes", [], { shouldValidate: true, shouldDirty: true });
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Product Type"
          variant="outlined"
          error={!!errors.productType}
          helperText={errors.productType?.message}
        />
      )}
    />
  );
};
