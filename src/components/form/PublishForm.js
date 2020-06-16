import React, { useEffect, useState } from "react";

import { FormControlLabel, Link, Radio, RadioGroup, TextField } from "@material-ui/core";

import { Card } from "@/components/Template";

export const PublishForm = (props) => {
  const { watch, setValue, register, unregister, publicationDateData } = props;
  const [open, setOpen] = useState(!!publicationDateData);
  const isPublished = watch("isPublished");
  const publicationDate = watch("publicationDate");

  useEffect(() => {
    register("isPublished");
    register("publicationDate");
    return () => {
      unregister("isPublished");
      unregister("publicationDate");
    };
  }, [register, unregister]);

  const handleIsPublishedChange = (e) => {
    setValue("isPublished", e.target.value === "true");
  };

  const handlePublicationDateChange = (e) => {
    setValue("publicationDate", e.target.value);
  };

  const handleClickOpen = () => {
    if (open) {
      setOpen(false);
      setValue("publicationDate", null);
    } else {
      setOpen(true);
    }
  };
  return (
    <Card title="Visibility" useMargin>
      <RadioGroup value={isPublished ? "true" : "false"} onChange={handleIsPublishedChange}>
        <FormControlLabel value="true" control={<Radio color="primary" />} label="Visible" />
        <FormControlLabel value="false" control={<Radio color="primary" />} label="Hidden" />
      </RadioGroup>
      <Link component="button" variant="body2" underline="always" onClick={handleClickOpen}>
        Set publication date
      </Link>
      {open && (
        <TextField
          id="datetime-local"
          label="Publish on"
          type="date"
          fullWidth
          value={publicationDate === null ? "" : publicationDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handlePublicationDateChange}
        />
      )}
    </Card>
  );
};
