import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateAttribute } from "../mutations";

import { GeneralInformation, Properties, schema } from "../_form";
import { FormValues } from "./FormValues";

export default () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateAttribute);

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
      getErrors(errors, setError);
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
          <GeneralInformation control={control} errors={errors} watch={watch} isCreate />
          <FormValues {...methods} />
        </RowGrid>
        <Properties control={control} errors={errors} />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
