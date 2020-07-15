import React, { useEffect, useMemo } from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors } from "@/components/_form";
import { Dialog } from "@/components/Dialog";

import { UpdateAddress } from "../../mutations";

import { schema } from "./schema";
import { AddressForm } from "./AddressForm";

const getAddress = (address) => ({
  name: address.name,
  phone: address.phone,
  streetAddress: address.streetAddress,
  postalCode: address.postalCode,
  subDistrict: address.subDistrict.id,
});

const defaultValues = {
  name: "",
  phone: "",
  streetAddress: "",
  postalCode: "",
  subDistrict: "",
};
export const ACTION = "edit-address";
export const EditAddress = (props) => {
  const { addresses, handleClose, params } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [update] = useMutation(UpdateAddress);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isDirty, isSubmitting },
  } = methods;

  const address = useMemo(() => {
    return addresses.find((address) => address.id === params.id);
  }, [params.id, addresses]);

  useEffect(() => {
    if (address) {
      reset(getAddress(address));
    }
  }, [address, reset]);

  const onSubmit = async (data) => {
    const result = await update({
      variables: {
        id: params.id,
        input: data,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        addressUpdate: { errors },
      },
    } = result;
    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Address ${data.name} successfully updated.`, {
        variant: "success",
      });
      handleClose();
    }
  };

  return (
    <Dialog
      title="Edit Address"
      open={params.action === ACTION}
      handleOk={handleSubmit(onSubmit)}
      handleClose={handleClose}
      okText="UPDATE"
      okProps={{
        loading: isSubmitting,
        disabled: !isDirty,
      }}
      cancelProps={{
        loading: isSubmitting,
      }}
    >
      <AddressForm {...methods} address={address} />
    </Dialog>
  );
};
