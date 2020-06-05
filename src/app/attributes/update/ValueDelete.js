import React from "react";

import { useSnackbar } from "notistack";

import { useMutation } from "@/utils/hooks";

import { DELETE_ATTRIBUTE_VALUE } from "@/graphql/mutations/attributes";

import { Dialog } from "@/components/Dialog";

export const ValueDelete = (props) => {
  const {
    deleteValue: { open, valueId, name },
    setDeleteValue,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading }] = useMutation(DELETE_ATTRIBUTE_VALUE);

  const remove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const result = await deleteMutation({ variables: { id: valueId } });
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
      enqueueSnackbar(`Value ${name} successfully deleted.`, {
        variant: "success",
      });
      setDeleteValue({
        open: false,
        valueId: null,
        name: "",
      });
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setDeleteValue({
      open: false,
      valueId: null,
      name: "",
    });
  };

  return (
    <Dialog
      open={open}
      handleOk={remove}
      handleClose={handleClose}
      title={`Delete ${name}`}
      content={`Are you sure you want to delete "${name}" value?`}
      okText="DELETE"
      okStyle="error"
      okProps={{ loading }}
      cancelProps={{ loading }}
    />
  );
};
