import React, { useEffect } from "react";

import { Chip, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import { Checkbox } from "@/components/Checkbox";

import { useStyles } from "./styles";

const useStylesCollections = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      display: "flex",
      justifyContent: "space-between",
    },
    "&>:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
}));

export const Collections = (props) => {
  const { collections, watch, register, unregister, setValue } = props;
  const classes = useStyles();
  const classesCollection = useStylesCollections();
  const collectionsValue = watch("collections");
  const value = collections.filter((item) => collectionsValue.includes(item.node.id));

  useEffect(() => {
    register("collections");
    return () => {
      unregister("collections");
    };
  }, [register, unregister]);

  const removeCollection = (id) => {
    setValue(
      "collections",
      collectionsValue.filter((item) => item !== id),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <>
      <Autocomplete
        multiple
        disableCloseOnSelect
        classes={{ inputRoot: classes.inputRoot, input: classes.input }}
        options={collections}
        value={value}
        getOptionLabel={(item) => item?.node?.name}
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
              {option?.node?.name}
            </React.Fragment>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Collections"
            helperText="*Optional. Adding product to collection helps users find it."
          />
        )}
        onChange={(_, value) => {
          setValue(
            "collections",
            value.map((item) => item.node.id),
            { shouldValidate: true, shouldDirty: true }
          );
        }}
      />
      <div className={classesCollection.root}>
        {value.map((item) => (
          <Chip
            key={item.node.id}
            label={item.node.name}
            onDelete={() => {
              removeCollection(item.node.id);
            }}
            color="primary"
          />
        ))}
      </div>
    </>
  );
};
