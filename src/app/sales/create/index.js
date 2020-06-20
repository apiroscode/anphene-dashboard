import React from "react";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";
import { CREATE_SALE } from "@/graphql/mutations/sales";
import dayjs from "dayjs";
import { getErrors, SaveButton } from "@/components/form";
import { ColGrid, Header, RowGrid } from "@/components/Template";
import {
  FormActiveDates,
  FormDiscountType,
  FormGeneralInformation,
  FormValue,
  Summary,
  schema,
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
    const startDateStr = `${data.startDate} ${data.startHour ? data.startHour : "00:00"}`;
    const startDate = dayjs(startDateStr).format();
    const endDateStr = data?.endDate
      ? `${data.endDate} ${data.endHour ? data.endHour : "00:00"}`
      : "";
    const endDate = endDateStr ? dayjs(endDateStr).format() : undefined;

    const newData = { ...data, startDate, endDate };
    delete newData["startHour"];
    delete newData["endHour"];

    const result = await create({ variables: { input: newData } });
    if (result === undefined) return;

    const {
      data: {
        saleCreate: { sale, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
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
