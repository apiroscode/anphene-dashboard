import React, { useEffect, useState } from "react";

import { MenuItem, Select, TextField, Typography } from "@material-ui/core";

import { Arrow } from "./Arrow";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      "&>*:first-child": {
        marginBottom: theme.spacing(1),
      },
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      "&>:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },
    input: {
      padding: "10px 12px 10px 12px",
    },
  }),
  { name: "FilterRange" }
);

export const FilterRange = (props) => {
  const { filter, tempFilter, setTempFilter, filterType } = props;
  const classes = useStyles();
  const [state, setState] = useState("equal");
  const fromValue = tempFilter[`${filter.field}From`];
  const toValue = tempFilter[`${filter.field}To`];

  useEffect(() => {
    if (fromValue !== toValue) {
      setState("between");
    } else {
      setState("equal");
    }
  }, [fromValue, toValue]);

  const handleRangeChange = (value, field) => {
    if (state === "equal") {
      setTempFilter({
        [`${filter.field}From`]: value,
        [`${filter.field}To`]: value,
      });
    } else {
      if (field === "From") {
        setTempFilter({
          [`${filter.field}From`]: value,
          [`${filter.field}To`]: toValue ? toValue : value,
        });
      } else {
        setTempFilter({
          [`${filter.field}From`]: fromValue ? fromValue : value,
          [`${filter.field}To`]: value,
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Select
        value={state}
        onChange={(e) => setState(e.target.value)}
        variant="outlined"
        fullWidth
        classes={{
          root: classes.input,
        }}
      >
        <MenuItem value="equal">equal to</MenuItem>
        <MenuItem value="between">between</MenuItem>
      </Select>
      <div className={classes.wrapper}>
        <Arrow />
        <TextField
          type={filterType}
          value={fromValue}
          onChange={(e) => handleRangeChange(e.target.value, "From")}
          InputProps={{
            classes: {
              input: classes.input,
            },
          }}
        />
        {state === "between" && (
          <>
            <Typography>and</Typography>
            <TextField
              type={filterType}
              value={toValue}
              onChange={(e) => handleRangeChange(e.target.value, "To")}
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
