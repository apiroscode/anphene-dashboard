import React, { useEffect, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DELAYED_TIMEOUT } from "@/config/constants";

const useStyles = makeStyles(
  () => ({
    root: {
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
  { name: "FilterSearch" }
);

export const FilterSearch = (props) => {
  const { appName, params, setParams, loading, setTabValue } = props;
  const classes = useStyles();
  const [val, setVal] = useState("");

  const [searchDebounce] = useDebouncedCallback((value) => {
    setParams({ search: value ? value : undefined });
    setTabValue("custom");
  }, DELAYED_TIMEOUT);

  useEffect(() => {
    if (params.search === undefined) {
      setVal("");
    } else {
      setVal(params.search);
    }
  }, [params.search]);

  return (
    <TextField
      value={val}
      disabled={loading}
      placeholder={`Search ${appName}`}
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
