import React from "react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_PRODUCT_TYPE } from "@/graphql/mutations/productTypes";

import { getErrors, SaveButton } from "@/components/form";
import { Header, RowGrid } from "@/components/Template";

import { FormGeneralInformation, schema } from "../components";

export default () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_PRODUCT_TYPE);

  const methods = useForm({
    defaultValues: {
      name: "",
      hasVariants: true,
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
        productTypeCreate: { productType, errors },
      },
    } = result;
    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Product type ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${productType.id}`);
    }
  };

  return (
    <>
      <Header title="Create Product Type" />
      <RowGrid>
        <FormGeneralInformation {...methods} />
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
