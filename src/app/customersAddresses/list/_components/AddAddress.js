import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors } from "@/components/_form";
import { Dialog } from "@/components/Dialog";

import { CreateAddress } from "../../mutations";

import { schema } from "./schema";
import { AddressForm } from "./AddressForm";

const defaultValues = {
  name: "",
  phone: "",
  streetAddress: "",
  postalCode: "",
  subDistrict: "",
};
export const ACTION = "add-address";
export const AddAddress = (props) => {
  const { customerId, handleClose, params } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateAddress);
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

  const onSubmit = async (data) => {
    const result = await create({
      variables: {
        userId: customerId,
        input: data,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        addressCreate: { errors },
      },
    } = result;
    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Address ${data.name} successfully created.`, {
        variant: "success",
      });
      handleClose();
      reset(defaultValues);
    }
  };

  return (
    <Dialog
      title="Create Address"
      open={params.action === ACTION}
      handleOk={handleSubmit(onSubmit)}
      handleClose={handleClose}
      okText="CREATE"
      okProps={{
        loading: isSubmitting,
        disabled: !isDirty,
      }}
      cancelProps={{
        loading: isSubmitting,
      }}
    >
      <AddressForm {...methods} />
    </Dialog>
  );
};
