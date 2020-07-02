import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { RichTextEditor } from "@/components/_form";
import { Card } from "@/components/Card";

export const GeneralInformation = (props) => {
  const { control, errors, page } = props;

  return (
    <Card title="General Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="title"
        label="Title"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Controller
        as={RichTextEditor}
        control={control}
        initial={page?.content}
        name="content"
        label="Content"
        fullWidth
        error={!!errors.content}
        helperText={errors.content?.message}
      />
    </Card>
  );
};
