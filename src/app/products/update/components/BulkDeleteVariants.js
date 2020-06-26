import React from "react";

import { useSnackbar } from "notistack";

import { GET_PRODUCT } from "@/graphql/queries/products";

import { Dialog } from "@/components/Dialog";

export const ACTION = "bulk-delete-variants";
export const BulkDeleteVariants = (props) => {
  const { params, handleClose, variants, loading, setSelected, bulkDelete, productId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { action, ids } = params;

  const handleBulkDelete = async () => {
    const result = await bulkDelete({
      variables: { ids },
      refetchQueries: [{ query: GET_PRODUCT, variables: { id: productId } }],
    });
    if (result === undefined) return;

    const {
      data: {
        productVariantBulkDelete: { errors },
      },
    } = result;

    if (errors.length > 0) {
      enqueueSnackbar(errors[0].message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${ids.length} variants delete.`, {
        variant: "success",
      });
      setSelected([]);
      handleClose();
    }
  };

  const contentText = ids ? (
    ids.length === 1 ? (
      <strong>{variants.find((x) => x.id === ids[0])?.name}</strong>
    ) : (
      "these variants"
    )
  ) : (
    ""
  );
  return (
    <Dialog
      open={action === ACTION}
      handleOk={handleBulkDelete}
      handleClose={handleClose}
      title="Unassign Attribute From Product Type"
      okText="DELETE"
      okProps={{
        loading: loading,
      }}
      cancelProps={{
        disabled: loading,
      }}
      content={
        <>
          Are you sure you want to unassign <strong>{contentText}</strong>?
        </>
      }
    />
  );
};
