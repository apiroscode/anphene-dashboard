import React, { useEffect } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@/components/Template";
import { ImageTile, ImageUpload } from "@/components/image";

const useStyles = makeStyles(
  () => ({
    input: {
      display: "none",
    },
  }),
  { name: "BackgroundImage" }
);

export const BackgroundImageForm = (props) => {
  const {
    image,
    handleSubmit,
    setValue,
    errors,
    watch,
    register,
    unregister,
    submitUpload,
  } = props;
  const backgroundImageAlt = watch("backgroundImageAlt");
  const classes = useStyles();

  useEffect(() => {
    register("backgroundImageAlt");

    return () => {
      unregister("backgroundImageAlt");
    };
  }, [register, unregister]);

  const handleUpload = (files) => {
    const backgroundImage = files[0];
    handleSubmit(() => submitUpload(backgroundImage))();
  };

  const handleImageDelete = () => {
    handleSubmit(() => submitUpload(null))();
  };

  const handleImageButton = (e) => {
    e.preventDefault();
    const backgroundImage = e.target.files[0];
    handleSubmit(() => submitUpload(backgroundImage))();
  };

  return (
    <Card
      title="Background Image (optional)"
      useMargin
      useDense={image === null}
      action={
        <>
          <input
            accept="image/*"
            onChange={handleImageButton}
            className={classes.input}
            id="button-file"
            multiple
            type="file"
          />
          <label htmlFor="button-file">
            <Button color="primary" component="span">
              UPLOAD IMAGE
            </Button>
          </label>
        </>
      }
    >
      {image === null ? (
        <ImageUpload onImageUpload={handleUpload} />
      ) : (
        <>
          <ImageTile image={image} onImageDelete={handleImageDelete} />
          <Divider />
          <TextField
            label="Description"
            fullWidth
            error={!!errors.backgroundImageAlt}
            value={backgroundImageAlt}
            onChange={(e) => setValue("backgroundImageAlt", e.target.value.slice(0, 299))}
            helperText={
              !!errors.backgroundImageAlt ? errors.backgroundImageAlt?.message : "(Optional)"
            }
          />
        </>
      )}
    </Card>
  );
};
