import React from "react";

import { useSnackbar } from "notistack";

import { Dialog } from "@/components/Dialog";

export const ACTION = "unassign-attributes";
export const AttributesUnAssign = (props) => {
  const {
    params,
    handleClose,
    attributes,
    type,
    loading,
    setSelected,
    unAssign,
    productTypeId,
    productTypeName,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { action, ids, type: typeParams } = params;

  const handleUnAssign = async () => {
    const result = await unAssign({ variables: { productTypeId, attributeIds: ids } });
    if (result === undefined) return;

    const {
      data: {
        attributeUnassign: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${ids.length} attributes unassign.`, {
        variant: "success",
      });
      setSelected([]);
      handleClose();
    }
  };

  const contentText = ids ? (
    ids.length === 1 ? (
      <strong>{attributes.find((x) => x.id === ids[0])?.name}</strong>
    ) : (
      "these attributes"
    )
  ) : (
    ""
  );

  return (
    <Dialog
      open={action === ACTION && type === typeParams}
      handleOk={handleUnAssign}
      handleClose={handleClose}
      title="Unassign Attribute From Product Type"
      okText="UNASSIGN"
      okProps={{
        loading: loading,
      }}
      cancelProps={{
        disabled: loading,
      }}
      content={
        <>
          Are you sure you want to unassign {contentText} <strong>{productTypeName}</strong>?
        </>
      }
    />
  );
};
