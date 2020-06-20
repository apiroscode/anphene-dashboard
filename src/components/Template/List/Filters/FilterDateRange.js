import React, { useEffect, useState } from "react";

import { MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import createSvgIcon from "@material-ui/icons/utils/createSvgIcon";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      "&>*:first-child": {
        marginBottom: theme.spacing(1),
      },
    },
    rootDate: {
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
  { name: "FilterDateRange" }
);

const Arrow = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M13.5858 17.1357L-1.37065e-07 17.1357L-1.37065e-07 15L-1.37064e-07 0L2 -8.74228e-08L2 15.1357L13.5858 15.1357L11.8643 13.4142L13.2785 12L17.4142 16.1357L13.2785 20.2714L11.8643 18.8571L13.5858 17.1357Z"
    fill="#3D3D3D"
  />,
  "Arrow"
);

export const FilterDateRange = (props) => {
  const { filter, tempFilter, setTempFilter } = props;
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

  const handleDateChange = (value, field) => {
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
      <div className={classes.rootDate}>
        <Arrow />
        <TextField
          type="date"
          value={fromValue}
          onChange={(e) => handleDateChange(e.target.value, "From")}
          InputLabelProps={{
            shrink: true,
          }}
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
              type="date"
              value={toValue}
              onChange={(e) => handleDateChange(e.target.value, "To")}
              InputLabelProps={{
                shrink: true,
              }}
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
