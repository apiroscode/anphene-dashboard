import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import { Card } from "@/components/Template";

export const SeoForm = (props) => {
  const { errors, setValue, register, unregister, watch } = props;
  const [open, setOpen] = useState(false);
  const seoTitle = watch("seo.title");
  const seoDescription = watch("seo.description");
  const helperText = "If empty, the preview shows what will be autogenerated.";

  useEffect(() => {
    register("seo.title");
    register("seo.description");

    return () => {
      unregister("seo.title");
      unregister("seo.description");
    };
  }, [register, unregister]);

  return (
    <Card
      title="Search Engine Preview"
      useMargin
      action={
        <Button color="primary" onClick={() => setOpen(!open)}>
          EDIT WEBSITE SEO
        </Button>
      }
    >
      <Typography variant="body1">
        Add search engine title and description to make this category easier to find
      </Typography>
      {open && (
        <>
          <TextField
            label="Search engine title"
            fullWidth
            error={!!errors?.seo?.title}
            helperText={
              !!errors?.seo?.title
                ? errors.seo?.title?.message
                : `${helperText} Max 70 characters.`
            }
            value={seoTitle}
            onChange={(e) => setValue("seo.title", e.target.value.slice(0, 69))}
          />
          <TextField
            label="Search engine description"
            fullWidth
            multiline
            rows={10}
            error={!!errors.seo?.description}
            value={seoDescription}
            onChange={(e) => setValue("seo.description", e.target.value.slice(0, 299))}
            helperText={
              !!errors.seo?.description
                ? errors.seo?.description?.message
                : `${helperText} Max 300 characters.`
            }
          />
        </>
      )}
    </Card>
  );
};
