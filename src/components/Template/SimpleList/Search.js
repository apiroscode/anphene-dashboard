import React, { useEffect, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DELAYED_TIMEOUT } from "@/config/constants";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& input": {
        padding: "10.5px 12px",
        "&::placeholder": {
          transition: ".2s ease",
          color: "transparent",
        },
        "&:focus::placeholder": {
          color: "inherit",
        },
      },
    },
  }),
  { name: "SimpleListFilterSearch" }
);

export const Search = (props) => {
  const { rawVariables, variables, setVariables, loading, placeholder } = props;
  const classes = useStyles();

  const [val, setVal] = useState("");

  const [searchDebounce] = useDebouncedCallback((value) => {
    setVariables({
      ...rawVariables,
      sortDirection: variables.sortDirection,
      sortField: variables.sortField,
      search: value ? value : undefined,
    });
  }, DELAYED_TIMEOUT);

  useEffect(() => {
    if (variables.search === undefined) {
      setVal("");
    } else {
      setVal(variables.search);
    }
  }, [variables.search]);

  return (
    <TextField
      value={val}
      disabled={loading}
      placeholder={`Search ${placeholder}`}
      className={classes.root}
      fullWidth
      onChange={(e) => {
        const value = e.target.value;
        setVal(value);
        searchDebounce(value);
      }}
    />
  );
};
