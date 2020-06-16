import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { RichTextEditor } from "@/components/form";
import { Card } from "@/components/Template";

export const FormGeneralInformation = (props) => {
  const { control, errors, collection } = props;

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Collection Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        as={RichTextEditor}
        control={control}
        initial={collection && collection.description}
        name="description"
        label="Description"
        fullWidth
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Card>
  );
};
