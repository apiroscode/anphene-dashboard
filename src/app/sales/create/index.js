import React from "react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { getOptimizeDate } from "@/utils/index";
import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton } from "@/components/_form";
import { ColGrid } from "@/components/ColGrid";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateSale } from "../mutations";
import { ActiveDates, DiscountType, GeneralInformation, schema, Summary, Value } from "../_form";

export default () => {
  const [create] = useMutation(CreateSale);
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
          <GeneralInformation {...methods} />
          <DiscountType {...methods} />
          <Value {...methods} />
          <ActiveDates {...methods} />
        </RowGrid>
        <Summary {...methods} />
      </ColGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
