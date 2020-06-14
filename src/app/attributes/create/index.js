import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_ATTRIBUTE } from "@/graphql/mutations/attributes";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, RowGrid } from "@/components/Template";

import { FormGeneralInformation, FormProperties, schema } from "../components";
import { FormValues } from "./FormValues";

export default () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CREATE_ATTRIBUTE);

  const methods = useForm({
    defaultValues: {
      name: "",
      slug: "",
      valueRequired: true,
      visibleInStorefront: true,
      filterableInStorefront: true,
      filterableInDashboard: true,
      storefrontSearchPosition: 0,
      availableInGrid: true,
      inputType: "DROPDOWN",
      values: [],
    },
    resolver: yupResolver(schema),
  });
  const {
    control,
    errors,
    setError,
    watch,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: data } });
    if (result === undefined) return;

    const {
      data: {
        attributeCreate: { attribute, errors },
      },
    } = result;
    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Attribute ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${attribute.id}`);
    }
  };

  return (
    <>
      <Header title="Create Attribute" />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation control={control} errors={errors} watch={watch} isCreate />
          <FormValues {...methods} />
        </RowGrid>
        <FormProperties control={control} errors={errors} />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
