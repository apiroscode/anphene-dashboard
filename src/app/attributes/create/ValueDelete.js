import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { Dialog } from "@/components/Dialog";

export const ValueDelete = (props) => {
  const { setValue, values, name, idx } = props;
  const [open, setOpen] = useState(false);

  const remove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const newData = [...values.slice(0, idx), ...values.slice(idx + 1)];
    setValue("values", newData);
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        handleOk={remove}
        handleClose={handleClose}
        title={`Delete ${name}`}
        content={`Are you sure you want to delete "${name}" value?`}
        okText="DELETE"
        okStyle="error"
      />
    </>
  );
};
