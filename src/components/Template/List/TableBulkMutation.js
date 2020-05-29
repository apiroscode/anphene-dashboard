import React, { useState } from "react";

import { capitalize, IconButton, Tooltip } from "@material-ui/core";

import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

export const TableBulkMutation = (props) => {
  const { item, selected, setSelected, appName, pluralAppName, params, query } = props;
  const [open, setOpen] = useState(false);

  const labelCapitalize = capitalize(item.label);
  let textNumber = "this",
    textAppName = appName.toLowerCase();

  if (selected.length > 1) {
    textNumber = <strong>{selected.length}</strong>;
    textAppName = pluralAppName.toLowerCase();
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelected([]);
    setOpen(false);
  };
  const handleMutation = () => {
    item.mutation({
      variables: { ids: selected },
      refetchQueries: [{ query, variables: params }],
    });
    handleClose();
  };

  return (
    <>
      <Tooltip title={labelCapitalize} key={item.label}>
        {item.type === "icon" ? (
          <IconButton aria-label={item.label} onClick={handleOpen}>
            {item.icon}
          </IconButton>
        ) : (
          <Button aria-label={item.label} onClick={handleOpen}>
            {item.label.toUpperCase()}
          </Button>
        )}
      </Tooltip>
      <Dialog
        open={open}
        handleClose={handleClose}
        handleOk={handleMutation}
        title={`${labelCapitalize} ${pluralAppName}`}
        content={
          <span>
            Are you sure you want to {item.label.toLowerCase()} {textNumber} {textAppName} ?
          </span>
        }
        okText={item.label.toUpperCase()}
        okStyle="error"
        cancelText="CANCEL"
      />
    </>
  );
};
