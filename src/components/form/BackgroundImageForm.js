import React, { useEffect } from "react";

import { Divider, TextField } from "@material-ui/core";

import { ImageTile, ImageUpload } from "@/components/image";
import { ButtonUpload } from "@/components/Button/ButtonUpload";
import { Card } from "@/components/Template";

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
    multiple = false,
  } = props;
  const backgroundImageAlt = watch("backgroundImageAlt");

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

  return (
    <Card
      title="Background Image (optional)"
      useMargin
      useDense={image === null}
      action={<ButtonUpload handleImageUpload={handleUpload} />}
    >
      {image === null ? (
        <ImageUpload onImageUpload={handleUpload} multiple={multiple} />
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
