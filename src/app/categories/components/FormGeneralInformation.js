import React from "react";
import { Card } from "@/components/Template";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { RichTextEditor } from "@/components/form/RichTextEditor";

export const FormGeneralInformation = (props) => {
  const { control, errors, category } = props;

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Category Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        as={RichTextEditor}
        control={control}
        initial={category && category.description}
        name="description"
        label="Description"
        fullWidth
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Card>
  );
};
