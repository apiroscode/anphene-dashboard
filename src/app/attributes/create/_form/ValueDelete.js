import React from "react";

import { Dialog } from "@/components/Dialog";

const ACTION = "delete-value";
export const ValueDelete = (props) => {
  const { values, setValue, params, handleClose } = props;
  const { action, id } = params;
  const value = values[id];

  const remove = () => {
    const newData = [...values.slice(0, id), ...values.slice(id + 1)];
    setValue("values", newData, { shouldValidate: true, shouldDirty: true });
    handleClose();
  };

  return (
    <Dialog
      open={action === ACTION}
      handleOk={remove}
      handleClose={handleClose}
      title={`Delete ${value?.name}`}
      content={`Are you sure you want to delete "${value?.name}" value?`}
      okText="DELETE"
      okStyle="error"
    />
  );
};
