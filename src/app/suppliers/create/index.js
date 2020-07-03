import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateSupplier } from "../mutations";
import { schema, SupplierInformation } from "../_form";

export default () => {
  const [create] = useMutation(CreateSupplier);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        supplierCreate: { supplier, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Supplier ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${supplier.id}`);
    }
  };

  return (
    <>
      <Header title="Create Supplier" />
      <RowGrid>
        <SupplierInformation {...methods} />
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
