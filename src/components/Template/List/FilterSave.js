import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";

import { Dialog } from "@/components/Dialog";

export const FilterSave = (props) => {
  const {
    tabValue,
    setTabValue,
    handleTabChange,
    storageFilter,
    setStorageFilter,
    params,
    filterParams,
  } = props;
  const [open, setOpen] = useState(false);
  const [newNameFilter, setNewNameFilter] = useState("");
  const [error, setError] = useState("");
  const isNew = tabValue === "custom";

  const handleClose = () => {
    setNewNameFilter("");
    setError("");
    setOpen(false);
  };

  const handleSave = () => {
    const checkKeys = storageFilter.map((item) => item.name.toLowerCase());
    if (checkKeys.includes(newNameFilter.toLowerCase())) {
      setError("Duplicate name.");
    } else {
      setStorageFilter([
        ...storageFilter,
        {
          name: newNameFilter,
          data: Object.keys(filterParams)
            .filter((key) => params[key] !== undefined)
            .reduce((o, key) => ({ ...o, [key]: params[key] }), {}),
        },
      ]);
      setTabValue(newNameFilter);
      handleClose();
    }
  };

  const handleDelete = () => {
    setStorageFilter(storageFilter.filter((item) => item.name !== tabValue));
    handleClose();
    handleTabChange(null, "all");
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        {isNew ? "SAVE SEARCH" : "DELETE SEARCH"}
      </Button>
      {isNew ? (
        <Dialog
          title="Save Custom Search"
          open={open}
          handleClose={handleClose}
          handleOk={handleSave}
        >
          <TextField
            label="Search name"
            fullWidth
            error={!!error}
            helperText={error}
            value={newNameFilter}
            onChange={(e) => setNewNameFilter(e.target.value)}
          />
        </Dialog>
      ) : (
        <Dialog
          title="Delete Search"
          open={open}
          handleClose={handleClose}
          handleOk={handleDelete}
          okText="DELETE"
          okStyle="error"
          content={
            <>
              Are you sure you want to delete <strong>{tabValue}</strong> search tab?
            </>
          }
        />
      )}
    </>
  );
};
