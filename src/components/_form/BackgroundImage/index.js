import React, { useEffect } from "react";

import { useWatch } from "react-hook-form";

import { Divider, TextField } from "@material-ui/core";

import { ButtonUpload } from "../../ButtonUpload";
import { Card } from "../../Card";
import { ImageTile } from "../../ImageTile";
import { ImageUpload } from "../../ImageUpload";

export const BackgroundImage = (props) => {
  const {
    image,
    handleSubmit,
    setValue,
    errors,
    control,
    register,
    unregister,
    submitUpload,
    multiple = false,
  } = props;
  const backgroundImageAlt = useWatch({ control, name: "backgroundImageAlt", defaultValue: "" });

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
            onChange={(e) =>
              setValue("backgroundImageAlt", e.target.value.slice(0, 299), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            helperText={
              !!errors.backgroundImageAlt ? errors.backgroundImageAlt?.message : "(Optional)"
            }
          />
        </>
      )}
    </Card>
  );
};
