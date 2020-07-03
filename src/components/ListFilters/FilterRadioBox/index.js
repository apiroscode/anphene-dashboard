import React from "react";

import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

export const FilterRadioBox = (props) => {
  const { filter, tempFilter, setTempFilter } = props;

  const handleRadioBox = (e) => {
    const value = ["true", "false"].includes(e.target.value)
      ? e.target.value === "true"
      : e.target.value;
    setTempFilter({ [filter.field]: value });
  };

  return (
    <FormControl>
      <RadioGroup value={tempFilter[filter.field]} onChange={handleRadioBox}>
        {filter.items.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
