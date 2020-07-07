import React, { useMemo } from "react";

import { useSnackbar } from "notistack";

import { useMutation } from "@/utils/hooks";
import { Dialog } from "@/components/Dialog";

import { DeleteAddress as DeleteAddressMutation } from "../../mutations";

export const ACTION = "delete-address";
export const DeleteAddress = (props) => {
  const { addresses, handleClose, params } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading }] = useMutation(DeleteAddressMutation);

  const address = useMemo(() => {
    return addresses.find((address) => address.id === params.id);
  }, [params.id, addresses]);

  const onSubmit = async () => {
    const name = address.name;
    const result = await deleteMutation({
      variables: {
        id: params.id,
      },
    });
    if (result === undefined) return;
    enqueueSnackbar(`Address ${name} successfully deleted.`, {
      variant: "success",
    });
    handleClose();
  };

  return (
    <Dialog
      title={`Delete address ${address && address.name}`}
      open={params.action === ACTION}
      handleOk={onSubmit}
      handleClose={handleClose}
      okText="DELETE"
      okStyle="error"
      okProps={{
        loading: loading,
      }}
      cancelProps={{
        loading: loading,
      }}
      content={
        <>
          Are you sure you want to delete <strong>{address && address.name}</strong>?
        </>
      }
    />
  );
};
