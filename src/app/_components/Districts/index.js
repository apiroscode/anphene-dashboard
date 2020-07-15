import React from "react";

import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

export const useStyles = makeStyles(
  () => ({
    inputRoot: {
      padding: "0 65px 0 0 !important",
    },
    input: {
      padding: "23px 12px 10px 12px !important",
    },
  }),
  { name: "Districts" }
);

export const Districts = (props) => {
  const {
    label,
    options,
    loading,
    selected,
    setSelected,
    error,
    helperText,
    isProvince,
    onChange,
  } = props;
  const classes = useStyles();

  return (
    <Autocomplete
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      disabled={!isProvince && options.length === 0}
      options={options}
      loading={loading}
      value={selected}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Select ${label}`}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          error={error}
          helperText={helperText}
        />
      )}
      onChange={(_, value) => {
        setSelected({ [label.toLowerCase()]: value });
        onChange && onChange();
      }}
    />
  );
};
