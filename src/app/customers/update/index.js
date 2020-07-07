import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { GetCustomer } from "../queries";
import { DeleteCustomer, UpdateCustomer } from "../mutations";

import { AddressInformation, CustomerHistory, RecentOrders } from "./_components";
import { UserInformation } from "./_form";

const schema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  note: yup.string(),
});

const getDefaultValues = (customer) => ({
  email: customer.email,
  isActive: customer.isActive,
  note: customer.note,
});

export const Base = ({ customer }) => {
  const [update] = useMutation(UpdateCustomer);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteCustomer,
    id: customer.id,
    name: customer.email,
    field: "customerDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(customer),
    resolver: yupResolver(schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({
      variables: {
        id: customer.id,
        input: data,
      },
    });
    if (result === undefined) return;

    const {
      data: {
        customerUpdate: { user: updatedUser, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Customer ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedUser));
    }
  };

  return (
    <>
      <Header title={customer.email} />
      <ColGrid>
        <RowGrid>
          <UserInformation customer={customer} {...methods} />
          <RecentOrders />
        </RowGrid>
        <RowGrid>
          <AddressInformation address={customer.defaultShippingAddress} />
          <CustomerHistory lastLogin={customer.lastLogin} />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
    </>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GetCustomer} id={id} fieldName="user">
      {(data) => <Base customer={data.user} />}
    </QueryWrapper>
  );
};
