import React from "react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { CREATE_SALE } from "@/graphql/mutations/sales";

import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, RowGrid } from "@/components/Template";

import { getOptimizeDate } from "@/app/utils";

import {
  FormActiveDates,
  FormDiscountType,
  FormGeneralInformation,
  FormValue,
  schema,
  Summary,
} from "../components";

export default () => {
  const [create] = useMutation(CREATE_SALE);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      name: "",
      type: "PERCENTAGE",
      value: 0,
      startDate: "",
      endDate: "",
      startHour: "",
      endHour: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    const result = await create({ variables: { input: getOptimizeDate(data) } });
    if (result === undefined) return;

    const {
      data: {
        saleCreate: { sale, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Sale ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`../${sale.id}`);
    }
  };

  return (
    <>
      <Header title="Create sale" />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} />
          <FormDiscountType {...methods} />
          <FormValue {...methods} />
          <FormActiveDates {...methods} />
        </RowGrid>
        <Summary {...methods} />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
