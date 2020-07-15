import React from "react";

import { FormControl, FormControlLabel } from "@material-ui/core";

import { Checkbox } from "../../Checkbox";

export const FilterCheckBox = (props) => {
  const { filter, tempFilter, setTempFilter } = props;

  const handleChange = (value) => {
    if (tempFilter[filter.field].includes(value)) {
      setTempFilter({ [filter.field]: tempFilter[filter.field].filter((item) => item !== value) });
    } else {
      setTempFilter({ [filter.field]: [value, ...tempFilter[filter.field]] });
    }
  };

  return (
    <FormControl>
      {filter.items.map((item) => (
        <FormControlLabel
          key={item.value}
          control={
            <Checkbox
              size="small"
              checked={tempFilter[filter.field].includes(item.value)}
              onChange={() => handleChange(item.value)}
            />
          }
          label={item.label}
        />
      ))}
    </FormControl>
  );
};
