import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_SUPPLIER } from "@/graphql/mutations/suppliers";

import { getErrors, SaveButton } from "@/components/form";
import { Header, RowGrid } from "@/components/Template";

import { FormSupplierInformation, schema } from "../components";

export default () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_SUPPLIER);

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
      setError(getErrors(errors));
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
        <FormSupplierInformation {...methods} />
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
