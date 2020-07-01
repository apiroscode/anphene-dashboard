import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { GET_SUPPLIER } from "@/graphql/queries/suppliers";
import { DELETE_SUPPLIER, UPDATE_SUPPLIER } from "@/graphql/mutations/suppliers";

import { getErrors, SaveButton } from "@/components/form";
import { Header, QueryWrapper, RowGrid } from "@/components/Template";

import { FormSupplierInformation, schema } from "../components";

const getDefaultValues = (supplier) => ({
  name: supplier.name,
  email: supplier.email,
  phone: supplier.phone,
  address: supplier.address,
});

const Base = ({ supplier }) => {
  const [update] = useMutation(UPDATE_SUPPLIER);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_SUPPLIER,
    id: supplier.id,
    name: supplier.name,
    field: "supplierDelete",
  };

  const methods = useForm({
    defaultValues: getDefaultValues(supplier),
    resolver: yupResolver(schema),
  });
  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: supplier.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        supplierUpdate: { supplier: updatedSupplier, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Supplier ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset(getDefaultValues(updatedSupplier));
    }
  };

  return (
    <>
      <Header title={`Update ${supplier.name}`} />
      <RowGrid>
        <FormSupplierInformation {...methods} />
      </RowGrid>
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
    <QueryWrapper query={GET_SUPPLIER} id={id} fieldName="supplier">
      {(data) => <Base supplier={data.supplier} />}
    </QueryWrapper>
  );
};
