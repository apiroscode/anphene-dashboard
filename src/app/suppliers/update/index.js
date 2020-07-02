import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { Header } from "@/components/Header";
import { QueryWrapper } from "@/components/QueryWrapper";
import { RowGrid } from "@/components/RowGrid";

import { getSupplier } from "../queries";
import { DeleteSupplier, UpdateSupplier } from "../mutations";

import { SupplierInformation, schema } from "../_form";

const getDefaultValues = (supplier) => ({
  name: supplier.name,
  email: supplier.email,
  phone: supplier.phone,
  address: supplier.address,
});

const Base = ({ supplier }) => {
  const [update] = useMutation(UpdateSupplier);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DeleteSupplier,
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
        <SupplierInformation {...methods} />
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
    <QueryWrapper query={getSupplier} id={id} fieldName="supplier">
      {(data) => <Base supplier={data.supplier} />}
    </QueryWrapper>
  );
};
