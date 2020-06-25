import React from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useStyles } from "./styles";

export const AttributeDropDown = (props) => {
  const { idx, attributes, values, setValue } = props;
  const classes = useStyles();
  const attributeValue = attributes[idx].values[0] || null;

  return (
    <Autocomplete
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      options={values}
      value={values.find((x) => x.slug === attributeValue) || null}
      getOptionLabel={(item) => item.name}
      getOptionSelected={(option) => option.slug === attributeValue}
      onChange={(_, value) => {
        const oldAttributes = [...attributes];
        oldAttributes[idx].values = value?.slug ? [value.slug] : [];
        setValue("attributes", oldAttributes);
      }}
      renderInput={(params) => <TextField {...params} label="Value" variant="outlined" />}
    />
  );
};
