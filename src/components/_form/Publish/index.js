import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

import { FormControlLabel, Link, Radio, RadioGroup, TextField } from "@material-ui/core";

import { Card } from "../../Card";

export const Publish = (props) => {
  const {
    control,
    setValue,
    register,
    unregister,
    publish = false,
    date = null,
    addOn = null,
  } = props;
  const [open, setOpen] = useState(!!date);
  const isPublished = useWatch({
    control,
    name: "isPublished",
    defaultValue: publish,
  });
  const publicationDate = useWatch({
    control,
    name: "publicationDate",
    defaultValue: date,
  });

  useEffect(() => {
    register("isPublished");
    register("publicationDate");
    return () => {
      unregister("isPublished");
      unregister("publicationDate");
    };
  }, [register, unregister]);

  const handleIsPublishedChange = (e) => {
    setValue("isPublished", e.target.value === "true", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handlePublicationDateChange = (e) => {
    setValue("publicationDate", e.target.value, { shouldValidate: true, shouldDirty: true });
  };

  const handleClickOpen = () => {
    if (open) {
      setOpen(false);
      setValue("publicationDate", null, { shouldValidate: true, shouldDirty: true });
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
      {addOn}
    </Card>
  );
};
