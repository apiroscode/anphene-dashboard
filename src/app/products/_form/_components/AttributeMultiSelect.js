import React from "react";

import { Chip, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import { Checkbox } from "@/components/Checkbox";

import { useStyles } from "./styles";

const useStylesChip = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "&>:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
  chip: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const AttributeMultiSelect = (props) => {
  const { idx, attributes, values, setValue } = props;
  const classes = useStyles();
  const classesChip = useStylesChip();
  const attributeValues = attributes[idx].values || [];
  const value = values.filter((item) => attributeValues.includes(item.slug));

  const removeValues = (slug) => {
    const oldAttributes = [...attributes];
    const oldValues = oldAttributes[idx].values;
    oldAttributes[idx].values = oldValues.filter((item) => item !== slug);
    setValue("attributes", oldAttributes);
  };

  return (
    <div className={classesChip.root}>
      <Autocomplete
        multiple
        classes={{ inputRoot: classes.inputRoot, input: classes.input }}
        options={values}
        value={value}
        getOptionLabel={(item) => item.name}
        renderTags={() => null}
        renderOption={(option, { selected }) => {
          return (
            <React.Fragment>
              <Checkbox
                size="small"
                style={{ marginRight: 8 }}
                checked={selected}
                color="primary"
              />
              {option.name}
            </React.Fragment>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="AttributeValues" />
        )}
        onChange={(_, value) => {
          const oldAttributes = [...attributes];
          oldAttributes[idx].values = value.map((item) => item.slug);
          setValue("attributes", oldAttributes);
        }}
      />
      <div className={classesChip.root}>
        {value.map((item) => (
          <Chip
            className={classesChip.chip}
            key={item.id}
            label={item.name}
            onDelete={() => {
              removeValues(item.slug);
            }}
            color="primary"
          />
        ))}
      </div>
    </div>
  );
};
