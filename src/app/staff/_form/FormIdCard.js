import React, { useState } from "react";

import { Button, FormControl, FormHelperText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    input: {
      display: "none",
    },
    previewRoot: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "& > *:first-child": {
        marginBottom: theme.spacing(2),
      },
      "& > img": {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        maxWidth: "100%",
        cursor: "pointer",
      },
    },
  }),
  { name: "ID_CARD" }
);

export const FormIdCard = (props) => {
  const { errors, idCard, setValue, idCardUrl } = props;
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(idCardUrl ? idCardUrl : "");

  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setValue("idCard", e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openImage = () => {
    const image = new Image();
    image.src = imageUrl;

    const w = window.open("");
    w.document.write(image.outerHTML);
    w.document.close();
  };

  return (
    <Card title="ID Card" useMargin>
      <FormControl>
        <input
          accept="image/*"
          onChange={onChange}
          className={classes.input}
          id="button-file"
          multiple
          type="file"
        />
        <label htmlFor="button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <FormHelperText error={!!errors.idCard}>
          {!!errors.idCard ? errors.idCard?.message : idCard && idCard.name}
        </FormHelperText>
      </FormControl>
      {imageUrl && (
        <div className={classes.previewRoot}>
          <Typography variant="body1">Preview</Typography>
          <img src={imageUrl} alt="Id Card" onClick={openImage} />
        </div>
      )}
    </Card>
  );
};
