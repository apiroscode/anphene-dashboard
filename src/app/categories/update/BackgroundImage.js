import React, { useEffect } from "react";

import { Button, Divider, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";
import { ImageTile, ImageUpload } from "@/components/image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () => ({
    input: {
      display: "none",
    },
  }),
  { name: "BackgroundImageCategories" }
);

export const BackgroundImage = (props) => {
  const {
    category: { id, backgroundImage: image },
    update,
    handleSubmit,
    enqueueSnackbar,
    setValue,
    errors,
    watch,
    register,
    unregister,
    reset,
  } = props;
  const backgroundImageAlt = watch("backgroundImageAlt");
  const classes = useStyles();

  useEffect(() => {
    register("backgroundImageAlt");

    return () => {
      unregister("backgroundImageAlt");
    };
  }, [register, unregister]);

  const submitUpload = async (backgroundImage) => {
    const result = await update({
      variables: {
        id: id,
        input: { backgroundImage, backgroundImageAlt: "" },
      },
      ignoreResults: true,
    });
    if (result === undefined) return;

    const {
      data: {
        categoryUpdate: { category: updatedCategory, errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(
        `Category ${updatedCategory.name} image successfully ${
          backgroundImage === null ? "deleted" : "updated"
        }.`,
        {
          variant: "success",
        }
      );
      reset({
        name: updatedCategory.name,
        description: updatedCategory.description,
        seo: {
          title: updatedCategory.seoTitle,
          description: updatedCategory.seoDescription,
        },
        backgroundImageAlt: updatedCategory?.backgroundImage?.alt || "",
      });
    }
  };

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
