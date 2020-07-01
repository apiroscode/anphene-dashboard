import React from "react";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () => ({
    input: {
      display: "none",
    },
  }),
  { name: "ButtonUpload" }
);

export const ButtonUpload = ({ handleImageUpload, multiple }) => {
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        onChange={(e) => {
          e.preventDefault();
          handleImageUpload(e.target.files);
        }}
        className={classes.input}
        id="button-file"
        multiple={!!multiple}
        type="file"
      />
      <label htmlFor="button-file">
        <Button color="primary" component="span">
          UPLOAD IMAGE
        </Button>
      </label>
    </>
  );
};
