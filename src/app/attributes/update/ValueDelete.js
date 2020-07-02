import React from "react";

import { useSnackbar } from "notistack";

import { useMutation } from "@/utils/hooks";

import { Dialog } from "@/components/Dialog";

import { DeleteAttributeValue } from "../mutations";

const ACTION = "delete-value";
export const ValueDelete = (props) => {
  const { attributeValues, params, handleClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading }] = useMutation(DeleteAttributeValue);
  const { action, id } = params;
  const value = attributeValues.find((x) => x.id === id);

  const remove = async () => {
    const result = await deleteMutation({ variables: { id } });
    if (result === undefined) return;

    const {
      data: {
        attributeValueDelete: { errors },
      },
    } = result;
    if (errors.length > 1) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Value ${value?.name} successfully deleted.`, {
        variant: "success",
      });
      handleClose();
    }
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
      okProps={{ loading }}
      cancelProps={{ loading }}
    />
  );
};
